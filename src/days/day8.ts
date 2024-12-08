import { readTxt } from "../utils"

interface Point {
  x: number
  y: number
}

// Yup 100% chatGPT generated function :cry:
const getAntiNodes = (
  node1: Point,
  node2: Point,
  grid: string[][]
): Point[] => {
  const antiNodes: Point[] = []

  // Calculate the direction vector from node1 to node2
  const dx = node2.x - node1.x
  const dy = node2.y - node1.y

  // Normalize the vector to get a step increment
  const gcd = (a: number, b: number): number =>
    b === 0 ? Math.abs(a) : gcd(b, a % b)

  const step = gcd(dx, dy)
  const stepX = dx / step
  const stepY = dy / step

  // Generate antinodes along the line in both directions
  for (let multiplier = -1; multiplier <= 1; multiplier += 2) {
    let x = node1.x + stepX * multiplier
    let y = node1.y + stepY * multiplier
    while (x >= 0 && x < grid[0]!.length && y >= 0 && y < grid.length) {
      antiNodes.push({ x, y })
      x += stepX * multiplier
      y += stepY * multiplier
    }
  }

  return antiNodes
}

export const allOfDay8 = () => {
  const data = readTxt("src/data/day8input.txt")

  const grid = data.split("\n").map((row) => {
    return row.split("")
  })

  const nodesDict: Record<string, Point[]> = {}

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y]!.length; x++) {
      const possibleNode = grid[y]![x]
      if (possibleNode !== "." && possibleNode !== undefined) {
        nodesDict[possibleNode] = [...(nodesDict[possibleNode] ?? []), { x, y }]
      }
    }
  }

  const nodes = Object.values(nodesDict)

  const antiNodes = nodes.reduce((acc, node) => {
    // compare every node to every other node
    for (let i = 0; i < node.length; i++) {
      for (let j = 0; j < node.length; j++) {
        if (j === i) continue
        const node1 = node[i]!
        const node2 = node[j]!

        acc.push(...getAntiNodes(node1, node2, grid))
      }
    }

    return acc
  }, [] as Point[])

  const validAntiNodes = antiNodes.filter((point) => {
    // if the point is in the grid
    return (
      point.x >= 0 &&
      point.x < grid[0]!.length &&
      point.y >= 0 &&
      point.y < grid.length
    )
  })

  const antiNodesSet = new Set(
    validAntiNodes.map((point) => `${point.x}|${point.y}`)
  )

  return antiNodesSet.size
}
