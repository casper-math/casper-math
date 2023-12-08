import { Type } from './interfaces'
import Node from './node'
import string from './output/string'

export default function sort(tree: Node): Node {
    tree.setChildren(tree.children.map(child => sort(child)))

    if (tree.type === Type.Operator && tree.value === '*') {
        tree.children.sort(compareProduct)
    }

    if (tree.type === Type.Operator && tree.value === '+') {
        tree.children.sort(compareSum)
    }

    return tree
}

function compareProduct(a: Node, b: Node): number {
    if (a.type === Type.Number && b.type === Type.Number) return Number(a.value) - Number(b.value)
    if (a.type === Type.Number) return -1
    if (b.type === Type.Number) return 1

    const compareA = a.type === Type.Operator && a.value === '^' ? a.children[0].value : a.value
    const compareB = b.type === Type.Operator && b.value === '^' ? b.children[0].value : b.value

    if (compareA < compareB) return -1
    if (compareA > compareB) return 1

    return 0
}

enum Priority {
    Function = 0,
    Power = 1,
    MixedProduct = 2,
    Operator = 3,
    Variable = 4,
    Number = 5
}

type Weight = { priority: Priority; value: number | string }

function compareSum(a: Node, b: Node): number {
    const aWeight = weight(a)
    const bWeight = weight(b)

    if (aWeight.priority !== bWeight.priority) {
        return aWeight.priority - bWeight.priority
    }

    if (typeof aWeight.value === 'number' && typeof bWeight.value === 'number') {
        return aWeight.value > bWeight.value ? -1 : 1
    }

    if (aWeight.value !== bWeight.value) {
        return aWeight.value > bWeight.value ? 1 : -1
    }

    return 0
}

function weight(node: Node): Weight {
    if (node.type === Type.Number) {
        return { priority: Priority.Number, value: node.value }
    }

    if (node.type === Type.Variable || node.type === Type.Constant) {
        return { priority: Priority.Variable, value: node.value }
    }

    if (node.type === Type.Operator && node.value === '*') {
        const powers = node.children.filter(child => child.type === Type.Operator && child.value === '^')
        if (powers.length > 0) {
            return powers.map(weight).sort((a, b) => {
                if (a.priority !== b.priority) {
                    return a.priority - b.priority
                }

                if (a.value === b.value) return 0

                return a.value > b.value ? 1 : -1
            })[0]
        }

        const notNumbers = node.children.filter(
            child =>
                child.type !== Type.Number &&
                child.type !== Type.Operator &&
                child.value !== '/' &&
                child.children[0]?.type !== Type.Number &&
                child.children[1]?.type !== Type.Number
        )

        if (notNumbers.length >= 2) {
            return {
                priority: Priority.MixedProduct,
                value: notNumbers
                    .sort((a, b) => {
                        if (a === b) return 0
                        return a > b ? 1 : -1
                    })
                    .map(string)
                    .join('')
            }
        }

        if (notNumbers.length === 1) {
            return {
                priority: Priority.Variable,
                value: notNumbers[0].value
            }
        }
    }

    if (node.type === Type.Operator && node.value === '^') {
        if (node.children[0].type === Type.Number && node.children[1].type === Type.Number) {
            return {
                priority: Priority.Number,
                value: Math.pow(Number(node.children[0].value), Number(node.children[1].value))
            }
        }

        return { priority: Priority.Power, value: weight(node.children[1]).value }
    }

    if (node.type === Type.Operator) {
        return { priority: Priority.Operator, value: node.value }
    }

    if (node.type === Type.Function) {
        return { priority: Priority.Function, value: node.value }
    }

    return { priority: Priority.Number, value: 3 }
}
