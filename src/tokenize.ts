import Token from './token'
import Type from './type'

export default function tokenize(expression: string): Token[] {
    expression = expression.replace(/ /g, '')
    let tokens: Token[] = []

    let newRun = true

    while (newRun) {
        newRun = false

        for (const [pattern, type] of Object.entries(patterns())) {
            let regex = new RegExp('^' + pattern)
            let match = expression.match(regex)

            if (match) {
                newRun = true
                tokens.push({ type: type, value: match[0] })
                expression = expression.replace(regex, '')
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
        '\\(': Type.BracketOpen,
        '[a-zA-Z_][a-zA-Z0-9_]*(?![a-zA-Z0-9_(])': Type.Variable,
        '[a-zA-Z_][a-zA-Z0-9_]*(?=\\()': Type.Function,
        '(\\+|\\*|\\^|\\/)': Type.Operator,
        '-?([0-9]+(\\.[0-9]+)?|\\.[0-9]+)': Type.Number,
        '\\)': Type.BracketClose
    }
}
