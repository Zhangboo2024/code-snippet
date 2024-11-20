interface Item {
  name: string
  key: number
}
const arr: Item[] = [
  { name: '1', key: 1 },
  { name: '1', key: 1 },
  { name: '3', key: 3 },
  { name: '2', key: 2 },
  { name: '1', key: 1 },
  { name: '1', key: 1 },
  { name: '2', key: 2 },
  { name: '3', key: 3 },
  { name: '1', key: 1 },
  { name: '2', key: 2 },
  { name: '1', key: 1 },
  { name: '1', key: 1 },
  { name: '1', key: 1 }
]

function sortDescriptionListByColumn<
  T extends Record<K, number> & Record<string, any>,
  K extends keyof T
>(list: T[], columnKey: K): T[] {
  const copy = list.slice()
  const resList: T[] = []
  let tempRow: T[] = []
  do {
    const len = tempRow.reduce((acc, cur) => acc + cur[columnKey], 0)
    if (len + copy[0][columnKey] <= 3) {
      tempRow.push(copy.shift()!)
    } else {
      const targetIndex = copy.findIndex((item) => item[columnKey] === 3 - len)
      if (~targetIndex) {
        tempRow.push(copy.splice(targetIndex, 1)[0])
      }
      resList.push(...tempRow)
      tempRow = []
    }
    if (!copy.length) {
      resList.push(...tempRow)
    }
  } while (copy.length)
  return resList
}

console.log(sortDescriptionListByColumn(arr, 'key'))
