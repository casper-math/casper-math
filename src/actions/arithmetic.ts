import Fraction from '../fraction'
import { Action } from '../interfaces'

const add: Action = {
    name: 'add numbers',
    pattern: 'a + b',
    variables: { a: 'number', b: 'number' },
    handle: ({ a, b }) => Number(a) + Number(b),
    log: ({ a, b }) => `Compute $ ${a} + ${b} $. The result is $ ${Number(a) + Number(b)} $.`
}

const multiply: Action = {
    name: 'multiply numbers',
    pattern: 'a * b',
    variables: { a: 'number', b: 'number' },
    handle: ({ a, b }) => Number(a) * Number(b),
    log: ({ a, b }) => `Compute $ ${a} * ${b} $. The result is $ ${Number(a) * Number(b)} $.`
}

const simplify: Action = {
    name: 'simplify fractions',
    pattern: 'a / b',
    variables: { a: 'number', b: 'number' },
    handle: ({ a, b }) => new Fraction(a, b).toString(),
    log({ a, b }) {
        const fraction = new Fraction(a, b)
        const divisor = Number(a) / fraction.numerator
        return `Divide both the numerator (${a}) and the denominator (${b}) by the greatest common divisor, ${divisor}.`
    }
}

const addFractions: Action = {
    name: 'add fractions',
    pattern: 'a / b + c / d',
    variables: { a: 'number', b: 'number', c: 'number', d: 'number' },
    handle: ({ a, b, c, d }) => Fraction.add(new Fraction(a, b), new Fraction(c, d)).toString(),
    log: () => 'add fractions'
}

const addFractionsAndNumbers: Action = {
    name: 'add fractions and numbers',
    pattern: 'a / b + c',
    variables: { a: 'number', b: 'number', c: 'number' },
    handle: ({ a, b, c }) => Fraction.add(new Fraction(a, b), c).toString(),
    log: () => 'add fractions and numbers'
}

const multiplyFractions: Action = {
    name: 'multiply fractions',
    pattern: '(a / b) * (c / d)',
    variables: { a: 'number', b: 'number', c: 'number', d: 'number' },
    handle: ({ a, b, c, d }) => Fraction.multiply(new Fraction(a, b), new Fraction(c, d)).toString(),
    log: () => 'multiply fractions'
}

const multiplyFractionsAndNumbers: Action = {
    name: 'multiply fractions and numbers',
    pattern: 'a / b * c',
    variables: { a: 'number', b: 'number', c: 'number' },
    handle: ({ a, b, c }) => Fraction.multiply(new Fraction(a, b), c).toString(),
    log: () => 'multiply fractions and numbers'
}

const computePowers: Action = {
    name: 'compute powers',
    pattern: 'a ^ b',
    variables: { a: 'number', b: 'number' },
    handle: ({ a, b }) => (Number.isInteger(b) ? Math.pow(Number(a), Number(b)) : `(${a}) ^ (${b})`),
    log: ({ a, b }) =>
        `$ ${a} ^ ${b} = ${Array(Number(b)).fill(Number(a)).join('*')} = ${Math.pow(Number(a), Number(b))} $.`
}

const computePowerOfFraction: Action = {
    name: 'compute powers of fractions',
    pattern: '(a / b)^c',
    variables: { a: 'expression', b: 'expression', c: 'number' },
    handle: ({ a, b, c }) => {
        if (!Number.isInteger(c) || Number(c) <= 1) {
            return `((${a}) / (${b})) ^ (${c})`
        }

        return Array(Number(c)).fill(`((${a}) / (${b}))`).join('*')
    },
    log: () => 'compute powers of fractions'
}

const fractionDividedByFraction: Action = {
    name: 'fraction divided by fraction',
    pattern: '(a / b) / (c / d)',
    variables: { a: 'expression', b: 'expression', c: 'expression', d: 'expression' },
    handle: ({ a, b, c, d }) => `((${a}) * (${d})) / ((${b}) * (${c}))`,
    log: () => 'fraction divided by fraction'
}

const dividedByFraction: Action = {
    name: 'divided by fraction',
    pattern: 'a / (b / c)',
    variables: { a: 'expression', b: 'expression', c: 'expression' },
    handle: ({ a, b, c }) => `((${a}) * (${c})) / (${b})`,
    log: () => 'divided by fraction'
}

const squareRoot: Action = {
    name: 'square root',
    pattern: 'sqrt(a)',
    variables: { a: 'number' },
    handle: ({ a }) => (Number.isInteger(Math.sqrt(Number(a))) ? Math.sqrt(Number(a)) : `sqrt(${a})`),
    log: () => 'square root'
}

const squareRootOfFraction: Action = {
    name: 'square root of fraction',
    pattern: 'sqrt(a / b)',
    variables: { a: 'expression', b: 'expression' },
    handle: ({ a, b }) => `sqrt(${a}) / sqrt(${b})`,
    log: () => 'square root of fraction'
}

export default [
    add,
    multiply,
    simplify,
    addFractions,
    addFractionsAndNumbers,
    multiplyFractions,
    multiplyFractionsAndNumbers,
    computePowers,
    computePowerOfFraction,
    fractionDividedByFraction,
    dividedByFraction,
    squareRoot,
    squareRootOfFraction
]
