import { Type } from './interfaces'
import Node from './node'

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

function compareSum(a: Node, b: Node): number {
    if (a.type === Type.Number && b.type === Type.Number) return Number(a.value) - Number(b.value)
    if (a.type === Type.Number) return 1
    if (b.type === Type.Number) return -1

    const compareA = a.type === Type.Operator && (a.value === '^' || a.value === '*') ? a.children[0].value : a.value
    const compareB = b.type === Type.Operator && (b.value === '^' || b.value === '*') ? b.children[0].value : b.value

    if (compareA < compareB) return -1
    if (compareA > compareB) return 1

    return 0
}
