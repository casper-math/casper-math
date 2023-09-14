export interface Action {
    pattern: string
    variables: { [key: string]: 'number' | 'expression' | 'variable' }
    handle: (variables: Variables) => string | number
}

export interface Operator {
    symbol: string
    associative: boolean
    commutative: boolean
    evaluate: 'ltr' | 'rtl'
    precedence: number
}

export interface Token {
    type: Type
    value: string
}

export enum Type {
    BracketClose,
    BracketOpen,
    Comma,
    Constant,
    Function,
    Number,
    Operator,
    Variable
}

export interface Variables {
    [key: string]: any
}
