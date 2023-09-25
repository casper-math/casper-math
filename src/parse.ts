import config from './config'
import { Operator, Token, Type } from './interfaces'
import Node from './node'
import tokenize from './tokenize'

export default function parse(expression: string): Node {
    const tokens = tokenize(expression)
    let node = new Node(tokens[0].type, tokens[0].value)
    tokens.shift()

    tokens.forEach(token => {
        if (token.type === Type.BracketOpen) {
            node = node.addChild(new Node(token.type, token.value))
        } else if (token.type === Type.BracketClose) {
            let done = false

            while (!done) {
                // @ts-ignore
                node = node.parent
                if (node.type === Type.BracketOpen) done = true
            }

            if (node.parent?.type === Type.Function) {
                node = node.parent
            }
        } else if (
            token.type === Type.Number ||
            token.type === Type.Constant ||
            token.type === Type.Variable ||
            token.type === Type.Function
        ) {
            node = node.addChild(new Node(token.type, token.value))
        } else if (token.type === Type.Comma) {
            let done = false
            while (!done) {
                // @ts-ignore
                node = node.parent

                // @ts-ignore
                if (node.parent.type === Type.Function) {
                    done = true
                }
            }
        } else if (node.parent === null) {
            const parent = new Node(token.type, token.value)
            parent.addChild(node)
            node = parent
        } else if (node.parent.type === Type.BracketOpen) {
            const parent = new Node(token.type, token.value)
            parent.insertBetween(node.parent, node)
            node = parent
        } else {
            let done = false
            while (!done) {
                if (node.parent === null) {
                    done = true
                    const parent = new Node(token.type, token.value)
                    parent.addChild(node)
                    node = parent
                } else if (operator(token).precedence < operator(node.parent)?.precedence) {
                    node = node.parent
                } else if (token.value === node.parent.value && operator(token).associative) {
                    done = true
                    node = node.parent
                } else if (
                    operator(token).precedence === operator(node.parent)?.precedence &&
                    operator(token).evaluate === 'ltr'
                ) {
                    node = node.parent
                } else {
                    done = true
                    const parent = new Node(token.type, token.value)
                    parent.insertBetween(node.parent, node)
                    node = parent
                }
            }
        }
    })

    // @ts-ignore
    return removeNestedAssociativeOperators(removeBrackets(node.root()))
}

function operator(symbol: Token | Node): Operator {
    return config().operators.filter(operator => operator.symbol === symbol.value)[0]
}

function removeBrackets(node: Node): Node | Node[] {
    node.setChildren(node.children.map(child => removeBrackets(child)).flat())

    if (node.type !== Type.BracketOpen) {
        return node
    }

    if (!node.parent) {
        const child = node.children[0]
        child.setParent(null)
        return child
    }

    if (node.parent.type === Type.Function) {
        node.children.forEach(child => child.setParent(node.parent))
        return node.children
    }

    node.children[0].setParent(node.parent)
    return node.children[0]
}

function removeNestedAssociativeOperators(node: Node): Node | Node[] {
    node.setChildren(node.children.map(child => removeNestedAssociativeOperators(child)).flat())
    node.children.map(child => child.setParent(node))

    if (
        node.type === Type.Operator &&
        node.parent?.type === Type.Operator &&
        node.value === node.parent.value &&
        config().operators.filter(operator => operator.symbol === node.value)[0].associative
    ) {
        return node.children
    }

    return node
}
