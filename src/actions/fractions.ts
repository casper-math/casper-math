import Fraction from '../fraction'
import { Action } from '../interfaces'

const simplify: Action = {
    name: 'simplify fractions',
    pattern: 'a / b',
    variables: { a: 'number', b: 'number' },
    handle: ({ a, b }) => new Fraction(a, b).toString()
}

const add: Action = {
    name: 'add fractions',
    pattern: 'a / b + c / d',
    variables: { a: 'number', b: 'number', c: 'number', d: 'number' },
    handle: ({ a, b, c, d }) => Fraction.add(new Fraction(a, b), new Fraction(c, d)).toString()
}

const addToNumber: Action = {
    name: 'add fractions and numbers',
    pattern: 'a / b + c',
    variables: { a: 'number', b: 'number', c: 'number' },
    handle: ({ a, b, c }) => Fraction.add(new Fraction(a, b), c).toString()
}

const multiply: Action = {
    name: 'multiply fractions',
    pattern: '(a / b) * (c / d)',
    variables: { a: 'number', b: 'number', c: 'number', d: 'number' },
    handle: ({ a, b, c, d }) => Fraction.multiply(new Fraction(a, b), new Fraction(c, d)).toString()
}

const multiplyWithNumber: Action = {
    name: 'multiply fractions and numbers',
    pattern: 'a / b * c',
    variables: { a: 'number', b: 'number', c: 'number' },
    handle: ({ a, b, c }) => Fraction.multiply(new Fraction(a, b), c).toString()
}

const division: Action = {
    name: 'fraction divided by fraction',
    pattern: '(a / b) / (c / d)',
    variables: { a: 'expression', b: 'expression', c: 'expression', d: 'expression' },
    handle: ({ a, b, c, d }) => `((${a}) * (${d})) / ((${b}) * (${c}))`
}

const dividedByFraction: Action = {
    name: 'divided by fraction',
    pattern: 'a / (b / c)',
    variables: { a: 'expression', b: 'expression', c: 'expression' },
    handle: ({ a, b, c }) => `((${a}) * (${c})) / (${b})`
}

const computePower: Action = {
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

const squareRoot: Action = {
    name: 'square root of fraction',
    pattern: 'sqrt(a / b)',
    variables: { a: 'expression', b: 'expression' },
    handle: ({ a, b }) => `sqrt(${a}) / sqrt(${b})`
}

export default [
    add,
    addToNumber,
    computePower,
    dividedByFraction,
    division,
    multiply,
    multiplyWithNumber,
    simplify,
    squareRoot
]
