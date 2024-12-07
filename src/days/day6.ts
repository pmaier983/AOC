import { readTxt } from "../utils"

const DIRECTIONS = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
} as const

type Direction = (typeof DIRECTIONS)[keyof typeof DIRECTIONS]

export const allOfDay6 = () => {
  const data = readTxt("src/data/day6input.txt")

  const map = data.split("\n").map((row) => row.split(""))

  const findGuardPosition = () => {
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y]!.length; x++) {
        if (map[y]![x] === "^") {
          return { x, y }
        }
      }
    }
    throw new Error("no guard found")
  }

  const getNextPosition = (x: number, y: number, direction: Direction) => {
    switch (direction) {
      case DIRECTIONS.UP:
        return { x, y: y - 1 }
      case DIRECTIONS.DOWN:
        return { x, y: y + 1 }
      case DIRECTIONS.LEFT:
        return { x: x - 1, y }
      case DIRECTIONS.RIGHT:
        return { x: x + 1, y }
    }
  }

  const guardPosition = findGuardPosition()

  const canEscape = (newMap: string[][]) => {
    let x = guardPosition.x
    let y = guardPosition.y

    let direction: Direction = DIRECTIONS.UP

    const visited = new Set<`${string}|${string}|${Direction}`>()

    // while in the bounds of the map
    while (true) {
      if (visited.has(`${x}|${y}|${direction}`)) {
        return false
      }

      visited.add(`${x}|${y}|${direction}`)

      const nextPosition = getNextPosition(x, y, direction)

      if (
        nextPosition.x < 0 ||
        nextPosition.y < 0 ||
        nextPosition.x >= newMap[0]!.length ||
        nextPosition.y >= newMap.length
      ) {
        return true
      }

      if (newMap[nextPosition.y]![nextPosition.x] === "#") {
        // turn right
        switch (direction) {
          case DIRECTIONS.UP:
            direction = DIRECTIONS.RIGHT
            break
          case DIRECTIONS.RIGHT:
            direction = DIRECTIONS.DOWN
            break
          case DIRECTIONS.DOWN:
            direction = DIRECTIONS.LEFT
            break
          case DIRECTIONS.LEFT:
            direction = DIRECTIONS.UP
            break
        }
      } else {
        // otherwise continue on
        x = nextPosition.x
        y = nextPosition.y
      }
    }
  }

  let escapeObstructionCount = 0

  // Lol inefficient code
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y]!.length; x++) {
      console.log(x, y)
      if (map[y]![x] === "#") {
        continue
      }

      if (map[y]![x] === "^") {
        continue
      }

      const mapClone: string[][] = JSON.parse(JSON.stringify(map))
      mapClone[y]![x] = "#"

      if (!canEscape(mapClone)) {
        escapeObstructionCount++
      }
    }
  }

  return escapeObstructionCount
}
