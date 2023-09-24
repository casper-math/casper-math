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
        return new Fraction(Number(a), Number(b)).toString()
    }
}

const addFractions: Action = {
    name: 'add fractions',
    pattern: 'a / b + c / d',
    variables: { a: 'number', b: 'number', c: 'number', d: 'number' },
    handle: ({ a, b, c, d }) =>
        Fraction.add(new Fraction(Number(a), Number(b)), new Fraction(Number(c), Number(d))).toString()
}

const addFractionsAndNumbers: Action = {
    name: 'add fractions and numbers',
    pattern: 'a / b + c',
    variables: { a: 'number', b: 'number', c: 'number' },
    handle: ({ a, b, c }) => Fraction.add(new Fraction(Number(a), Number(b)), Number(c)).toString()
}

export default [add, multiply, simplify, addFractions, addFractionsAndNumbers]
