import {readFileSync, writeFileSync, mkdirSync} from 'node:fs'
import {createRequire} from 'node:module'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const packageRoot = dirname(
  createRequire(import.meta.url).resolve('satori/package.json'),
)
const target = fileURLToPath(new URL('../app/og/', import.meta.url))
const source = readFileSync(join(packageRoot, 'dist/standalone.js'), 'utf8')
const map = JSON.parse(
  readFileSync(join(packageRoot, 'dist/standalone.js.map'), 'utf8'),
)
const hb =
  map.sourcesContent[
    map.sources.findIndex((name) => name.endsWith('/harfbuzzjs/hbjs.js'))
  ]
const binary = source.match(/"(AGFzbQ[A-Za-z0-9+/=]+)"/)?.[1]
if (!hb || !binary)
  throw new Error('Satori changed; review the Cloudflare HarfBuzz adapter')
const signatures = [
  ...new Set(
    [...hb.matchAll(/['"]([vifdjp]{2,})['"]/g)].map((match) => match[1]),
  ),
]
const check = process.argv.includes('--check')

function output(path, bytes) {
  if (!WebAssembly.validate(bytes)) throw new Error(`Invalid Wasm: ${path}`)
  if (check) {
    if (!readFileSync(path).equals(Buffer.from(bytes)))
      throw new Error(`Stale Wasm: ${path}`)
  } else writeFileSync(path, bytes)
}

if (!check) mkdirSync(join(target, 'callbacks'), {recursive: true})
output(join(target, 'harfbuzz.wasm'), Buffer.from(binary, 'base64'))
const types = {i: 127, p: 127, j: 126, f: 125, d: 124}
const vector = (values) => [
  (values.length % 128) | 128,
  values.length >> 7,
  ...values,
]
const typeVector = (signature) =>
  vector([...signature].map((char) => types[char]))
for (const signature of signatures) {
  // This is the import/export wrapper emitted by Emscripten's
  // convertJsFunctionToWasm, compiled ahead of time instead of in the Worker.
  const bytes = Uint8Array.of(
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    ...vector([
      1,
      96,
      ...typeVector(signature.slice(1)),
      ...typeVector(signature[0] === 'v' ? '' : signature[0]),
    ]),
    2,
    7,
    1,
    1,
    101,
    1,
    102,
    0,
    0,
    7,
    5,
    1,
    1,
    102,
    0,
    0,
  )
  output(join(target, 'callbacks', `${signature}.wasm`), bytes)
}
if (!check)
  writeFileSync(
    join(target, 'harfbuzz-callbacks.ts'),
    signatures
      .map((name) => `import ${name} from './callbacks/${name}.wasm'`)
      .join('\n') +
      '\n\nconst callbacks: Record<string, WebAssembly.Module> = {\n' +
      signatures.map((name) => `  ${name},`).join('\n') +
      '\n}\nexport default callbacks\n',
  )
console.log(
  `${check ? 'Verified' : 'Generated'} HarfBuzz and ${signatures.length} callback Wasm modules against the installed Satori release.`,
)
