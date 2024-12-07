import { readTxt } from "../utils"

interface CanCombineToValueInputs {
  targetValue: number
  numbers: number[]
  currentValue: number
}

const canCombineToValue = ({
  targetValue,
  numbers,
  currentValue = 0,
}: CanCombineToValueInputs): boolean => {
  if (currentValue === targetValue && numbers.length === 0) {
    return true
  }

  if (currentValue > targetValue) {
    return false
  }

  if (numbers.length === 0) {
    return false
  }

  const [first, ...remainingNumbers] = numbers

  return (
    canCombineToValue({
      targetValue,
      numbers: remainingNumbers,
      currentValue: currentValue + first!,
    }) ||
    canCombineToValue({
      targetValue,
      numbers: remainingNumbers,
      currentValue: currentValue * first!,
    }) ||
    canCombineToValue({
      targetValue,
      numbers: remainingNumbers,
      currentValue: parseInt(`${currentValue}${first}`),
    })
  )
}

export const allOfDay7 = () => {
  const data = readTxt("src/data/day7input.txt")

  const equations = data.split("\n").map((row) => {
    const [value, numbers] = row.split(":")
    return {
      value: parseInt(value!),
      numbers: numbers!
        .trim()
        .split(" ")
        .map((num) => parseInt(num)),
    }
  })

  return equations.reduce((acc, equation) => {
    if (
      canCombineToValue({
        targetValue: equation.value,
        numbers: equation.numbers,
        currentValue: 0,
      })
    ) {
      return acc + equation.value
    }

    return acc
  }, 0)
}
