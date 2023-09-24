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

export default [add, multiply, simplify]
