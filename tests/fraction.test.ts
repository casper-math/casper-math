import Fraction from './../src/fraction'

it('can instantiate a new fraction', () => {
    const fraction = new Fraction(3, 5)
    expect(fraction.numerator).toBe(3)
    expect(fraction.denominator).toBe(5)
})

it('can instantiate a new fraction from strings', () => {
    const fraction = new Fraction('4', '6')
    expect(fraction.numerator).toBe(2)
    expect(fraction.denominator).toBe(3)
})

test('the denominator cannot be zero', () => {
    expect(() => new Fraction(3, 0)).toThrow('Denominator cannot be zero.')
})

test('a fraction is simplified to lowest terms', () => {
    const fraction = new Fraction(60, 126)
    expect(fraction).toEqual(new Fraction(10, 21))
})

test('zero is simplified to lowest terms', () => {
    const fraction = new Fraction(0, 5)
    expect(fraction).toEqual(new Fraction(0, 1))
})

test('negative numbers in the numerator are simplified to lowest terms', () => {
    const fraction = new Fraction(-8, 12)
    expect(fraction).toEqual(new Fraction(-2, 3))
})

test('negative numbers in the denominator are simplified to lowest terms', () => {
    const fraction = new Fraction(45, -30)
    expect(fraction).toEqual(new Fraction(-3, 2))
})

test('negative numbers in both the numerator and denominator are simplified to lowest terms', () => {
    const fraction = new Fraction(-8, -6)
    expect(fraction).toEqual(new Fraction(4, 3))
})

it('can instantiate fractions from floats', () => {
    const fraction = new Fraction(2.5, 2)
    expect(fraction).toEqual(new Fraction(5, 4))
})

it('can instantiate fractions from negative floats', () => {
    const fraction = new Fraction(3.6, -2.2)
    expect(fraction).toEqual(new Fraction(-18, 11))
})

it('can add fractions', () => {
    const fraction1 = new Fraction(2, 5)
    const fraction2 = new Fraction(4, 5)
    const result = Fraction.add(fraction1, fraction2)

    expect(result).toEqual(new Fraction(6, 5))
})

it('can add fractions with different denominators', () => {
    const fraction1 = new Fraction(4, 21)
    const fraction2 = new Fraction(8, 14)
    const result = Fraction.add(fraction1, fraction2)

    expect(result).toEqual(new Fraction(16, 21))
})

it('can add fractions and numbers', () => {
    const fraction = new Fraction(4, 7)
    const number = 3
    const result = Fraction.add(fraction, number)

    expect(result).toEqual(new Fraction(25, 7))
})

it('can add fractions and strings', () => {
    const fraction = new Fraction(4, 7)
    const number = '4'
    const result = Fraction.add(fraction, number)

    expect(result).toEqual(new Fraction(32, 7))
})

it('can add multiple fractions at once', () => {
    const fraction1 = new Fraction(-15, -4)
    const fraction2 = new Fraction(9, -20)
    const fraction3 = new Fraction(-7, 18)
    const fraction4 = new Fraction(-12, 14)
    const number = 6
    const result = Fraction.add(fraction1, fraction2, fraction3, fraction4, number)

    expect(result).toEqual(new Fraction(2537, 315))
})

it('can multiply fractions', () => {
    const fraction1 = new Fraction(2, 5)
    const fraction2 = new Fraction(4, 5)
    const result = Fraction.multiply(fraction1, fraction2)

    expect(result).toEqual(new Fraction(8, 25))
})

it('can multiply fractions with different denominators', () => {
    const fraction1 = new Fraction(4, 21)
    const fraction2 = new Fraction(8, 14)
    const result = Fraction.multiply(fraction1, fraction2)

    expect(result).toEqual(new Fraction(16, 147))
})

it('can multiply fractions and numbers', () => {
    const fraction = new Fraction(4, 7)
    const number = 3
    const result = Fraction.multiply(fraction, number)

    expect(result).toEqual(new Fraction(12, 7))
})

it('can multiply fractions and strings', () => {
    const fraction = new Fraction(4, 7)
    const number = '4'
    const result = Fraction.multiply(fraction, number)

    expect(result).toEqual(new Fraction(16, 7))
})

it('can add multiple fractions at once', () => {
    const fraction1 = new Fraction(-15, -4)
    const fraction2 = new Fraction(9, -20)
    const fraction3 = new Fraction(-7, 18)
    const fraction4 = new Fraction(-12, 14)
    const number = 6
    const result = Fraction.multiply(fraction1, fraction2, fraction3, fraction4, number)

    expect(result).toEqual(new Fraction(-27, 8))
})

it('can divide fractions', () => {
    const fraction1 = new Fraction(2, 5)
    const fraction2 = new Fraction(4, 5)
    const result = Fraction.divide(fraction1, fraction2)

    expect(result).toEqual(new Fraction(1, 2))
})

it('can divide fractions with different denominators', () => {
    const fraction1 = new Fraction(4, 21)
    const fraction2 = new Fraction(8, 14)
    const result = Fraction.divide(fraction1, fraction2)

    expect(result).toEqual(new Fraction(1, 3))
})

it('can divide fractions and numbers', () => {
    const fraction = new Fraction(4, 7)
    const number = 3
    const result = Fraction.divide(fraction, number)

    expect(result).toEqual(new Fraction(4, 21))
})

it('can divide fractions and strings', () => {
    const fraction = new Fraction(4, 7)
    const number = '4'
    const result = Fraction.divide(fraction, number)

    expect(result).toEqual(new Fraction(1, 7))
})

it('can convert the fraction to a string', () => {
    const fraction = new Fraction(4, 7)
    expect(fraction.toString()).toBe('4 / 7')
})

it('returns the numerator if the denominator is 1', () => {
    const fraction = new Fraction(8, 1)
    expect(fraction.toString()).toBe('8')
})
