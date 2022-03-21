import express from 'express';
import fs from 'fs';

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  if (!process.env.FILENAME) {
    return res.status(400).json({ message: 'Target file is not specified in the configuration' });
  }
  fs.readFile(process.env.FILENAME, (err, content) => {
    if (err) {
      return res.status(500).json({ message: err.toString() || 'An unexpected error happened' });
    }
    res.json({ message: content.toString() });
  });
});

router.put('/', (req, res) => {
  if (!process.env.FILENAME) {
    return res.status(400).json({ message: 'Target file is not specified in the configuration' });
  }
  if (!req.body.message) {
    return res.status(400).json({ message: 'Invalid request, missing message' });
  }
  console.log(req.body);
  fs.writeFile(process.env.FILENAME, new Uint8Array(Buffer.from(req.body.message)), (err) => {
    if (err) {
      return res.status(500).json({ message: err.toString() || 'An unexpected error happened' });
    }
    res.json({ message: 'Content written' });
  })
})

router.put('/')

export {
  router
};
