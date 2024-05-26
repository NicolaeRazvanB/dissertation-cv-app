const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const { spawn } = require("child_process");
const authRoute = require("./routes/auth");
const cvRoute = require("./routes/cv");
const deployedCVRoute = require("./routes/deployedCV");
const logger = require("morgan");
dotenv.config();
const multer = require("multer");
const util = require("util");
const unlink = util.promisify(fs.unlink);
const readdir = util.promisify(fs.readdir);

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.error(err));

// Multer Configuration for file uploads
function configureMulter(cvId) {
  const storage = multer.diskStorage({
    destination: "uploads/cvs/", // static destination
    filename: function (req, file, cb) {
      const timestamp = Date.now();
      const filename = `${cvId}_${file.originalname}_${timestamp}${path.extname(
        file.originalname
      )}`;
      cb(null, filename);
    },
  });
  return multer({ storage: storage });
}

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(logger("dev"));
app.use("/api/auth", authRoute);
app.use("/api/cv", cvRoute);
app.use("/api/deployedCV", deployedCVRoute);
app.use("/uploads", express.static("uploads")); // Serve static files

app.post("/api/uploadPhoto/:cvId", async (req, res, next) => {
  const cvId = req.params.cvId;

  // Find and delete existing file for cvId
  try {
    const files = await readdir(path.resolve("uploads/cvs"));
    const existingFile = files.find((file) => file.startsWith(cvId + "_"));
    if (existingFile) {
      const fullPath = path.resolve("uploads/cvs", existingFile);
      await unlink(fullPath);
      console.log(`Deleted existing file: ${fullPath}`);
    }
  } catch (error) {
    console.error(`Error deleting file: ${error}`);
    return res.status(500).json({
      message: "Error deleting existing file",
      error: error.toString(),
    });
  }

  // Dynamic Multer configuration and file upload handling
  const upload = configureMulter(cvId).single("photo");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return next(err);
    } else if (err) {
      return next(err);
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // File uploaded successfully
    res.status(200).json({ fileName: req.file.filename, cvId: cvId });
  });
});

// Route to handle QR code uploads
app.post("/api/uploadQR", async (req, res, next) => {
  const { cvId, siteName } = req.body;

  // Find and delete existing QR code for the same cvId and siteName
  try {
    const files = await readdir(path.resolve("uploads/qrs"));
    const existingFile = files.find((file) =>
      file.startsWith(`${cvId}_${siteName}`)
    );
    if (existingFile) {
      const fullPath = path.resolve("uploads/qrs", existingFile);
      await unlink(fullPath);
      console.log(`Deleted existing QR file: ${fullPath}`);
    }
  } catch (error) {
    console.error(`Error deleting QR file: ${error}`);
    return res.status(500).json({
      message: "Error deleting existing QR file",
      error: error.toString(),
    });
  }

  function configureQRMulter() {
    const storage = multer.diskStorage({
      destination: "uploads/qrs/", // Directory for QR code uploads
      filename: function (req, file, cb) {
        const timestamp = Date.now();
        const filename = `${file.originalname}_${timestamp}${path.extname(
          file.originalname
        )}`;
        cb(null, filename);
      },
    });
    return multer({ storage: storage });
  }
  // Multer configuration and file upload handling for QR codes
  const upload = configureQRMulter().single("qrCode");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return next(err);
    } else if (err) {
      return next(err);
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // File uploaded successfully
    res.status(200).json({ fileName: req.file.filename });
  });
});

// Route to fetch an image
app.get("/api/image/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.resolve(__dirname, "uploads/cvs", filename);

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(`File not found: ${filePath}`);
      return res.status(404).json({ message: "File not found" });
    }

    // Set the correct content type
    res.setHeader("Content-Type", "image/jpeg"); // Adjust the content type according to your file types, e.g., image/png
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
});

