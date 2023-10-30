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

    const compareA = comparor(a)
    const compareB = comparor(b)

    if (compareA < compareB) return -1
    if (compareA > compareB) return 1

    return 0
}

function comparor(node: Node): string {
    if (node.type === Type.Operator && node.value === '^') {
        return node.children[0].value.toString()
    }

    if (node.type === Type.Operator && node.value === '*') {
        return (
            node.children
                .filter(child => {
                    if (child.type === Type.Number) return false
                    return !(
                        child.type === Type.Operator &&
                        child.value === '/' &&
                        child.children[0].type === Type.Number &&
                        child.children[1].type === Type.Number
                    )
                })[0]
                ?.value.toString() ?? node.children[0].value.toString()
        )
    }

    return node.value.toString()
}
