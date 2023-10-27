import Node from './node'

export type Action =
    | {
          name: string
          pattern: string
          variables: { [key: string]: VariableType }
          handle: (variables: { [key: string]: string | number }) => string | number
          log: (variables: { [key: string]: string | number }) => string
      }
    | {
          name: string
          run: (node: Node) => Node | string | number
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
    description: string
}

export interface Step {
    name: string
    search: string
    replace: string
    description: string
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

export type VariableType = 'number' | 'single' | 'expression'
