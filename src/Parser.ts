import Node from './Node'
import Operator from './Operator'
import Token from './Token'
import Type from './Type'

export default class Parser {
    parse(tokens: Token[]) {
        let node = new Node(tokens[0].type, tokens[0].value)
        tokens.shift()

        tokens.forEach(token => {
            if (token.type === Type.BracketOpen) {
                throw new Error('Not yet implemented.')
            } else if (token.type === Type.BracketClose) {
                let done = false
                while (!done) {
                    if (node.type === Type.BracketOpen) {
                        done = true
                    } else {
                        if (!node.parent) throw Error('Error.')
                        node = node.parent
                    }
                }
            } else if (token.type === Type.Number || token.type === Type.Variable || token.type === Type.Function) {
                if (node.type === Type.Number || node.type === Type.Variable || token.type === Type.Function) {
                    if (!node.parent) throw new Error('Error.')
                    node = node.parent.addChild(new Node(token.type, token.value))
                } else {
                    node = node.addChild(new Node(token.type, token.value))
                }
            } else if (this.precedence(token) > this.precedence(node)) {
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
                    } else if (this.precedence(token) < this.precedence(node.parent)) {
                        node = node.parent
                    } else if (token.value === node.parent.value && this.operator(token).associative) {
                        done = true
                        node = node.parent
                    } else if (token.value === node.parent.value && this.operator(token).evaluate === 'ltr') {
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

        return this.removeBrackets(node.root())
    }

    private precedence(symbol: Token | Node) {
        if (symbol.type === Type.Operator) {
            return this.operator(symbol).precedence
        }

        if (symbol.type === Type.BracketOpen || symbol.type === Type.BracketClose) {
            return Math.max(...this.operators().map(operator => operator.precedence)) + 2
        }

        return Math.max(...this.operators().map(operator => operator.precedence)) + 1
    }

    private operator(symbol: Token | Node) {
        return this.operators().filter(operator => operator.symbol === symbol.value)[0]
    }

    private removeBrackets(node: Node): Node {
        node.setChildren(node.children.map(child => this.removeBrackets(child)))

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

    private operators(): Operator[] {
        return [
            {
                symbol: '+',
                associative: true,
                commutative: true,
                evaluate: 'ltr',
                precedence: 1
            },
            {
                symbol: '-',
                associative: false,
                commutative: false,
                evaluate: 'ltr',
                precedence: 1
            },
            {
                symbol: '*',
                associative: true,
                commutative: true,
                evaluate: 'ltr',
                precedence: 2
            },
            {
                symbol: '/',
                associative: false,
                commutative: false,
                evaluate: 'ltr',
                precedence: 2
            },
            {
                symbol: '^',
                associative: false,
                commutative: false,
                evaluate: 'rtl',
                precedence: 3
            }
        ]
    }
}
