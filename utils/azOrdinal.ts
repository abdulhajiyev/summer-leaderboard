export function getAzOrdinal(n: number): string {
  const mod10 = n % 10
  // const mod100 = n % 100
  // if (mod100 >= 11 && mod100 <= 14) return `${n}-cü`
  switch (mod10) {
    case 1:
    case 2:
    case 5:
    case 7:
    case 8:
      return `${n}-ci`
    case 3:
    case 4:
      return `${n}-cü`
    case 6:
      return `${n}-cı`
    case 9:
    case 0:
      return `${n}-cu`
    default:
      return `${n}-ci`
  }
}