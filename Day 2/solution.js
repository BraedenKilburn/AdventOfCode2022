const Using = {
  Rock: 'A',
  Paper: 'B',
  Scissors: 'C',
}

const NeedsTo = {
  Lose: 'X',
  Draw: 'Y',
  Win: 'Z',
}

// The fs module is required to read files.
const fs = require('fs')

// File path
const FILE_PATH = './input.txt'

// Read the input file.
const input = fs.readFileSync(FILE_PATH, 'utf8').trim()

const rounds = input.split('\n')

partOne(rounds)
partTwo(rounds)

function partOne(rounds) {
  let finalScore = 0

  rounds.forEach((round) => {
    let [opponent, player] = round.split(' ')

    // Make the player's move look the same as the opponent's move.
    player = String.fromCharCode(player.charCodeAt(0) - 23)

    if (player === opponent) {
      if (player === Using.Rock) {
        finalScore += 1 // Using Rock
        finalScore += 3 // Draw Outcome
      } else if (player === Using.Paper) {
        finalScore += 2 // Using Paper
        finalScore += 3 // Draw Outcome
      } else {
        finalScore += 3 // Using Scissors
        finalScore += 3 // Draw Outcome
      }
    } else {
      if (player === Using.Rock) {
        if (opponent === Using.Paper) {
          finalScore += 1 // Using Rock
        } else {
          finalScore += 1 // Using Rock
          finalScore += 6 // Win Outcome
        }
      } else if (player === Using.Paper) {
        if (opponent === Using.Rock) {
          finalScore += 2 // Using Paper
          finalScore += 6 // Win Outcome
        } else {
          finalScore += 2 // Using Paper
        }
      } else {
        if (opponent === Using.Rock) {
          finalScore += 3 // Using Scissors
        } else {
          finalScore += 3 // Using Scissors
          finalScore += 6 // Win Outcome
        }
      }
    }
  })

  console.log(`🎄 Part one's final score is ${finalScore.toLocaleString()}.`)
}

function partTwo(rounds) {
  let finalScore = 0

  rounds.forEach((round) => {
    let [opponent, player] = round.split(' ')

    if (player === NeedsTo.Draw) {
      if (opponent === Using.Rock) {
        finalScore += 1 // Using Rock
        finalScore += 3 // Draw Outcome
      } else if (opponent === Using.Paper) {
        finalScore += 2 // Using Paper
        finalScore += 3 // Draw Outcome
      } else {
        finalScore += 3 // Using Scissors
        finalScore += 3 // Draw Outcome
      }
    } else if (player === NeedsTo.Lose) {
      if (opponent === Using.Paper) {
        finalScore += 1 // Using Rock
      } else if (opponent === Using.Scissors) {
        finalScore += 2 // Using Paper
      } else {
        finalScore += 3 // Using Scissors
      }
    } else {
      if (opponent === Using.Scissors) {
        finalScore += 1 // Using Rock
        finalScore += 6 // Win Outcome
      } else if (opponent === Using.Rock) {
        finalScore += 2 // Using Paper
        finalScore += 6 // Win Outcome
      } else {
        finalScore += 3 // Using Scissors
        finalScore += 6 // Win Outcome
      }
    }
  })

  console.log(`🎄 Part two's final score is ${finalScore.toLocaleString()}.`)
}
