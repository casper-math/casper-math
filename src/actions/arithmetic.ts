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

const computePowers: Action = {
    name: 'compute powers',
    pattern: 'a ^ b',
    variables: { a: 'number', b: 'number' },
    handle: ({ a, b }) => (Number.isInteger(b) ? Math.pow(Number(a), Number(b)) : `(${a}) ^ (${b})`)
}

const squareRoot: Action = {
    name: 'square root',
    pattern: 'sqrt(a)',
    variables: { a: 'number' },
    handle: ({ a }) => (Number.isInteger(Math.sqrt(Number(a))) ? Math.sqrt(Number(a)) : `sqrt(${a})`)
}

export default [add, multiply, computePowers, squareRoot]
