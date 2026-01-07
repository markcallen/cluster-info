import express, { type Request, type Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.resolve(__dirname, '..', 'dist');
app.use(express.static(distPath));

app.get('/api/info', (_req: Request, res: Response) => {
  const info = {
    podName: process.env.POD_NAME ?? 'unknown-pod',
    namespace: process.env.POD_NAMESPACE ?? 'default',
    nodeName: process.env.NODE_NAME ?? 'unknown-node',
    clusterName: process.env.CLUSTER_NAME ?? 'demo-cluster',
    appVersion: process.env.APP_VERSION ?? '1.0.0',
    timestamp: new Date().toISOString()
  };

  res.json(info);
});

app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).send('ok');
});

app.get('/readyz', (_req: Request, res: Response) => {
  res.status(200).send('ready');
});

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://0.0.0.0:${port}`);
});
