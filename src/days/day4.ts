import z from "zod"

import { readTxt } from "../utils"

const GOAL_TEXT = "XMAS"

const DIRECTIONS = {
  N: "N",
  NE: "NE",
  E: "E",
  SE: "SE",
  S: "S",
  SW: "SW",
  W: "W",
  NW: "NW",
} as const

type Direction = (typeof DIRECTIONS)[keyof typeof DIRECTIONS]

const DIRECTIONS_ARRAY = Object.values(DIRECTIONS)

const xMasDfs = (
  grid: string[][],
  row: number,
  col: number,
  direction: Direction,
  cur: string = ""
): number => {
  const possibleCurrentCell = grid?.[row]?.[col]

  if (!possibleCurrentCell) return 0

  const newCur = cur + possibleCurrentCell

  // if cur is not at least partially XMAX, return 0
  if (!GOAL_TEXT.startsWith(newCur)) return 0

  if (newCur === GOAL_TEXT) return 1

  switch (direction) {
    case DIRECTIONS.N:
      return xMasDfs(grid, row - 1, col, direction, newCur)
    case DIRECTIONS.NE:
      return xMasDfs(grid, row - 1, col + 1, direction, newCur)
    case DIRECTIONS.E:
      return xMasDfs(grid, row, col + 1, direction, newCur)
    case DIRECTIONS.SE:
      return xMasDfs(grid, row + 1, col + 1, direction, newCur)
    case DIRECTIONS.S:
      return xMasDfs(grid, row + 1, col, direction, newCur)
    case DIRECTIONS.SW:
      return xMasDfs(grid, row + 1, col - 1, direction, newCur)
    case DIRECTIONS.W:
      return xMasDfs(grid, row, col - 1, direction, newCur)
    case DIRECTIONS.NW:
      return xMasDfs(grid, row - 1, col - 1, direction, newCur)
  }
}

export const day4part1 = () => {
  const data = readTxt("src/data/day4input.txt")

  const rowsOfText = z.array(z.string()).parse(data.split("\n"))

  const textGrid = rowsOfText.map((row) => row.split(""))

  let result = 0

  for (let x = 0; x < textGrid.length; x++) {
    for (let y = 0; y < textGrid[x]!.length; y++) {
      result += DIRECTIONS_ARRAY.reduce((acc, direction) => {
        return acc + xMasDfs(textGrid, x, y, direction)
      }, 0)
    }
  }

  return result
}

const NEW_GOAL_TEXT_ARRAY = ["MAS", "SAM"]

export const day4part2 = () => {
  const data = readTxt("src/data/day4input.txt")

  const rowsOfText = z.array(z.string()).parse(data.split("\n"))

  const textGrid = rowsOfText.map((row) => row.split(""))

  let result = 0

  for (let x = 0; x < textGrid.length; x++) {
    for (let y = 0; y < textGrid[x]!.length; y++) {
      const cell = textGrid[x]![y]!

      // don't go out of bounds
      if (
        x - 1 < 0 ||
        x + 1 >= textGrid.length ||
        y - 1 < 0 ||
        y + 1 >= textGrid[x]!.length
      )
        continue

      if (cell === "A") {
        const possibleMas1 =
          textGrid[x - 1]![y - 1]! + "A" + textGrid[x + 1]![y + 1]!
        const possibleMas2 =
          textGrid[x - 1]![y + 1]! + "A" + textGrid[x + 1]![y - 1]!

        if (
          NEW_GOAL_TEXT_ARRAY.includes(possibleMas1) &&
          NEW_GOAL_TEXT_ARRAY.includes(possibleMas2)
        ) {
          result += 1
        }
      }
    }
  }

  return result
}
