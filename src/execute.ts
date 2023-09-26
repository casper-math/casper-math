import config from './config'
import { Action, Type } from './interfaces'
import log from './logger'
import Node from './node'
import string from './output/string'
import parse from './parse'

type Variables = { [key: string]: Node }

export default function execute(action: Action, node: Node, pattern?: Node): Node {
    pattern ??= parse(action.pattern)

    const children = node.children
    node.setChildren([])

    children.forEach(child => {
        const result = execute(action, child, pattern)

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

    const matchedNodes: Node[] = []

    const variables: Variables | null = findVariables(action, node, pattern, matchedNodes)

    if (variables === null) return node

    const converted: { [key: string]: string | number } = {}

    for (let i = 0; i < Object.keys(variables).length; i++) {
        const key = Object.keys(variables)[i]
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

    const result = parse(action.handle(converted).toString())

    log({
        name: action.name,
        search: searchStep(action.pattern, converted),
        replace: string(result)
    })

    return result
}

function findVariables(
    action: Action,
    node: Node,
    pattern: Node,
    matchedNodes: Node[],
    variables: Variables = {}
): Variables | null {
    const matchers: { [key: string]: (node: Node) => boolean } = {
        number: (node: Node) => node.type === Type.Number,
        single: (node: Node) => node.type === Type.Variable,
        expression: () => true
    }

    if (pattern.type === Type.Variable) {
        const type = action.variables[pattern.value]
        const matcher = matchers[type]
        matchedNodes.push(node)

        return matcher(node) ? { [pattern.value]: node } : null
    }

    if (node.type !== pattern.type || node.value !== pattern.value) {
        return null
    }

    for (let index = 0; index < pattern.children.length; index++) {
        const child = pattern.children[index]

        if (child.type === Type.Variable) {
            const type = action.variables[child.value]
            const matcher = matchers[type]

            if (
                !matcher(node.children[index]) ||
                matchedNodes.includes(node.children[index]) ||
                (Object.keys(variables).includes(child.value.toString()) &&
                    !variables[child.value].equals(node.children[index]))
            ) {
                const condition: (child: Node) => boolean = nodeChild =>
                    matcher(nodeChild) &&
                    (!Object.keys(variables).includes(child.value.toString()) ||
                        variables[child.value].equals(nodeChild))

                if (
                    !isCommutative(pattern) ||
                    findCommutative(node, matchedNodes, variables, child, condition) === null
                ) {
                    return null
                }
            } else {
                if (!Object.keys(variables).includes(child.value.toString())) {
                    variables[child.value] = node.children[index]
                }
                matchedNodes.push(node.children[index])
            }
        } else if (child.containsType(Type.Variable)) {
            const output = findVariables(action, node.children[index], pattern.children[index], matchedNodes, variables)

            if (!output) {
                if (!isCommutative(pattern)) {
                    return null
                }

                let found: Node | undefined = undefined

                node.children.forEach(nodeChild => {
                    if (
                        !found &&
                        nodeChild.type === child.type &&
                        nodeChild.value === child.value &&
                        !matchedNodes.includes(nodeChild)
                    ) {
                        const result = findVariables(action, nodeChild, child, matchedNodes, variables)
                        if (result) {
                            found = nodeChild
                            variables = { ...result, ...variables }
                            matchedNodes.push(nodeChild)
                        }
                    }
                })

                if (!found) {
                    return null
                }
            } else {
                matchedNodes.push(node.children[index])
                Object.values(output).forEach(value => matchedNodes.push(value))

                variables = { ...variables, ...output }
            }
        } else {
            if (node.children[index].equals(pattern.children[index])) {
                matchedNodes.push(node.children[index])
            } else if (
                isCommutative(pattern) &&
                findCommutative(node, matchedNodes, variables, child, nodeChild => child.equals(nodeChild)) !== null
            ) {
            } else {
                return null
            }
        }
    }

    const unmatchedNodes = node.children.filter(child => !matchedNodes.includes(child))

    return pattern.parent === null || unmatchedNodes.length === 0 ? variables : null
}

function findCommutative(
    node: Node,
    matchedNodes: Node[],
    variables: Variables,
    child: Node,
    matcher: (node: Node) => boolean
): null | void {
    for (let i = 0; i < node.children.length; i++) {
        const nodeChild = node.children[i]

        if (matcher(nodeChild) && !matchedNodes.includes(nodeChild)) {
            variables[child.value] = nodeChild
            matchedNodes.push(nodeChild)
            return
        }
    }

    return null
}

function isCommutative(node: Node): boolean {
    if (node.type !== Type.Operator) {
        return false
    }

    return config().operators.filter(operator => operator.symbol === node.value)[0].commutative
}

function searchStep(pattern: string, variables: { [key: string]: string | number }): string {
    Object.keys(variables).forEach(variable => {
        pattern = pattern.replace(variable, `(${variables[variable]})`)
    })

    return string(parse(pattern))
}
