import z from "zod"

import { readTxt } from "../utils"

export const day3part1 = () => {
  const data = readTxt("src/data/day3input.txt")

  const parsedData = z.string().parse(data)

  // find all the occurrences of the pattern `mul(${number},${number})`
  const allMultiplication = parsedData.match(/mul\(\d+,\d+\)/g)

  return allMultiplication?.reduce((acc, cur) => {
    const [_, firstNumber, secondNumber] = cur.match(/mul\((\d+),(\d+)\)/)!

    return acc + Number(firstNumber) * Number(secondNumber)
  }, 0)
}

export const day3part2 = () => {
  const data = readTxt("src/data/day3input.txt")

  const parsedData = z.string().parse(data)

  // find all the occurrences of the pattern `mul(${number},${number})` as well as all occurrences of `do()` and `don't()`
  const allMultiplication = parsedData.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)

  let isCounted = true

  return allMultiplication?.reduce((acc, cur) => {
    if (cur === "do()") {
      isCounted = true
      return acc
    } else if (cur === "don't()") {
      isCounted = false
      return acc
    }

    if (!isCounted) return acc

    const [_, firstNumber, secondNumber] = cur.match(/mul\((\d+),(\d+)\)/)!

    return acc + Number(firstNumber) * Number(secondNumber)
  }, 0)
}
