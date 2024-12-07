import { readTxt } from "../utils"

export const allOfDay5 = () => {
  const data = readTxt("src/data/day5input.txt")

  const rows = data.split("\n")

  const rules = rows.filter((row) => row.includes("|"))

  const updates = rows.filter((row) => row.includes(","))

  const rulesMap = rules.reduce((acc, rule) => {
    const [before, after] = rule.split("|")
    if (!before || !after) throw new Error("no before or after")

    acc[before] = {
      ...acc?.[before],
      comesBefore: acc?.[before]?.comesBefore
        ? acc?.[before]?.comesBefore.add(after)
        : new Set([after]),
      comesAfter: acc?.[before]?.comesAfter
        ? acc?.[before]?.comesAfter
        : new Set(),
    }

    acc[after] = {
      ...acc?.[after],
      comesBefore: acc?.[after]?.comesBefore
        ? acc?.[after]?.comesBefore
        : new Set(),
      comesAfter: acc?.[after]?.comesAfter
        ? acc?.[after]?.comesAfter.add(before)
        : new Set([before]),
    }
    return acc
  }, {} as Record<string, { comesAfter: Set<string>; comesBefore: Set<string> }>)

  const updatesGrid = updates.map((update) => {
    return update.split(",")
  })

  // Ugly n^2 solution
  const isCorrectOrder = (update: string[]) => {
    for (let i = 0; i < update.length; i++) {
      const curI = update[i]!
      for (let j = 0; j < update.length; j++) {
        const curJ = update[j]!

        if (i === j) continue

        // if I comes before J
        if (i < j) {
          // if I should come after J
          if (rulesMap[curI]!.comesAfter.has(curJ)) {
            return false
          }
        } else {
          // if J comes before I
          if (rulesMap[curI]!.comesBefore.has(curJ)) {
            return false
          }
        }
      }
    }

    return true
  }

  // const part1 = updatesGrid.reduce((acc, cur) => {
  //   if (isCorrectOrder(cur)) {
  //     return acc + Number(cur[Math.floor(cur.length / 2)])
  //   }
  //   return acc
  // }, 0)
  // console.log(part1)

  const swapFirstMistake = (update: string[]) => {
    for (let i = 0; i < update.length; i++) {
      const curI = update[i]!
      for (let j = 0; j < update.length; j++) {
        const curJ = update[j]!

        if (i === j) continue

        // if I comes before J
        if (i < j) {
          // if I should come after J
          if (rulesMap[curI]!.comesAfter.has(curJ)) {
            const temp = update[i]!
            update[i] = update[j]!
            update[j] = temp
            return
          }
        } else {
          // if J comes before I
          if (rulesMap[curI]!.comesBefore.has(curJ)) {
            const temp = update[i]!
            update[i] = update[j]!
            update[j] = temp
            return
          }
        }
      }
    }
    console.error("no mistake found")
    return
  }

  const fixOrder = (update: string[]): string[] => {
    const newUpdate = [...update]

    while (isCorrectOrder(newUpdate) === false) {
      swapFirstMistake(newUpdate)
    }

    return newUpdate
  }

  const badMadeGoodUpdates = updatesGrid
    .filter((update) => !isCorrectOrder(update))
    .map((update, i) => {
      return fixOrder(update)
    })

  return badMadeGoodUpdates.reduce((acc, cur) => {
    return acc + Number(cur[Math.floor(cur.length / 2)])
  }, 0)
}
