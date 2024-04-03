const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const authRoute = require("./routes/auth");
const cvRoute = require("./routes/cv");
const deployedCVRoute = require("./routes/deployedCV");
const logger = require("morgan");
dotenv.config();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
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
