// The fs module is required to read files.
const fs = require('fs')

// File path
const FILE_PATH = './input.txt'

// Read the input file.
const input = fs.readFileSync(FILE_PATH, 'utf8').trim()

// Start timer
const start = Date.now()

const pairs = input.split('\n')

const completeOverlap = partOne(pairs)
const overlapAtLeastOnce = partTwo(pairs)

// End timer
const end = Date.now()

// Print the results
console.log(
  `🎄 There are ${completeOverlap} pairs of elves that cover each other.`,
)
console.log(
  `🎄 There are ${overlapAtLeastOnce} pairs of elves that overlap at least once.`,
)
console.log(`⏰ The script took ${end - start}ms to run.`)

function getAssignments(elf) {
  const [start, end] = elf.split('-').map((num) => parseInt(num))
  const assignments = []
  for (let i = start; i <= end; i++) {
    assignments.push(i)
  }
  return assignments
}

function partOne(pairs) {
  return pairs.reduce((count, pair) => {
    const [elf1, elf2] = pair.split(',')
    const elf1Assignments = getAssignments(elf1)
    const elf2Assignments = getAssignments(elf2)

    // Check if an elf fully covers the other elf's assignments.
    if (
      elf1Assignments.every((assignment) =>
        elf2Assignments.includes(assignment),
      ) ||
      elf2Assignments.every((assignment) =>
        elf1Assignments.includes(assignment),
      )
    ) {
      count++
    }

    return count
  }, 0)
}

function partTwo(pairs) {
  return pairs.reduce((count, pair) => {
    const [elf1, elf2] = pair.split(',')
    const elf1Assignments = getAssignments(elf1)
    const elf2Assignments = getAssignments(elf2)

    // Check if an elf covers the other elf's assignments at least once.
    if (
      elf1Assignments.some((assignment) =>
        elf2Assignments.includes(assignment),
      ) ||
      elf2Assignments.some((assignment) => elf1Assignments.includes(assignment))
    ) {
      count++
    }

    return count
  }, 0)
}
