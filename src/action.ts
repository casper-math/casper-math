import Variables from './variables'

export default interface Action {
    pattern: string
    variables: { [key: string]: 'number' | 'expression' | 'variable' }
    handle: (variables: Variables) => string | number
}
