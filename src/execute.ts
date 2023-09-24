import config from './config'
import { Action, Type } from './interfaces'
import log from './logger'
import Node from './node'
import string from './output/string'
import parse from './parse'

export default function execute(action: Action, node: Node, pattern?: Node): Node {
    pattern ??= parse(action.pattern)

    let children = node.children
    node.setChildren([])

    children.forEach(child => {
        let result = execute(action, child, pattern)

        // If an action returns for example addition and the parent is also addition, then they should be merged instead
        // of placed underneath eachother.
        if (
            node.type === Type.Operator &&
            result.type === Type.Operator &&
            result.value === node.value &&
            config().operators.filter(operator => operator.symbol === node.value)[0].associative
        ) {
            result.children.forEach(subchild => node.addChild(subchild))
        } else {
            node.addChild(result)
        }
    })

    let matchedNodes: Node[] = []

    let variables: { [key: string]: Node } | null = findVariables(action, node, pattern, matchedNodes)

    if (variables === null) return node

    let converted: { [key: string]: string | number } = {}

    for (let i = 0; i < Object.keys(variables).length; i++) {
        let key = Object.keys(variables)[i]
        converted[key] = variables[key].type === Type.Number ? variables[key].value : string(variables[key])
    }

    // In the case that only some operands of an associative operator are matched, the result should be added to the
    // operator.For example, the program matches`x + y` in `2 + 3 + 4`.Instead of returning`5`(2 + 3) as the result,
    // with this code it returns`5 + 4`.
    if (
        node.type === Type.Operator &&
        config().operators.filter(operator => operator.symbol === node.value)[0].associative &&
        node.children.filter(child => !matchedNodes.includes(child)).length > 0
    ) {
        matchedNodes.forEach(value => node.removeChild(value))
        node.addChild(parse(action.handle(converted).toString()))
        return node
    }

    let result = parse(action.handle(converted).toString())

    log({
        name: action.name,
        search: searchStep(action.pattern, converted),
        replace: string(result),
        result: (function () {
            node.parent?.replaceChild(node, result)
            return string(result.root()) ?? result
        })()
    })

    return result
}

function findVariables(
    action: Action,
    node: Node,
    pattern: Node,
    matchedNodes: Node[]
): { [key: string]: Node } | null {
    const matchers: { [key: string]: (node: Node) => boolean } = {
        number: (node: Node) => node.type === Type.Number,
        single: (node: Node) => node.type === Type.Variable,
        expression: () => true
    }

    // Check if the root of the pattern is a variable itself
    if (pattern.type === Type.Variable) {
        let type = action.variables[pattern.value]
        let matcher = matchers[type]
        matchedNodes.push(node)

        return matcher(node) ? { [pattern.value]: node } : null
    }

    if (node.type !== pattern.type || node.value !== pattern.value) {
        return null
    }

    let variables: { [key: string]: Node } = {}

    for (let index = 0; index < pattern.children.length; index++) {
        let child = pattern.children[index]

        if (child.type === Type.Variable) {
            let type = action.variables[child.value]
            let matcher = matchers[type]

            if (!matcher(node.children[index]) || matchedNodes.includes(node.children[index])) {
                if (
                    pattern.type !== Type.Operator ||
                    !config().operators.filter(operator => operator.symbol === pattern.value)[0].commutative
                ) {
                    return null
                }

                let found: Node | undefined = undefined

                node.children.forEach(nodeChild => {
                    if (
                        !found &&
                        matcher(nodeChild) &&
                        !matchedNodes.includes(nodeChild) &&
                        (!Object.keys(variables).includes(child.value.toString()) ||
                            variables[child.value].equals(nodeChild))
                    ) {
                        found = nodeChild
                        variables[child.value] = nodeChild
                        matchedNodes.push(nodeChild)
                    }
                })

                if (!found) return null
            } else {
                if (!Object.keys(variables).includes(child.value.toString())) {
                    variables[child.value] = node.children[index]
                }
                if (!variables[child.value].equals(node.children[index])) return null
                matchedNodes.push(node.children[index])
            }
        } else if (child.containsType(Type.Variable)) {
            matchedNodes.push(node.children[index])
            let output = findVariables(action, node.children[index], pattern.children[index], matchedNodes)
            if (!output) return null

            for (let i = 0; i < Object.keys(output).length; i++) {
                let key = Object.keys(output)[i]

                if (Object.keys(variables).includes(key) && !variables[key].equals(output[key])) return null
            }

            variables = { ...variables, ...output }
            Object.values(output).forEach(value => matchedNodes.push(value))
        } else {
            if (node.children[index].equals(pattern.children[index])) {
                matchedNodes.push(node.children[index])
            } else {
                return null
            }
        }
    }

    // If an operator still has children that are not matched (and the operator is not a root in the pattern), then the
    // action shouldn't be performed.
    if (pattern.parent !== null) {
        for (let i = 0; i < node.children.length; i++) {
            if (!matchedNodes.includes(node.children[i])) return null
        }
    }

    return variables
}

function searchStep(pattern: string, variables: { [key: string]: string | number }): string {
    Object.keys(variables).forEach(variable => {
        pattern = pattern.replace(variable, `(${variables[variable]})`)
    })

    return string(parse(pattern))
}
