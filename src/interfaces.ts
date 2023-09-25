export interface Action {
    name: string
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

export interface RequiredOptions {
    operators: Operator[]
    constants: string[]
    actions: Action[]
    output: 'string' | 'latex'
}

export interface Options {
    operators?: Operator[]
    constants?: string[]
    actions?: Action[]
    output?: 'string' | 'latex'
}

export interface Result {
    result: string
    steps: Step[]
}

export interface TemporaryStep {
    name: string
    search: string
    replace: string
}

export interface Step {
    name: string
    search: string
    replace: string
    result: string
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
