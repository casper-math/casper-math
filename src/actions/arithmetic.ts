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
        return new Fraction(Number(x), Number(y)).toString()
    }
}

const addFractions: Action = {
    name: 'add fractions',
    pattern: 'a / b + c / d',
    variables: { a: 'number', b: 'number', c: 'number', d: 'number' },
    handle: ({ a, b, c, d }) => {
        return Fraction.add(new Fraction(Number(a), Number(b)), new Fraction(Number(c), Number(d))).toString()
    }
}

const addFractionsAndNumbers: Action = {
    name: 'add fractions and numbers',
    pattern: 'a / b + c',
    variables: { a: 'number', b: 'number', c: 'number' },
    handle: ({ a, b, c }) => {
        return Fraction.add(new Fraction(Number(a), Number(b)), Number(c)).toString()
    }
}

export default [add, multiply, simplify, addFractions, addFractionsAndNumbers]
