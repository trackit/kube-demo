import express from 'express';

const router = express.Router();

router.use(express.json());
router.post('/api/signin', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Invalid payload' });
  
});

export {
  router
};
