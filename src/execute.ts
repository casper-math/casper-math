import config from './config'
import { Action, Type, VariableType } from './interfaces'
import log from './logger'
import Node from './node'
import string from './output/string'
import parse from './parse'

type Variables = { [key: string]: Node }

let variables: Variables
let matchedNodes: Node[]

const matchers: { [key: string]: (node: Node) => boolean } = {
    number: (node: Node) => node.type === Type.Number,
    single: (node: Node) => node.type === Type.Variable,
    expression: () => true
}

export default function execute(action: Action, node: Node, pattern?: Node): Node {
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

    const search = node.clone()
    const result = getResult(action, node)
    const replace = result.clone()

    if (!search.equals(result) && !('pattern' in action)) {
        log({
            name: action.name,
            search: string(search),
            replace: string(replace)
        })
    }

    return result
}

function getResult(action: Action, node: Node, pattern?: Node) {
    if (!('pattern' in action)) {
        const result = action.run(node)

        if (typeof result === 'string') return parse(result)
        if (typeof result === 'number') return new Node(Type.Number, result)
        return result
    }

    pattern ??= parse(action.pattern)

    variables = {}
    matchedNodes = []

    if (findVariables(action, node, pattern) === null) {
        return node
    }

    const converted: { [key: string]: string | number } = {}

    for (const key of Object.keys(variables)) {
        converted[key] = variables[key].type === Type.Number ? variables[key].value : string(variables[key])
    }

    const result = parse(action.handle(converted).toString())

    log({
        name: action.name,
        search: searchStep(action.pattern, converted),
        replace: string(result)
    })

    // In the case that only some operands of an associative operator are matched, the result should be added to the
    // operator. For example, the program matches `x + y` in `2 + 3 + 4`. Instead of returning `(5) + 4` as the result,
    // with this code it returns `5 + 4`.
    if (node.children.filter(child => !matchedNodes.includes(child)).length > 0) {
        matchedNodes.forEach(value => node.removeChild(value))
        node.addChild(parse(action.handle(converted).toString()))
        return node
    }

    return result
}

function findVariables(action: Action, node: Node, pattern: Node): null | void {
    if (!('variables' in action)) {
        return null
    }

    if (pattern.type === Type.Variable) {
        return findVariable(action.variables[pattern.value], node, pattern, null)
    }

    if (node.type !== pattern.type || node.value !== pattern.value) {
        return null
    }

    for (let index = 0; index < pattern.children.length; index++) {
        const child = pattern.children[index]

        if (child.type === Type.Variable) {
            if (findVariable(action.variables[child.value], node.children[index], child, node) === null) {
                return null
            }
        } else if (child.containsType(Type.Variable)) {
            if (findNestedVariables(action, index, node, pattern, child) === null) {
                return null
            }
        } else if (findConstant(child, node.children[index], node) === null) {
            return null
        }
    }

    const unmatchedNodes = node.children.filter(child => !matchedNodes.includes(child))

    if (pattern.parent !== null && unmatchedNodes.length > 0) {
        return null
    }
}

function findCommutative(node: Node, name: string | null, matcher: (node: Node) => boolean): null | void {
    if (!isCommutative(node)) return null

    for (const child of node.children) {
        if (matcher(child) && !matchedNodes.includes(child)) {
            if (name) variables[name] = child
            matchedNodes.push(child)
            return
        }
    }

    return null
}

function findVariable(type: VariableType, node: Node, pattern: Node, parent: Node | null): null | void {
    const matcher = matchers[type]

    if (matcher(node) && !matchedNodes.includes(node) && notDifferent(pattern.value, node)) {
        variables[pattern.value] = node
        matchedNodes.push(node)

        return
    }

    if (!parent) return null

    const condition = (child: Node) => matcher(child) && notDifferent(pattern.value, child)

    if (findCommutative(parent, pattern.value.toString(), condition) === null) {
        return null
    }
}

function findNestedVariables(action: Action, index: number, node: Node, pattern: Node, child: Node): null | void {
    if (findVariables(action, node.children[index], pattern.children[index]) !== null) {
        matchedNodes.push(node.children[index])
        return
    }

    if (!isCommutative(pattern)) {
        return null
    }

    for (const nodeChild of node.children) {
        const isEqual = nodeChild.type === child.type && nodeChild.value === child.value

        if (isEqual && findVariables(action, nodeChild, child) !== null) {
            matchedNodes.push(nodeChild)
            return
        }
    }

    return null
}

function findConstant(pattern: Node, node: Node, parent: Node): null | void {
    if (node.equals(pattern)) {
        matchedNodes.push(node)
        return
    }

    return findCommutative(parent, null, child => pattern.equals(child))
}

function notDifferent(key: string | number, value: Node): boolean {
    return !Object.keys(variables).includes(key.toString()) || variables[key].equals(value)
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
