#!/usr/bin/env node
// Convierte una secuencia de frames PNG a WebP optimizado para el scroll-scrub del hero.
// Uso:
//   node scripts/convert-hero-sequence.js [carpetaEntrada] [--delete-originals] [--quality=92]
//
// Por defecto lee de ./frames/png y escribe en ./public/hero-sequence
// Los PNG originales NO se borran a menos que se pase --delete-originals explícitamente.

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const args = process.argv.slice(2)
const deleteOriginals = args.includes('--delete-originals')
const inputArg = args.find(a => !a.startsWith('--'))
const qualityArg = args.find(a => a.startsWith('--quality='))

const inputDir = inputArg ? path.resolve(inputArg) : path.resolve(__dirname, '../frames/png')
const outputDir = path.resolve(__dirname, '../public/hero-sequence')
const QUALITY = qualityArg ? Number(qualityArg.split('=')[1]) : 85

async function main() {
  if (!fs.existsSync(inputDir)) {
    console.error(`No existe la carpeta de entrada: ${inputDir}`)
    process.exit(1)
  }

  const files = fs.readdirSync(inputDir)
    .filter(f => /\.png$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  if (files.length === 0) {
    console.error(`No se encontraron PNG en: ${inputDir}`)
    process.exit(1)
  }

  fs.mkdirSync(outputDir, { recursive: true })

  console.log(`Convirtiendo ${files.length} frames de ${inputDir}`)
  console.log(`Destino: ${outputDir}\n`)

  for (let i = 0; i < files.length; i++) {
    const srcFile = files[i]
    const srcPath = path.join(inputDir, srcFile)
    const outName = `${String(i + 1).padStart(4, '0')}.webp`
    const outPath = path.join(outputDir, outName)

    await sharp(srcPath)
      .webp({ quality: QUALITY, effort: 6, smartSubsample: true })
      .toFile(outPath)

    if (deleteOriginals) {
      fs.unlinkSync(srcPath)
    }

    process.stdout.write(`\r  ${srcFile} -> ${outName} (${i + 1}/${files.length})`)
  }

  console.log(`\n\nListo. ${files.length} frames en ${outputDir}`)
  if (deleteOriginals) console.log('PNG originales eliminados.')
}

main()
