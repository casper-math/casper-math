import config from './../config'
import { Type } from './../interfaces'
import Node from './../node'

export default function string(node: Node): string {
    if (node.type === Type.Operator) {
        return node.children
            .map(child => (shouldInsertBrackets(node, child) ? `(${string(child)})` : string(child)))
            .join(` ${node.value.toString()} `)
            .replace('+ -1 *', '-')
            .replace('+ -', '- ')
    }

    return node.value.toString()
}

function shouldInsertBrackets(parent: Node, child: Node): boolean {
    if (child.type !== Type.Operator) {
        return false
    }

    let parentPrecedence = config().operators.filter(operator => operator.symbol === parent.value)[0].precedence

    let childPrecedence = config().operators.filter(operator => operator.symbol === child.value)[0].precedence

    return parentPrecedence >= childPrecedence
}
