import { Action } from '../interfaces'

const add: Action = {
    pattern: 'x + y',
    variables: { x: 'number', y: 'number' },
    handle: ({ x, y }) => Number(x) + Number(y)
}

const multiply: Action = {
    pattern: 'x * y',
    variables: { x: 'number', y: 'number' },
    handle: ({ x, y }) => Number(x) * Number(y)
}

const divide: Action = {
    pattern: 'x / y',
    variables: { x: 'number', y: 'number' },
    handle: ({ x, y }) => {
        let quotient = Number(x) / Number(y)
        return Number.isInteger(quotient) ? quotient : `(${x}) / (${y})`
    }
}

export default [add, multiply, divide]
