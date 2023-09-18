export interface Action {
    pattern: string
    variables: { [key: string]: 'number' | 'single' | 'expression' }
    handle: (variables: { [key: string]: string | number }) => string | number
}

export interface Operator {
    symbol: string
    associative: boolean
    commutative: boolean
    evaluate: 'ltr' | 'rtl'
    precedence: number
}

export interface Options {
    output?: 'string' | 'latex'
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
