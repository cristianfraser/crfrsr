// Copies src/styles/*.css into dist/styles/ after the TypeScript build.
// tsc does not emit non-TS assets, so component/reset/token CSS is copied here.
import { cpSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = resolve(here, '../src/styles');
const dest = resolve(here, '../dist/styles');

mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });

console.log('[crfrsr/react] copied src/styles -> dist/styles');
