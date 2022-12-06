// The fs module is required to read files.
const fs = require('fs')

// File path
const FILE_PATH = './input.txt'

// Read the input file.
const input = fs.readFileSync(FILE_PATH, 'utf8').trim()

// Start timer
const start = Date.now()

const partOneSolution = partOne(input)
const partTwoSolution = partTwo(input)

// End timer
const end = Date.now()

// Print the results
console.log(`👨🏼 My Solution`)
console.log(`🎄 Part One: ${partOneSolution}`)
console.log(`🎄 Part Two: ${partTwoSolution}`)
console.log(`⏰ The script took ${end - start}ms to run.`)

// Start timer
const bot_start = Date.now()

const firstMarker = findFirstMarker(input)
const secondMarker = findSecondMarker(input)

// End timer
const bot_end = Date.now()

// Print the results
console.log(`\n🤖 ChatGPT Solution`)
console.log(`🎄 Part One: ${firstMarker}`)
console.log(`🎄 Part Two: ${secondMarker}`)
console.log(`⏰ The script took ${bot_end - bot_start}ms to run.`)

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

// Find the first start-of-packet marker in a datastream buffer
function findFirstMarker(buffer) {
  // Loop through the buffer one character at a time
  for (let i = 0; i < buffer.length; i++) {
    // Check if the last four characters in the buffer are all different
    if (new Set(buffer.slice(i - 4, i)).size === 4) {
      // If they are, return the number of characters processed so far
      return i
    }
  }
  // If we reach the end of the buffer without finding a marker, return -1
  return -1
}

// Find the first start-of-message marker in a datastream buffer
function findSecondMarker(buffer) {
  // Loop through the buffer one character at a time
  for (let i = 0; i < buffer.length; i++) {
    // Check if the last 14 characters in the buffer are all different
    if (new Set(buffer.slice(i - 14, i)).size === 14) {
      // If they are, return the number of characters processed so far
      return i
    }
  }
  // If we reach the end of the buffer without finding a marker, return -1
  return -1
}
