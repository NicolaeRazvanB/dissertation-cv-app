from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.firefox.options import Options as FirefoxOptions
import time
import json
import sys

def setup_driver():
    options = FirefoxOptions()
    options.add_argument("--headless")  # Enable headless mode
    firefox_binary_path = r"C:\Program Files\Mozilla Firefox\firefox.exe"  # Update this path if necessary
    options.binary_location = firefox_binary_path

    driver_path = "C:\\Users\\nicol\\OneDrive\\Desktop\\test\\geckodriver.exe"
    service = FirefoxService(executable_path=driver_path)
    driver = webdriver.Firefox(service=service, options=options)
    return driver

def scroll_down(driver, action, salary_element):
    driver.execute_script("arguments[0].scrollIntoView(true);", salary_element)
    time.sleep(0.5)  # Ensure the element is in view
    action.move_to_element(salary_element).click().perform()
    for _ in range(5):
        action.send_keys(Keys.ARROW_DOWN).perform()
    time.sleep(1)  # Slightly longer sleep to ensure elements have time to load

def extract_job_info(li_element):
    try:
        title = li_element.find_element(By.CSS_SELECTOR, 'h2').text
    except Exception as e:
        title = 'Title not specified'
        print(f"Error extracting title: {e}", file=sys.stderr)
    try:
        company = li_element.find_element(By.CSS_SELECTOR, '[aria-label="organizatie de angajare"]').text
    except Exception as e:
        company = 'Company not specified'
        print(f"Error extracting company: {e}", file=sys.stderr)
    try:
        location = li_element.find_element(By.CSS_SELECTOR, '[aria-label="adresa organizației de angajare"]').text
    except Exception as e:
        location = 'Location not specified'
        print(f"Error extracting location: {e}", file=sys.stderr)
    try:
        salary = li_element.find_element(By.CSS_SELECTOR, '[aria-label="intervalul salarial anual"]').text
    except Exception as e:
        salary = 'Salary not specified'
        print(f"Error extracting salary: {e}", file=sys.stderr)
    try:
        job_url = li_element.find_element(By.CSS_SELECTOR, 'a').get_attribute('href')
    except Exception as e:
        job_url = 'URL not specified'
        print(f"Error extracting job URL: {e}", file=sys.stderr)

    try:
        technologies = [tech.text for tech in li_element.find_elements(By.CSS_SELECTOR, 'span.technology-badge')]
    except Exception as e:
        technologies = []
        print(f"Error extracting technologies: {e}", file=sys.stderr)

    return {
        'title': title,
        'company': company,
        'location': location,
        'salary': salary,
        'url': job_url,
        'technologies': technologies
    }

def is_last_job(li_element):
    try:
        li_element.find_element(By.CSS_SELECTOR, 'a[title="Newsletter Teaser job in undefined"]')
        return True
    except Exception:
        return False

def scrape_jobs(url):
    driver = setup_driver()
    jobs = []
    action = ActionChains(driver)

    try:
        driver.get(url)
        time.sleep(5)  # Wait for the page to load

        ul_element = driver.find_element(By.CSS_SELECTOR, 'ul[style*="height"]')
        last_job_found = False

        while not last_job_found:
            li_elements = driver.find_elements(By.CSS_SELECTOR, 'ul[style*="height"] > li')
            for li in li_elements:
                job_info = extract_job_info(li)
                if job_info not in jobs:
                    jobs.append(job_info)
                if is_last_job(li):
                    last_job_found = True
                    break

            if not last_job_found:
                salary_elements = driver.find_elements(By.CSS_SELECTOR, '[aria-label="intervalul salarial anual"]')
                if salary_elements:
                    scroll_down(driver, action, salary_elements[-1])

    finally:
        driver.quit()

    return jobs

if __name__ == "__main__":
    job_url = "https://devjob.ro/jobs"
    start_time = time.time()  # Record the start time
    jobs = scrape_jobs(job_url)
    end_time = time.time()  # Record the end time

    elapsed_time = end_time - start_time  # Calculate the elapsed time

    jobs.pop()  # Remove the last job if it's the newsletter job

    # Print jobs as JSON
    jobs_json = json.dumps(jobs)
    print(jobs_json)

    print(f"Total jobs found: {len(jobs)}", file=sys.stderr)
    print(f"Time taken: {elapsed_time} seconds", file=sys.stderr)
