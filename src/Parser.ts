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
                throw new Error('Not yet implemented.')
            } else if (token.type === Type.Number || token.type === Type.Variable || token.type === Type.Function) {
                node = node.addChild(new Node(token.type, token.value))
            } else if (this.precedence(token) > this.precedence(node)) {
                throw new Error('Not yet implemented.')
            } else if (node.parent === null) {
                let parent = new Node(token.type, token.value)
                parent.addChild(node)
                node = parent
            } else if (node.parent.type === Type.BracketOpen) {
                throw new Error('Not yet implemented.')
            } else {
                throw new Error('Not yet implemented.')
            }
        })

        return node.root()
    }

    private precedence(symbol: Token | Node) {
        if (symbol.type === Type.Operator) {
            return this.operators().filter(operator => operator.symbol === symbol.value)[0].precedence
        }

        if (symbol.type === Type.BracketOpen || symbol.type === Type.BracketClose) {
            return 0
        }

        return Math.max(...this.operators().map(operator => operator.precedence)) + 1
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
