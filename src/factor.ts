export default function (number: number): number[] {
    if (!Number.isInteger(number) || number <= 1) return []

    const factors: number[] = []
    let divisor: number = 2

    while (number !== 1) {
        if (number % divisor === 0) {
            number /= divisor
            factors.push(divisor)
        } else {
            divisor++
        }
    }

    return factors
}
