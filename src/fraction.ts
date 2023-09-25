export default class Fraction {
    numerator: number
    denominator: number

    constructor(numerator: number | string, denominator: number | string) {
        if (Number(denominator) === 0) throw new Error('Denominator cannot be zero.')

        this.numerator = Number(numerator)
        this.denominator = Number(denominator)

        this.simplify()
    }

    simplify(): void {
        const gcd: (a: number, b: number) => number = (a, b) => (!b ? a : gcd(b, a % b))
        let divisor = gcd(Math.abs(this.numerator), Math.abs(this.denominator))

        if (this.denominator < 0) divisor *= -1

        this.numerator = this.numerator / divisor
        this.denominator = this.denominator / divisor
    }

    toString(): string {
        if (this.denominator === 1) return this.numerator.toString()

        return `${this.numerator} / ${this.denominator}`
    }

    static add(...inputs: (Fraction | number | string)[]): Fraction {
        const fractions: Fraction[] = inputs.map(fraction =>
            typeof fraction === 'number' || typeof fraction === 'string' ? new Fraction(fraction, 1) : fraction
        )

        const result = new Fraction(0, 1)

        fractions.forEach(fraction => {
            result.numerator = result.numerator * fraction.denominator + result.denominator * fraction.numerator
            result.denominator *= fraction.denominator
        })

        result.simplify()
        return result
    }

    static multiply(...inputs: (Fraction | number | string)[]): Fraction {
        const fractions: Fraction[] = inputs.map(fraction =>
            typeof fraction === 'number' || typeof fraction === 'string' ? new Fraction(fraction, 1) : fraction
        )

        const result = new Fraction(1, 1)

        fractions.forEach(fraction => {
            result.numerator *= fraction.numerator
            result.denominator *= fraction.denominator
        })

        result.simplify()
        return result
    }

    static divide(fraction1: Fraction | number | string, fraction2: Fraction | number | string): Fraction {
        const reciprocal =
            typeof fraction2 === 'number' || typeof fraction2 === 'string'
                ? new Fraction(1, fraction2)
                : new Fraction(fraction2.denominator, fraction2.numerator)

        return Fraction.multiply(fraction1, reciprocal)
    }
}
