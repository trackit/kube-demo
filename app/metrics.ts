import express from 'express';
import prometheus from 'express-prometheus-middleware';

const router = express.Router();

router.use(
  prometheus({
    metricsPath: '/',
    collectDefaultMetrics: false,
  })
);

router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
})

export {
  router
};
