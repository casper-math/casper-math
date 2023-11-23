import Fraction from '../fraction'
import { Action, Type } from '../interfaces'
import Node from '../node'
import string from '../output/string'
import parse from '../parse'

const addLikeTerms: Action = {
    name: 'add like terms',
    run(node) {
        if (node.type !== Type.Operator || node.value !== '+') return node

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

const multiplyLikeFactors: Action = {
    name: 'multiply like factors',
    run(node) {
        if (node.type !== Type.Operator || node.value !== '*') return node

        const powers: { [key: string]: Node[] } = {}

        function push(key: Node, value: Node) {
            if (Object.keys(powers).includes(string(key))) {
                powers[string(key)].push(value)
            } else {
                powers[string(key)] = [value]
            }
        }

        node.children.forEach(child => {
            if (child.type === Type.Number) return

            if (child.type === Type.Operator && child.value === '^') {
                push(child.children[0], child.children[1])
            } else {
                push(child, new Node(Type.Number, 1))
            }

            node.removeChild(child)
        })

        Object.keys(powers).forEach(base => {
            if (powers[base].length === 1 && powers[base][0].type === Type.Number && powers[base][0].value === 1) {
                node.addChild(parse(base))
            } else if (powers[base].length === 1) {
                const power = node.addChild(new Node(Type.Operator, '^'))
                power.addChild(parse(base))
                power.addChild(powers[base][0])
            } else {
                const power = node.addChild(new Node(Type.Operator, '^'))
                power.addChild(parse(base))
                const sum = power.addChild(new Node(Type.Operator, '+'))
                powers[base].forEach(exponent => sum.addChild(exponent))
            }
        })

        if (node.children.length === 1) {
            return node.children[0]
        }

        return node
    }
}

const expandBrackets: Action = {
    name: 'expand brackets',
    run(node) {
        if (node.type !== Type.Operator || node.value !== '*') return node

        const factors: Node[] = []
        const sums: Node[] = []

        node.children.forEach(child => {
            if (child.type === Type.Operator && child.value === '+') {
                sums.push(child)
            } else {
                factors.push(child)
            }
        })

        if (sums.length === 0) return node

        const sum = new Node(Type.Operator, '+')

        const counters = Array(sums.length).fill(0)

        let allDone = false
        while (!allDone) {
            let index = counters.length - 1

            const product = sum.addChild(new Node(Type.Operator, '*'))
            counters.forEach((index, value) => {
                product.addChild(sums[value].children[index].clone())
            })
            factors.forEach(factor => {
                product.addChild(factor.clone())
            })

            let done = false
            while (!done) {
                if (sums[index].children.length - 1 === counters[index]) {
                    index--
                    if (index < 0) {
                        allDone = true
                        done = true
                    }
                } else {
                    done = true
                }
            }

            counters[index]++

            for (let i = index + 1; i < counters.length; i++) {
                counters[i] = 0
            }
        }

        return sum
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

const addZero: Action = {
    name: 'add zero',
    pattern: '0 + x',
    variables: { x: 'expression' },
    handle: ({ x }) => x
}

export default [addLikeTerms, expandBrackets, multiplyLikeFactors, multiplyByZero, multiplyByOne, addZero]
