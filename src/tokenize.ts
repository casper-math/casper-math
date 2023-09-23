import config from './config'
import { Token, Type } from './interfaces'

export default function tokenize(expression: string): Token[] {
    expression = expression
        .replace(/ /g, '')
        .replace(/(?<=[a-zA-Z0-9])-/g, '+-')
        .replace(/-(?![0-9.])/g, '-1*')

    let tokens: Token[] = []

    const matchers: { type: Type; matcher: RegExp | RegExp[] }[] = [
        { type: Type.BracketClose, matcher: /^\)/ },
        { type: Type.BracketOpen, matcher: /^\(/ },
        { type: Type.Comma, matcher: /^,/ },
        { type: Type.Constant, matcher: config().constants.map(c => RegExp('^' + c + '(?![a-zA-Z0-9_])')) },
        { type: Type.Function, matcher: /^[a-zA-Z][a-zA-Z0-9_]*(?=\()/ },
        { type: Type.Number, matcher: /^-?([0-9]+(\.[0-9]+)?|\.[0-9]+)/ },
        { type: Type.Operator, matcher: config().operators.map(operator => RegExp('^\\' + operator.symbol)) },
        { type: Type.Variable, matcher: /^[a-zA-Z][a-zA-Z0-9_]*(?![a-zA-Z0-9\(])/ }
    ]

    let newRun = true

    while (expression !== '' && newRun) {
        newRun = false

        matchers.forEach(({ type, matcher }) => {
            if (newRun) return

            let symbol = Array.isArray(matcher)
                ? matcher.map(regex => expression.match(regex)).filter(x => x)[0]?.[0]
                : expression.match(matcher)?.[0]

            if (!symbol) {
                return
            }

            newRun = true
            expression = expression.slice(symbol.length)
            tokens.push({ type: type, value: symbol })
        })
    }

    if (expression.length > 0) {
        let error = tokens.map(token => token.value).join('') + expression
        throw new Error(`Syntax error: cannot parse "${error}".`)
    }

    return tokens
}
