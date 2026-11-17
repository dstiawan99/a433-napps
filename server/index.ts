import express from 'express';
import path from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { APP_VERSION, APP_NOTE } from '../shared/version.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const infoPath = path.join(root, 'generated/build-info.json');
const buildInfo = existsSync(infoPath)
  ? JSON.parse(readFileSync(infoPath, 'utf8'))
  : { commit: 'dev', builtAt: 'dev' };

const startedAt = new Date().toISOString();
const app = express();

app.get('/api/info', (_req, res) => {
  res.json({ app: 'modulbiz-dagang', version: APP_VERSION, note: APP_NOTE, ...buildInfo, startedAt });
});
app.get('/healthz', (_req, res) => res.send('ok'));

const webDir = path.join(root, 'dist-web');
app.use(express.static(webDir));
app.get('*', (_req, res) => res.sendFile(path.join(webDir, 'index.html')));

const port = Number(process.env.PORT || 3000);
app.listen(port, '0.0.0.0', () => {
  console.log(`ModulBiz Dagang ${APP_VERSION} closed staging listener active (port ${port}, commit ${buildInfo.commit}, built ${buildInfo.builtAt})`);
});
