import Fraction from '../fraction'
import { Action, Type } from '../interfaces'
import Node from '../node'
import string from '../output/string'
import parse from '../parse'

const addLikeTerms: Action = {
    name: 'add like terms',
    run(node) {
        if (node.value !== '+') return node

        const coefficients: { [key: string]: Fraction } = {}

        function push(key: string | Node, value: number | Fraction = 1) {
            key = typeof key === 'string' ? key : string(key)
            value = typeof value === 'number' ? new Fraction(value, 1) : value

            if (key in coefficients) {
                coefficients[key] = Fraction.add(coefficients[key], value)
            } else {
                coefficients[key] = value
            }
        }

        node.children.forEach(child => {
            if (child.type === Type.Operator && child.value === '*') {
                const numbers = child.children.filter(factor => factor.type === Type.Number)

                if (numbers.length === 0) {
                    push(child, 1)
                    node.removeChild(child)
                    return
                }

                if (numbers.length === 1) {
                    child.removeChild(numbers[0])
                    push(child, Number(numbers[0].value))
                    node.removeChild(child)
                    return
                }

                return
            }

            if (child.type === Type.Number) {
                return
            }

            node.removeChild(child)
            push(child, 1)
            return
        })

        Object.keys(coefficients).forEach(factor => {
            node.addChild(parse(`${coefficients[factor].toString()} * (${factor})`))
        })

        return node
    }
}

const multiplyByZero: Action = {
    name: 'multiply by zero',
    pattern: 'x * 0',
    variables: { x: 'expression' },
    handle: () => 0
}

const multiplyByOne: Action = {
    name: 'multiply by one',
    pattern: 'x * 1',
    variables: { x: 'expression' },
    handle: ({ x }) => x
}

const square: Action = {
    name: 'square',
    pattern: 'x * x',
    variables: { x: 'expression' },
    handle: ({ x }) => `(${x}) ^ 2`
}

export default [addLikeTerms, multiplyByZero, multiplyByOne, square]
