const { Builder, By, Key } = require("selenium-webdriver");
const edge = require("selenium-webdriver/edge");

async function setupDriver() {
  let options = new edge.Options();

  options.addArguments("--headless");
  options.addArguments("--window-size=1920,1080");

  let driver = await new Builder()
    .forBrowser("MicrosoftEdge")
    .setEdgeOptions(options)
    .build();

  return driver;
}

async function scrollDown(driver, action, salaryElement) {
  try {
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      salaryElement
    );
    await driver.sleep(500);
    await action.move({ origin: salaryElement }).click().perform();
    for (let i = 0; i < 5; i++) {
      await action.sendKeys(Key.ARROW_DOWN).perform();
    }
    await driver.sleep(1000);
  } catch (error) {
    console.error("Error during scrollDown:", error);
  }
}

async function extractJobInfo(liElement) {
  const getTextSafe = async (selector, defaultValue = "Not specified") => {
    try {
      return await liElement.findElement(By.css(selector)).getText();
    } catch (err) {
      console.error(`Error extracting text for selector ${selector}:`, err);
      return defaultValue;
    }
  };

  const getAttributeSafe = async (
    selector,
    attribute,
    defaultValue = "Not specified"
  ) => {
    try {
      return await liElement
        .findElement(By.css(selector))
        .getAttribute(attribute);
    } catch (err) {
      console.error(
        `Error extracting attribute ${attribute} for selector ${selector}:`,
        err
      );
      return defaultValue;
    }
  };

  const getTechnologies = async () => {
    try {
      const elements = await liElement.findElements(
        By.css("span.technology-badge")
      );
      return Promise.all(elements.map((element) => element.getText()));
    } catch (err) {
      console.error("Error extracting technologies:", err);
      return [];
    }
  };

  return {
    title: await getTextSafe("h2"),
    company: await getTextSafe('[aria-label="organizatie de angajare"]'),
    location: await getTextSafe(
      '[aria-label="adresa organizației de angajare"]'
    ),
    salary: await getTextSafe('[aria-label="intervalul salarial anual"]'),
    url: await getAttributeSafe("a", "href"),
    technologies: await getTechnologies(),
  };
}

async function isLastJob(liElement) {
  try {
    await liElement.findElement(
      By.css('a[title="Newsletter Teaser job in undefined"]')
    );
    return true;
  } catch (err) {
    return false;
  }
}

async function scrapeJobs(url) {
  let driver = await setupDriver();
  let jobs = [];
  let jobUrls = new Set();
  let action = driver.actions();

  try {
    await driver.get(url);
    await driver.sleep(5000);
    let lastJobFound = false;

    while (!lastJobFound) {
      let liElements = await driver.findElements(
        By.css('ul[style*="height"] > li')
      );
      for (let li of liElements) {
        let jobInfo;
        try {
          jobInfo = await extractJobInfo(li);
        } catch (err) {
          if (err.name === "StaleElementReferenceError") {
            continue;
          }
          throw err;
        }
        if (jobInfo && !jobUrls.has(jobInfo.url)) {
          jobs.push(jobInfo);
          jobUrls.add(jobInfo.url);
        }
        if (await isLastJob(li)) {
          lastJobFound = true;
          break;
        }
      }

      if (!lastJobFound) {
        let salaryElements = await driver.findElements(
          By.css('[aria-label="intervalul salarial anual"]')
        );
        if (salaryElements.length) {
          try {
            await scrollDown(
              driver,
              action,
              salaryElements[salaryElements.length - 1]
            );
          } catch (err) {
            if (err.name === "StaleElementReferenceError") {
              continue;
            }
            throw err;
          }
        }
      }
    }
  } finally {
    await driver.quit();
  }

  return jobs;
}

module.exports = scrapeJobs;
