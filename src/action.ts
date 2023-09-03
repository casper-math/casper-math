export default interface Action {
    pattern: string
    variables: { [key: string]: 'number' | 'expression' | 'letter' }
    handle: (variables: { [key: string]: string | number }) => string | number
}
