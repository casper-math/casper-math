import { Action, Type } from './interfaces'
import Node from './node'
import string from './output/string'
import parse from './parse'

export default function execute(action: Action, node: Node): Node {
    node.setChildren(node.children.map(child => execute(action, child)))
    node.children.forEach(child => child.setParent(node))

    let variables: { [key: string]: Node } | null = findVariables(action, node)

    if (variables === null) return node

    let converted: { [key: string]: string | number } = {}

    for (let i = 0; i < Object.keys(variables).length; i++) {
        let key = Object.keys(variables)[i]
        if (variables[key].type === Type.Number) {
            converted[key] = variables[key].value
        } else {
            converted[key] = string(variables[key])
        }
    }

    return parse(action.handle(converted).toString())
}

function findVariables(action: Action, node: Node, pattern?: Node) {
    pattern ??= parse(action.pattern)

    if (node.type !== pattern.type || node.value !== pattern.value) {
        return null
    }

    const matchers: { [key: string]: (node: Node) => boolean } = {
        number: (node: Node) => node.type === Type.Number,
        single: (node: Node) => node.type === Type.Variable,
        expression: () => true
    }

    let variables: { [key: string]: Node } = {}

    for (let index = 0; index < pattern.children.length; index++) {
        let child = pattern.children[index]

        if (child.type === Type.Variable) {
            let type = action.variables[child.value]
            let matcher = matchers[type]

            if (!matcher(node.children[index])) {
                return null
            } else {
                variables[child.value] = node.children[index]
            }
        } else if (child.containsType(Type.Variable)) {
            let output = findVariables(action, node.children[index], pattern.children[index])
            if (!output) return null

            for (let i = 0; i < Object.keys(output).length; i++) {
                let key = Object.keys(output)[i]

                if (Object.keys(variables).includes(key) && !variables[key].equals(output[key])) return null
            }

            variables = { ...variables, ...output }
        } else {
            if (!node.children[index].equals(pattern.children[index])) return null
        }
    }

    return variables
}
