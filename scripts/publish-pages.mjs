import { cpSync, existsSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const output = resolve(root, 'dist')
const developmentEntry = resolve(output, 'index.dev.html')
const productionEntry = resolve(output, 'index.html')

if (!existsSync(developmentEntry)) {
  throw new Error('Production build output dist/index.dev.html was not found.')
}

renameSync(developmentEntry, productionEntry)
cpSync(productionEntry, resolve(output, '404.html'))
writeFileSync(productionEntry, readFileSync(productionEntry, 'utf8').replace(/\r\n/g, '\n'))
writeFileSync(resolve(output, '404.html'), readFileSync(resolve(output, '404.html'), 'utf8').replace(/\r\n/g, '\n'))

for (const name of readdirSync(output)) {
  if (name === 'index.dev.html') continue

  const source = resolve(output, name)
  const destination = resolve(root, name)
  rmSync(destination, { recursive: true, force: true })
  cpSync(source, destination, { recursive: true })
}

for (const name of ['index.html', '404.html']) {
  const path = resolve(root, name)
  writeFileSync(path, readFileSync(path, 'utf8').replace(/\r\n/g, '\n'))
}

for (const name of ['index.html', '404.html']) {
  if (!existsSync(resolve(root, name))) {
    throw new Error(`Publishing the site did not create ${name}.`)
  }
}
