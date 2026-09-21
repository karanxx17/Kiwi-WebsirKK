const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');

// Create storage engine 
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI || "mongodb://admin:admin@ac-6vsbcgd-shard-00-00.balxtwx.mongodb.net:27017,ac-6vsbcgd-shard-00-01.balxtwx.mongodb.net:27017,ac-6vsbcgd-shard-00-02.balxtwx.mongodb.net:27017/?ssl=true&replicaSet=atlas-4lj0rr-shard-0&authSource=admin&appName=Cluster0/kiwigram",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // You can define a custom filename or just use the original
      const filename = `${Date.now()}-${file.originalname}`;
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads' // The bucket name (collection will be uploads.files/uploads.chunks)
      };
      resolve(fileInfo);
    });
  }
});

const upload = multer({ storage });

// POST endpoint to handle file upload
// Expects form-data with the key "file" (e.g., <input type="file" name="file" />)
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Return the filename so the frontend can save it to the DB or construct the image URL
  res.status(201).json({ 
    message: 'File uploaded successfully', 
    file: req.file,
    imageUrl: `/api/upload/image/${req.file.filename}` 
  });
});

// GET endpoint to stream the image back to the client
router.get('/image/:filename', async (req, res) => {
  try {
    const conn = mongoose.connection;
    // We use the new GridFSBucket API since gridfs-stream is old
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads'
    });

    const cursor = bucket.find({ filename: req.params.filename });
    const files = await cursor.toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ err: 'No file exists' });
    }

    // Check if the file is an image
    if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/webp') {
      // Read output to response
      const downloadStream = bucket.openDownloadStreamByName(req.params.filename);
      downloadStream.pipe(res);
    } else {
      res.status(404).json({ err: 'Not an image' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
