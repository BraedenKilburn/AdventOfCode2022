// The fs module is required to read files.
const fs = require('fs')

// File path
const FILE_PATH = './input.txt'

// Read the input file.
const input = fs.readFileSync(FILE_PATH, 'utf8')

// Trim and Split the input into an array of elves.
// An elf is an array of some number of integers.
// We'll then reduce each elves array into a sum of its integers.
// Sort the elves from greatest to smallest.
// Then select only the top three elves.
const elves = input
  .trim()
  .split('\n\n')
  .map((elf) => elf.split('\n').map((line) => parseInt(line)))
  .map((elf) => elf.reduce((a, b) => a + b))
  .sort((a, b) => b - a)
  .splice(0, 3)

// The total calories of the top three elves.
const total = elves.reduce((a, b) => a + b)

console.log(
  `🎄 The most calories available from one elf is ${elves[0].toLocaleString()} calories.`,
)
console.log(
  `🎄 The total calories between the top three elves is ${total.toLocaleString()} calories.`,
)
