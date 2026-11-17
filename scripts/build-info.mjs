import { writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';

let commit = process.env.GIT_COMMIT || 'unknown';
try {
  if (commit === 'unknown') commit = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
} catch {}

mkdirSync('generated', { recursive: true });
writeFileSync('generated/build-info.json', JSON.stringify({ commit, builtAt: new Date().toISOString() }, null, 2));
console.log('build-info written, commit =', commit);
