import { Action } from '../interfaces'

const addNumbers: Action = {
    pattern: 'x + y',
    variables: { x: 'number', y: 'number' },
    handle: ({ x, y }) => Number(x) + Number(y)
}

const multiplyNumbers: Action = {
    pattern: 'x * y',
    variables: { x: 'number', y: 'number' },
    handle: ({ x, y }) => Number(x) * Number(y)
}

export default [addNumbers, multiplyNumbers]
