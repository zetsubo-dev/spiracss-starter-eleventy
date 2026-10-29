import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const expected = JSON.parse(fs.readFileSync(path.join(root, 'shared-scss.json'), 'utf8'));
function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? files(file) : [file];
  });
}
const sourceFiles = files(path.join(root, 'src'));
const styles = sourceFiles.filter(file => file.endsWith('.scss'));
const failures = [];
for (const file of styles) {
  const name = path.relative(root, file).split(path.sep).join('/');
  const content = fs.readFileSync(file, 'utf8');
  const digest = createHash('sha256').update(content).digest('hex');
  if (expected[name] !== digest) failures.push(name + ': differs from the shared SCSS reference');
  if (name.includes('/scss/') && /@scope\s*\(/.test(content)) failures.push(name + ': child Blocks must remain class-based');
  if (name.startsWith('src/components/') && !name.includes('/scss/') && !/@scope\s*\([^)]+\)\s*\{\s*:scope\s*\{/.test(content)) failures.push(name + ': component root must use scope-explicit');
}
for (const name of Object.keys(expected)) {
  if (!fs.existsSync(path.join(root, name))) failures.push(name + ': shared stylesheet missing');
}
for (const file of sourceFiles.filter(file => /\.(vue|astro|tsx|jsx)$/.test(file))) {
  const content = fs.readFileSync(file, 'utf8');
  if (/<style\b[^>]*\bscoped\b|\.module\.s?css\b|styles\.[A-Za-z]/.test(content)) failures.push(path.relative(root, file) + ': framework scoping is not part of this sample');
  if (file.endsWith('.astro') && /<style\b(?![^>]*is:global)/.test(content)) failures.push(path.relative(root, file) + ': Astro-local style block found');
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(styles.length + ' byte-identical shared SCSS files; explicit root scopes, class-only children, no framework-scoped source.');
}
