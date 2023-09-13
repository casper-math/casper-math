import Action from './action'
import Node from './node'
import string from './output/string'
import parse from './parse'
import Type from './type'
import Variables from './variables'

export default function execute(action: Action, node: Node): Node {
    node.setChildren(node.children.map(child => execute(action, child)))
    node.children.forEach(child => child.setParent(node))

    let variables = findVariables(action, node)

    return variables ? parse(action.handle(variables).toString()) : node
}

function findVariables(action: Action, node: Node): Variables | null {
    let pattern = parse(action.pattern)

    if (node.type !== Type.Variable || !Object.keys(action.variables).includes(node.value.toString())) {
        if (node.type !== pattern.type || node.value !== pattern.value) {
            return null
        }
    }

    let variables: Variables = {}

    if (!findNumericVariables(action, node, variables)) return null
    if (!findExpressions(action, node, variables)) return null

    Object.keys(variables).forEach(
        key => (variables[key] = variables[key].constructor?.name === 'Node' ? string(variables[key]) : variables[key])
    )

    return variables
}

function findNumericVariables(action: Action, node: Node, variables: Variables): boolean {
    let numbers = node.children.filter(child => child.type === Type.Number)

    let numbericVariables = Object.entries(action.variables)
        .filter(variable => variable[1] === 'number')
        .map(variable => variable[0])

    for (let index = 0; index < numbericVariables.length; index++) {
        let number = numbers[index]
        if (!number) return false
        variables[numbericVariables[index]] = Number(number.value)
    }

    return true
}

function findExpressions(action: Action, node: Node, variables: Variables): boolean {
    let expressions = node.children.filter(expression => !Object.values(variables).includes(expression))

    let expressionVariables = Object.entries(action.variables)
        .filter(variable => variable[1] === 'expression')
        .map(variable => variable[0])

    for (let index = 0; index < expressionVariables.length; index++) {
        let expression = expressions[index]
        if (!expression) return false
        variables[expressionVariables[index]] = expression
    }

    return true
}
