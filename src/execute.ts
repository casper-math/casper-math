import Action from './action'
import Node from './node'
import parse from './parse'
import Type from './type'

export default function execute(action: Action, node: Node): Node {
    node.setChildren(node.children.map(child => execute(action, child)))
    node.children.forEach(child => child.setParent(node))

    let pattern = parse(action.pattern)

    if (!isMatch(action, node, pattern)) {
        return node
    }

    let variables = findVariables(action, node, pattern)
    return parse(action.handle(variables).toString())
}

function isMatch(action: Action, node: Node, pattern: Node): boolean {
    action
    return node.value === '+' && pattern.value === '+'
}

function findVariables(action: Action, node: Node, pattern: Node): { [key: string]: string | number } {
    if (pattern.type === Type.Variable) {
        return { [pattern.value]: node.value }
    }

    let variables = {}

    pattern.children
        .map((child, index) => findVariables(action, node.children[index], child))
        .forEach(variable => Object.assign(variables, variable))

    return variables
}
