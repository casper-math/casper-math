import Fraction from './../src/fraction'

it('can instantiate a new fraction', () => {
    let fraction = new Fraction(3, 5)
    expect(fraction.numerator).toBe(3)
    expect(fraction.denominator).toBe(5)
})

test('the denominator cannot be zero', () => {
    expect(() => new Fraction(3, 0)).toThrow('Denominator cannot be zero.')
})

test('a fraction is simplified to lowest terms', () => {
    let fraction = new Fraction(60, 126)
    expect(fraction).toEqual(new Fraction(10, 21))
})

test('zero is simplified to lowest terms', () => {
    let fraction = new Fraction(0, 5)
    expect(fraction).toEqual(new Fraction(0, 1))
})

test('negative numbers in the numerator are simplified to lowest terms', () => {
    let fraction = new Fraction(-8, 12)
    expect(fraction).toEqual(new Fraction(-2, 3))
})

test('negative numbers in the denominator are simplified to lowest terms', () => {
    let fraction = new Fraction(45, -30)
    expect(fraction).toEqual(new Fraction(-3, 2))
})

test('negative numbers in both the numerator and denominator are simplified to lowest terms', () => {
    let fraction = new Fraction(-8, -6)
    expect(fraction).toEqual(new Fraction(4, 3))
})

it('can add fractions', () => {
    let fraction1 = new Fraction(2, 5)
    let fraction2 = new Fraction(4, 5)
    let result = Fraction.add(fraction1, fraction2)

    expect(result).toEqual(new Fraction(6, 5))
})

it('can add fractions with different denominators', () => {
    let fraction1 = new Fraction(4, 21)
    let fraction2 = new Fraction(8, 14)
    let result = Fraction.add(fraction1, fraction2)

    expect(result).toEqual(new Fraction(16, 21))
})

it('can add fractions and numbers', () => {
    let fraction = new Fraction(4, 7)
    let number = 3
    let result = Fraction.add(fraction, number)

    expect(result).toEqual(new Fraction(25, 7))
})

it('can add multiple fractions at once', () => {
    let fraction1 = new Fraction(-15, -4)
    let fraction2 = new Fraction(9, -20)
    let fraction3 = new Fraction(-7, 18)
    let fraction4 = new Fraction(-12, 14)
    let number = 6
    let result = Fraction.add(fraction1, fraction2, fraction3, fraction4, number)

    expect(result).toEqual(new Fraction(2537, 315))
})

it('can multiply fractions', () => {
    let fraction1 = new Fraction(2, 5)
    let fraction2 = new Fraction(4, 5)
    let result = Fraction.multiply(fraction1, fraction2)

    expect(result).toEqual(new Fraction(8, 25))
})

it('can multiply fractions with different denominators', () => {
    let fraction1 = new Fraction(4, 21)
    let fraction2 = new Fraction(8, 14)
    let result = Fraction.multiply(fraction1, fraction2)

    expect(result).toEqual(new Fraction(16, 147))
})

it('can multiply fractions and numbers', () => {
    let fraction = new Fraction(4, 7)
    let number = 3
    let result = Fraction.multiply(fraction, number)

    expect(result).toEqual(new Fraction(12, 7))
})

it('can add multiple fractions at once', () => {
    let fraction1 = new Fraction(-15, -4)
    let fraction2 = new Fraction(9, -20)
    let fraction3 = new Fraction(-7, 18)
    let fraction4 = new Fraction(-12, 14)
    let number = 6
    let result = Fraction.multiply(fraction1, fraction2, fraction3, fraction4, number)

    expect(result).toEqual(new Fraction(-27, 8))
})

it('can divide fractions', () => {
    let fraction1 = new Fraction(2, 5)
    let fraction2 = new Fraction(4, 5)
    let result = Fraction.divide(fraction1, fraction2)

    expect(result).toEqual(new Fraction(1, 2))
})

it('can divide fractions with different denominators', () => {
    let fraction1 = new Fraction(4, 21)
    let fraction2 = new Fraction(8, 14)
    let result = Fraction.divide(fraction1, fraction2)

    expect(result).toEqual(new Fraction(1, 3))
})

it('can divide fractions and numbers', () => {
    let fraction = new Fraction(4, 7)
    let number = 3
    let result = Fraction.divide(fraction, number)

    expect(result).toEqual(new Fraction(4, 21))
})
