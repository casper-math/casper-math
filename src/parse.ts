import config from './config'
import Node from './node'
import Operator from './operator'
import Token from './token'
import tokenize from './tokenize'
import Type from './type'

export default function parse(expression: string): Node {
    let tokens = tokenize(expression)
    let node = new Node(tokens[0].type, tokens[0].value)
    tokens.shift()

    tokens.forEach(token => {
        if (token.type === Type.BracketOpen) {
            node = node.addChild(new Node(token.type, token.value))
        } else if (token.type === Type.BracketClose) {
            let done = false
            while (!done) {
                if (node.type === Type.BracketOpen) {
                    done = true
                } else {
                    // @ts-ignore
                    node = node.parent
                }
            }
        } else if (token.type === Type.Number || token.type === Type.Variable || token.type === Type.Function) {
            node = node.addChild(new Node(token.type, token.value))
        } else if (node.parent === null) {
            let parent = new Node(token.type, token.value)
            parent.addChild(node)
            node = parent
        } else if (node.parent.type === Type.BracketOpen) {
            let parent = new Node(token.type, token.value)
            parent.insertBetween(node.parent, node)
            node = parent
        } else {
            let done = false
            while (!done) {
                if (node.parent === null) {
                    done = true
                    let parent = new Node(token.type, token.value)
                    parent.addChild(node)
                    node = parent
                } else if (operator(token).precedence < operator(node.parent).precedence) {
                    node = node.parent
                } else if (token.value === node.parent.value && operator(token).associative) {
                    done = true
                    node = node.parent
                } else if (token.value === node.parent.value && operator(token).evaluate === 'ltr') {
                    node = node.parent
                } else {
                    done = true
                    let parent = new Node(token.type, token.value)
                    parent.insertBetween(node.parent, node)
                    node = parent
                }
            }
        }
    })

    return removeBrackets(node.root())
}

function operator(symbol: Token | Node): Operator {
    return config()
        .operators()
        .filter(operator => operator.symbol === symbol.value)[0]
}

function removeBrackets(node: Node): Node {
    node.setChildren(node.children.map(child => removeBrackets(child)))

    if (node.type !== Type.BracketOpen) {
        return node
    }

    if (!node.parent) {
        let child = node.children[0]
        child.setParent(null)
        return child
    }

    node.children[0].setParent(node.parent)
    return node.children[0]
}