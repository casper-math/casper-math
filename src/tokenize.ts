import config from './config'
import Token from './token'
import Type from './type'

export default function tokenize(expression: string): Token[] {
    expression = expression.replace(/ /g, '')
    let tokens: Token[] = []

    let newRun = true

    while (newRun) {
        newRun = false

        for (const constant of config().constants) {
            let regex = new RegExp('^' + constant)
            let match = expression.match(regex)

            if (match) {
                newRun = true
                tokens.push({ type: Type.Constant, value: match[0] })
                expression = expression.replace(regex, '')
                break
            }
        }

        for (const [pattern, type] of Object.entries(patterns())) {
            let regex = new RegExp('^' + pattern)
            let match = expression.match(regex)

            if (match) {
                newRun = true
                tokens.push({ type: type, value: match[0] })
                expression = expression.replace(regex, '')
                break
            }
        }
    }

    if (expression !== '') {
        let error = tokens.map(token => token.value).join('') + expression
        throw new Error(`Syntax error: cannot parse "${error}".`)
    }

    return tokens
}

function patterns() {
    return {
        '\\)': Type.BracketClose,
        '\\(': Type.BracketOpen,
        ',': Type.Comma,
        '[a-zA-Z_][a-zA-Z0-9_]*(?=\\()': Type.Function,
        '-?([0-9]+(\\.[0-9]+)?|\\.[0-9]+)': Type.Number,
        '(\\+|\\*|\\^|\\/)': Type.Operator,
        '[a-zA-Z_][a-zA-Z0-9_]*(?![a-zA-Z0-9_(])': Type.Variable
    }
}
