import Fraction from '../fraction'
import { Action } from '../interfaces'

const add: Action = {
    name: 'add numbers',
    pattern: 'a + b',
    variables: { a: 'number', b: 'number' },
    handle: ({ a, b }) => Number(a) + Number(b)
}

const multiply: Action = {
    name: 'multiply numbers',
    pattern: 'a * b',
    variables: { a: 'number', b: 'number' },
    handle: ({ a, b }) => Number(a) * Number(b)
}

const simplify: Action = {
    name: 'simplify fractions',
    pattern: 'a / b',
    variables: { a: 'number', b: 'number' },
    handle: ({ a, b }) => {
        return new Fraction(a, b).toString()
    }
}

const addFractions: Action = {
    name: 'add fractions',
    pattern: 'a / b + c / d',
    variables: { a: 'number', b: 'number', c: 'number', d: 'number' },
    handle: ({ a, b, c, d }) => Fraction.add(new Fraction(a, b), new Fraction(c, d)).toString()
}

const addFractionsAndNumbers: Action = {
    name: 'add fractions and numbers',
    pattern: 'a / b + c',
    variables: { a: 'number', b: 'number', c: 'number' },
    handle: ({ a, b, c }) => Fraction.add(new Fraction(a, b), c).toString()
}

const multiplyFractions: Action = {
    name: 'multiply fractions',
    pattern: '(a / b) * (c / d)',
    variables: { a: 'number', b: 'number', c: 'number', d: 'number' },
    handle: ({ a, b, c, d }) => Fraction.multiply(new Fraction(a, b), new Fraction(c, d)).toString()
}

const multiplyFractionsAndNumbers: Action = {
    name: 'multiply fractions and numbers',
    pattern: 'a / b * c',
    variables: { a: 'number', b: 'number', c: 'number' },
    handle: ({ a, b, c }) => Fraction.multiply(new Fraction(a, b), c).toString()
}

const computePowers: Action = {
    name: 'compute powers',
    pattern: 'a ^ b',
    variables: { a: 'number', b: 'number' },
    handle: ({ a, b }) => (Number.isInteger(b) ? Math.pow(Number(a), Number(b)) : `(${a}) ^ (${b})`)
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
    }
}

const fractionDividedByFraction: Action = {
    name: 'fraction divided by fraction',
    pattern: '(a / b) / (c / d)',
    variables: { a: 'expression', b: 'expression', c: 'expression', d: 'expression' },
    handle: ({ a, b, c, d }) => `((${a}) * (${d})) / ((${b}) * (${c}))`
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
    fractionDividedByFraction
]
