import { Action } from './../interfaces'

const multiplyNumbers: Action = {
    pattern: 'x * y',

    variables: {
        x: 'number',
        y: 'number'
    },

    handle({ x, y }) {
        return Number(x) * Number(y)
    }
}

export default multiplyNumbers
