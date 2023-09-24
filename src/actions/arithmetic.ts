import Fraction from '../fraction'
import { Action } from '../interfaces'

const add: Action = {
    name: 'add numbers',
    pattern: 'x + y',
    variables: { x: 'number', y: 'number' },
    handle: ({ x, y }) => Number(x) + Number(y)
}

const multiply: Action = {
    name: 'multiply numbers',
    pattern: 'x * y',
    variables: { x: 'number', y: 'number' },
    handle: ({ x, y }) => Number(x) * Number(y)
}

const simplify: Action = {
    name: 'simplify fractions',
    pattern: 'x / y',
    variables: { x: 'number', y: 'number' },
    handle: ({ x, y }) => {
        let fraction = new Fraction(Number(x), Number(y))
        return fraction.denominator === 1 ? fraction.numerator : `(${fraction.numerator}) / (${fraction.denominator})`
    }
}

const addFractions: Action = {
    name: 'add fractions',
    pattern: 'a / b + c / d',
    variables: { a: 'number', b: 'number', c: 'number', d: 'number' },
    handle: ({ a, b, c, d }) => {
        let fraction = Fraction.add(new Fraction(Number(a), Number(b)), new Fraction(Number(c), Number(d)))
        return fraction.denominator === 1 ? fraction.numerator : `(${fraction.numerator}) / (${fraction.denominator})`
    }
}

export default [add, multiply, simplify, addFractions]
