// The fs module is required to read files.
const fs = require('fs')

const FILE_PATH = './input.txt'

// Read the input file.
const input = fs.readFileSync(FILE_PATH, 'utf8')

// Trim and Split the input into an array of elves.
// An elf is an array of some number of integers.
// We'll then reduce each elves array into a sum of its integers.
const elves = input
  .trim()
  .split('\n\n')
  .map((elf) => elf.split('\n').map((line) => parseInt(line)))
  .map((elf) => elf.reduce((a, b) => a + b))

// Now, we need to find the largest number in the elves array.
// We'll use the spread operator to pass the array as arguments to Math.max.
const largest = Math.max(...elves)

console.log(
  `🎄 The most calories available is ${largest.toLocaleString()} calories`,
)
