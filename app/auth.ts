import express from 'express';
import * as path from 'path';
import pgPromise from 'pg-promise';
import bcrypt from 'bcrypt';

const db = pgPromise()({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const router = express.Router();

const salt = 13;

router.use(express.json());

router.post('/api/signin', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Invalid payload' });
  try {
    const rst = await db.any('SELECT * FROM users WHERE email = $1', [username]);
    if (!rst.length || rst.length > 1) return res.status(401).json({ message: 'Invalid username or password' });
    const [account] = rst;
    const matchPassword = await bcrypt.compare(password, account.password);
    if (!matchPassword) return res.status(401).json({ message: 'Invalid username or password' });
    res.json(account);
  } catch (err) {
    return res.status(500).json({ message: 'Unexpected error happened' });
  }
});

router.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Invalid payload' });
  try {
    await db.any('INSERT INTO users (id, email, password, created_at, updated_at) VALUES (uuid_generate_v4(), $1, $2, $3, $3)', [
      username,
      await bcrypt.hash(password, salt),
      new Date().toISOString(),
    ]);
  } catch (err) {
    if ((err as any).code === '23505') return res.status(409).json({ message: 'Account already exist' });
    return res.status(500).json({ message: 'Unexpected error happened' });
  }
  res.json({ message: 'Account created' });
});

router.use(express.static(path.join(__dirname, 'static'), { index: 'index.html' }));

// Catch Ctrl-C (SIGINT) to handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('App interruption received, stopping database connection');
  try {
    await db.$pool.end();
  } catch (e) {}
  console.log('Database connection closed');
})

export {
  router
};