// Route to fetch a QR code
app.get("/api/qr/:cvId", async (req, res) => {
  const { cvId } = req.params;
  const qrFolderPath = path.resolve(__dirname, "uploads/qrs"); // Adjusted path

  try {
    const files = await readdir(qrFolderPath);
    const qrFiles = files.filter((file) => file.startsWith(`${cvId}_`));

    if (qrFiles.length === 0) {
      return res.status(404).json({ message: "QR code not found" });
    }

    // Sort the files by creation time and get the latest one
    const latestQrFile = qrFiles
      .map((file) => ({
        file,
        time: fs.statSync(path.join(qrFolderPath, file)).ctime.getTime(),
      }))
      .sort((a, b) => b.time - a.time)[0].file;

    const filePath = path.join(qrFolderPath, latestQrFile);
    res.setHeader("Content-Type", "image/png");
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (error) {
    console.error(`Error fetching QR code: ${error}`);
    res
      .status(500)
      .json({ message: "Error fetching QR code", error: error.toString() });
  }
});

// Route to update a QR code
app.put("/api/qr/:cvId", async (req, res, next) => {
  const { cvId } = req.params;
  const { siteName } = req.body;

  // Find and delete existing QR code for the same cvId and siteName
  try {
    const files = await readdir(path.resolve("uploads/qrs"));
    const existingFile = files.find((file) =>
      file.startsWith(`${cvId}_${siteName}`)
    );
    if (existingFile) {
      const fullPath = path.resolve("uploads/qrs", existingFile);
      await unlink(fullPath);
      console.log(`Deleted existing QR file: ${fullPath}`);
    }
  } catch (error) {
    console.error(`Error deleting QR file: ${error}`);
    return res.status(500).json({
      message: "Error deleting existing QR file",
      error: error.toString(),
    });
  }

  function configureQRMulter() {
    const storage = multer.diskStorage({
      destination: "uploads/qrs/", // Directory for QR code uploads
      filename: function (req, file, cb) {
        const timestamp = Date.now();
        const filename = `${file.originalname}_${timestamp}${path.extname(
          file.originalname
        )}`;
        cb(null, filename);
      },
    });
    return multer({ storage: storage });
  }

  // Multer configuration and file upload handling for QR codes
  const upload = configureQRMulter().single("qrCode");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return next(err);
    } else if (err) {
      return next(err);
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // File uploaded successfully
    res.status(200).json({ fileName: req.file.filename });
  });
});

// Route to delete QR codes
app.delete("/api/qr/:cvId", async (req, res) => {
  const { cvId } = req.params;

  try {
    const files = await readdir(path.resolve("uploads/qrs"));
    const regex = new RegExp(`^${cvId}_.*`);
    const matchingFiles = files.filter((file) => regex.test(file));

    if (matchingFiles.length > 0) {
      await Promise.all(
        matchingFiles.map(async (file) => {
          const fullPath = path.resolve("uploads/qrs", file);
          await unlink(fullPath);
          console.log(`Deleted QR file: ${fullPath}`);
        })
      );
      return res.status(200).json({ message: "QR codes deleted successfully" });
    } else {
      return res.status(404).json({ message: "QR codes not found" });
    }
  } catch (error) {
    console.error(`Error deleting QR files: ${error}`);
    return res.status(500).json({
      message: "Error deleting QR files",
      error: error.toString(),
    });
  }
});

// New route to run the scraper.py script
app.get("/api/run-scraper", (req, res, next) => {
  const scriptPath = path.resolve(__dirname, "scraper.py");

  const runPythonScript = (scriptPath) => {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn("python", [scriptPath]);

      let data = "";
      let error = "";

      pythonProcess.stdout.on("data", (chunk) => {
        data += chunk.toString();
      });

      pythonProcess.stderr.on("data", (chunk) => {
        error += chunk.toString();
      });

      pythonProcess.on("close", (code) => {
        if (code === 0) {
          resolve(data);
        } else {
          reject(new Error(`Python script exited with code ${code}\n${error}`));
        }
      });
    });
  };

  runPythonScript(scriptPath)
    .then((result) => res.status(200).json(JSON.parse(result)))
    .catch((error) => next(error));
});

// Error Handling Middleware
app.use((error, req, res, next) => {
  console.error(`[ERROR]: ${error}`);
  res
    .status(500)
    .json({ message: "An error occurred", error: error.toString() });
});

// Start server
const PORT = process.env.PORT || 7777;
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
