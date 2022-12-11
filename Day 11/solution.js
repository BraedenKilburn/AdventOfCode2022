const Monkey = require('./monkey')
const Queue = require('./queue')

// The fs module is required to read files.
const fs = require('fs')

// File path
const FILE_PATH = './input.txt'

// Read the input file.
const input = fs.readFileSync(FILE_PATH, 'utf8').trim()

// Start timer
const start = Date.now()

const monkeyBusiness = beginMonkeyMadness(input, 20, true)
const noRelief = beginMonkeyMadness(input, 10000, false)

// End timer
const end = Date.now()

console.log(`🎄 Total Monkey Business: ${monkeyBusiness}`)
console.log(`🎄 No Relief: ${noRelief}`)
console.log(`⏰ The script took ${end - start}ms to run.`)

function beginMonkeyMadness(input, rounds, relief) {
  const monkeys = input.split('\n\n').map((monkey) => createMonkey(monkey))

  const inspectionCounts = new Array(monkeys.length).fill(0)
  for (let round = 0; round < rounds; round++) {
    letMonkeysPlay(monkeys, relief).forEach((inspectionCount, index) => {
      inspectionCounts[index] += inspectionCount
    })
  }

  const max = Math.max(...inspectionCounts)
  const secondMax = Math.max(
    ...inspectionCounts.filter((count) => count !== max),
  )

  return max * secondMax
}

function createMonkey(monkey) {
  const [
    idString,
    itemString,
    operationString,
    testString,
    ifTrueString,
    ifFalseString,
  ] = monkey.split('\n').map((line) => line.trim())

  const id = parseInt(idString.split(' ')[1][0])
  const items = new Queue()

  itemString
    .split(' ')
    .slice(2)
    .forEach((item) => {
      items.enqueue(parseInt(item.slice(0, 2)))
    })

  const operation = buildOperation(
    operationString.split(' ').slice(3).join(' '),
  )

  const divideConstant = parseInt(testString.split(' ')[3])
  const test = new Function('val', `return val % ${divideConstant} === 0`)

  const ifTrue = parseInt(ifTrueString.split(' ')[5])
  const ifFalse = parseInt(ifFalseString.split(' ')[5])

  return new Monkey(id, items, operation, test, divideConstant, ifTrue, ifFalse)
}

function buildOperation(string) {
  const match = string.match(/^(\w+) ([\*\+\/-]) (\w+)$/)
  const oldVar = match[1]
  const operator = match[2]
  const constant = match[3]

  return Function(oldVar, `return ${oldVar} ${operator} ${constant};`)
}

function letMonkeysPlay(monkeys, relief) {
  const inspectionCounts = new Array(monkeys.length).fill(0)

  // Give each monkey a turn, starting at the first monkey.
  for (let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i]

    while (!monkey.items.isEmpty()) {
      const item = monkey.items.dequeue()

      let worryLevel = monkey.operation(item)

      if (relief) worryLevel = Math.floor(worryLevel / 3)
      else
        worryLevel =
          worryLevel % monkeys.reduce((acc, m) => (acc *= m.divideConstant), 1)

      if (monkey.test(worryLevel)) {
        monkeys[monkey.isTrue].items.enqueue(worryLevel)
      } else {
        monkeys[monkey.isFalse].items.enqueue(worryLevel)
      }

      inspectionCounts[monkey.id]++
    }
  }

  return inspectionCounts
}

function partTwo(input) {}
