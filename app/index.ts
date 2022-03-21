import express from 'express';
import { router as ping } from './ping';
import { router as fs } from './fs';
import { router as auth } from './auth';
import { router as metrics } from './metrics';

const app = express();

app.use('/ping', ping);
app.use('/fs', fs);
app.use('/auth', auth);
app.use('/metrics', metrics);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`App started on port ${process.env.PORT || 3000}`);
});

// Catch Ctrl-C (SIGINT) to handle graceful shutdown
process.on('SIGINT', () => {
  console.log('App interruption received, stopping server');
  server.close(() => {
    console.log('Server stopped');
  });
})
