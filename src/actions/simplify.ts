import { Action } from '../interfaces'

const addOneAndOne: Action = {
    name: 'add one and one',
    pattern: 'a + a',
    variables: { a: 'expression' },
    handle: ({ a }) => `2 * (${a})`
}

const addLikeTerms: Action = {
    name: 'add like terms',
    pattern: 'a * x + b * x',
    variables: { a: 'number', b: 'number', x: 'expression' },
    handle: ({ a, b, x }) => `${Number(a) + Number(b)} * (${x})`
}

const addOne: Action = {
    name: 'add one',
    pattern: 'a * x + x',
    variables: { a: 'number', x: 'expression' },
    handle: ({ a, x }) => `${Number(a) + 1} * (${x})`
}

export default [addOneAndOne, addLikeTerms, addOne]
