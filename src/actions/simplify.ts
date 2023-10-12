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

        function push(key: string | Node, value: Node | number = 1) {
            key = typeof key === 'string' ? key : string(key)

            let fraction: Fraction

            if (typeof value === 'number') {
                fraction = new Fraction(value, 1)
            } else if (value.type === Type.Number) {
                fraction = new Fraction(value.value, 1)
            } else {
                fraction = new Fraction(value.children[0].value, value.children[1].value)
            }

            if (key in coefficients) {
                coefficients[key] = Fraction.add(coefficients[key], fraction)
            } else {
                coefficients[key] = fraction
            }
        }

        node.children.forEach(child => {
            if (child.type === Type.Operator && child.value === '*') {
                const numbers = child.children.filter(factor => {
                    if (factor.type === Type.Number) return true
                    if (factor.type !== Type.Operator || factor.value !== '/') return false
                    return factor.children[0].type === Type.Number && factor.children[1].type === Type.Number
                })

                if (numbers.length === 0) {
                    push(child, 1)
                    node.removeChild(child)
                    return
                }

                if (numbers.length === 1) {
                    child.removeChild(numbers[0])
                    push(child, numbers[0])
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
            if (coefficients[factor].numerator === 1 && coefficients[factor].denominator === 1) {
                node.addChild(parse(factor))
            } else {
                node.addChild(parse(`${coefficients[factor].toString()} * (${factor})`))
            }
        })

        if (node.children.length === 1) {
            node.children[0].setParent(null)
            return node.children[0]
        }

        return node
    }
}

const multiplyByZero: Action = {
    name: 'multiply by zero',
    pattern: '0 * x',
    variables: { x: 'expression' },
    handle: () => 0
}

const multiplyByOne: Action = {
    name: 'multiply by one',
    pattern: '1 * x',
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
