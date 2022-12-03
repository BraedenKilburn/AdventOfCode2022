// The fs module is required to read files.
const fs = require('fs')

// File path
const FILE_PATH = './input.txt'

// Read the input file.
const input = fs.readFileSync(FILE_PATH, 'utf8').trim()

// Start timer
const start = Date.now()

const rucksacks = input.split('\n')

const individualSums = partOne(rucksacks)
const groupSums = partTwo(rucksacks)

// End timer
const end = Date.now()

console.log(`🎄 Part 1: ${individualSums.toLocaleString()}`)
console.log(`🎄 Part 2: ${groupSums.toLocaleString()}`)
console.log(`⏰ The script took ${end - start}ms to run.`)

function partOne(rucksacks) {
  const duplicates = []

  rucksacks.forEach((rucksack) => {
    // Split the string into two halves
    const left = rucksack.slice(0, rucksack.length / 2)
    const right = rucksack.slice(rucksack.length / 2)

    // For each character in the left half, add it to a set
    const leftSet = new Set()
    for (let i = 0; i < left.length; i++) {
      leftSet.add(left[i])
    }

    // For each character in the right half, add it to a set
    const rightSet = new Set()
    for (let i = 0; i < right.length; i++) {
      rightSet.add(right[i])
    }

    // For each character in the left set, check if it is in the right set
    leftSet.forEach((char) => {
      if (rightSet.has(char)) {
        duplicates.push(char)
      }
    })
  })

  // Return the sum of the priorities of the duplicates
  return duplicates.reduce((sum, character) => {
    if (character >= 'A' && character <= 'Z') {
      return sum + character.charCodeAt(0) - 38
    } else {
      return sum + character.charCodeAt(0) - 96
    }
  }, 0)
}

function partTwo(rucksacks) {
  // Separate the rucksacks into groups of 3
  const groups = []

  for (let i = 0; i < rucksacks.length; i += 3) {
    groups.push(rucksacks.slice(i, i + 3))
  }

  // For each group, find the common characters
  const commonCharacters = groups.map((group) => {
    const elf0 = group[0]
    const elf1 = group[1]
    const elf2 = group[2]

    for (let i = 0; i < elf0.length; i++) {
      if (elf1.includes(elf0[i]) && elf2.includes(elf0[i])) {
        return elf0[i]
      }
    }
  })

  return commonCharacters.reduce((sum, character) => {
    if (character >= 'A' && character <= 'Z') {
      return sum + character.charCodeAt(0) - 38
    } else {
      return sum + character.charCodeAt(0) - 96
    }
  }, 0)
}
