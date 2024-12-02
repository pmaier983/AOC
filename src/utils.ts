import fs from "fs"

export const readCSV = (filePath: string): number[][] => {
  const data = fs.readFileSync(filePath, "utf8")
  return data.split("\n").map((line) => line.trim().split(/\s+/).map(Number))
}
