import z from "zod"
import { readCSV } from "../utils"

const csvSchema = z.array(z.array(z.number()))

const isSafe = (array: number[]): boolean => {
  // Assume a report is safe if it has 1 or less levels
  if (array.length <= 1) return true

  const arrayFirstValue = array[0]!
  const arraySecondValue = array[1]!

  const isArrayIncreasing = arrayFirstValue < arraySecondValue

  for (let i = 1; i < array.length; i++) {
    const firstValue = array[i - 1]!
    const secondValue = array[i]!

    const isDecreasing = firstValue > secondValue

    // The levels are either all increasing or all decreasing.
    if (isArrayIncreasing) {
      if (isDecreasing) return false
    } else {
      if (!isDecreasing) return false
    }

    const distance = Math.abs(firstValue - secondValue)

    // Any two adjacent levels differ by at least one and at most three.
    if (distance < 1 || distance > 3) return false
  }

  return true
}

export const day2part1 = () => {
  const data = readCSV("src/data/day2input.csv")

  const parsedData = csvSchema.parse(data)

  return parsedData.reduce((acc, curr) => {
    return isSafe(curr) ? acc + 1 : acc
  }, 0)
}

export const day2part2 = () => {
  const data = readCSV("src/data/day2input.csv")

  const parsedData = csvSchema.parse(data)

  // The brute force solution :/
  return parsedData.reduce((acc, curr) => {
    if (isSafe(curr)) {
      return acc + 1
    }

    for (let i = 0; i < curr.length; i++) {
      const newArray = [...curr]
      newArray.splice(i, 1)
      if (isSafe(newArray)) {
        return acc + 1
      }
    }

    return acc
  }, 0)
}
