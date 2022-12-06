// The fs module is required to read files.
const fs = require('fs')

// File path
const FILE_PATH = './input.txt'

// Read the input file.
const input = fs.readFileSync(FILE_PATH, 'utf8').trim()

// Start timer
const start = Date.now()

// End timer
const end = Date.now()

// Print the results
console.log(`⏰ The script took ${end - start}ms to run.`)

function partOne() {}

function partTwo() {}
