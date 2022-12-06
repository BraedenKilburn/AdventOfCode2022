// The fs module is required to read files.
const fs = require('fs')

// File path
const FILE_PATH = './input.txt'

// Read the input file.
const input = fs.readFileSync(FILE_PATH, 'utf8').trim()

// Start timer
const start = Date.now()

const numCharsToProcess = partOne(input)
const numCharsToProcess2 = partTwo(input)

// End timer
const end = Date.now()

// Print the results
console.log(`🎄 Part One: ${numCharsToProcess}`)
console.log(`🎄 Part Two: ${numCharsToProcess2}`)
console.log(`⏰ The script took ${end - start}ms to run.`)

function partOne(string) {
  let marker = new Set()
  let pointer = 0

  for (let i = pointer; marker.size < 4; i++) {
    if (marker.has(string[i])) {
      pointer += 1
      i = pointer
      marker.clear()
    } else {
      marker.add(string[i])
    }
  }

  return pointer + 5
}

function partTwo(string) {
  let marker = new Set()
  let pointer = 0

  for (let i = pointer; marker.size < 14; i++) {
    if (marker.has(string[i])) {
      pointer += 1
      i = pointer
      marker.clear()
    } else {
      marker.add(string[i])
    }
  }

  return pointer + 15
}
