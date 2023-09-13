export default interface Action {
    pattern: string
    variables: { [key: string]: 'number' | 'expression' | 'variable' }
    handle: (variables: { [key: string]: string | number }) => string | number
}
