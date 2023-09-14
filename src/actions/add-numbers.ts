import { Action } from './../interfaces'

const addNumbers: Action = {
    pattern: 'x + y',

    variables: {
        x: 'number',
        y: 'number'
    },

    handle({ x, y }) {
        return Number(x) + Number(y)
    }
}

export default addNumbers
