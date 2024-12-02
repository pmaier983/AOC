import z from "zod"
import { readCSV } from "../utils"

const day1CsvSchema = z.array(z.tuple([z.number(), z.number()]))

export const day1part1 = () => {
  const data = readCSV("src/data/day1input.csv")

  const parsedData = day1CsvSchema.parse(data)

  const list1 = parsedData.map((line) => line[0])
  const list2 = parsedData.map((line) => line[1])

  const sortedList1 = list1.sort()
  const sortedList2 = list2.sort()

  // Assumptions:
  // 1. Always positive numbers
  // 2. Always the same length lists
  const distances = sortedList1.map((num1, index) =>
    Math.abs(num1 - sortedList2[index]!)
  )

  const totalDistance = distances.reduce((acc, curr) => acc + curr, 0)

  return totalDistance
}

export const day1part2 = () => {
  const data = readCSV("src/data/day1input.csv")

  const parsedData = day1CsvSchema.parse(data)

  const list1 = parsedData.map((line) => line[0])
  const list2 = parsedData.map((line) => line[1])

  const list2NumberCount = list2.reduce((acc, curr) => {
    acc[curr] = (acc[curr] ?? 0) + 1
    return acc
  }, {} as Record<number, number>)

  return list1.reduce((acc, cur) => {
    return acc + cur * (list2NumberCount[cur] || 0)
  }, 0)
}
