import execute from './../src/execute'
import { Action } from './../src/interfaces'
import parse from './../src/parse'

const add: Action = {
    pattern: 'x + y',
    variables: { x: 'number', y: 'number' },
    handle: ({ x, y }) => Number(x) + Number(y)
}

it('can run the add action', () => {
    let tree = parse('2 + 5')
    let result = execute(add, tree)
    expect(result).toEqual(parse('7'))
})

it('can run the add action when nested', () => {
    let tree = parse('3 * (2 + 4)')
    let result = execute(add, tree)
    expect(result).toEqual(parse('3 * 6'))
})

it('does not match any expression', () => {
    let tree = parse('x + 2 * y')
    let result = execute(add, tree)
    expect(result).toEqual(parse('x + 2*y'))
})

const double: Action = {
    pattern: 'x + x',
    variables: { x: 'expression' },
    handle: ({ x }) => `2 * (${x})`
}

it('can run the double action', () => {
    let tree = parse('4 + 4')
    let result = execute(double, tree)
    expect(result).toEqual(parse('2 * 4'))
})

it('does not match different variables', () => {
    let tree = parse('4 + 3')
    let result = execute(double, tree)
    expect(result).toEqual(parse('4 + 3'))
})

it('can match any expression', () => {
    let tree = parse('y^3 + y^3')
    let result = execute(double, tree)
    expect(result).toEqual(parse('2 * y^3'))
})

it('does not add nested associative operators', () => {
    let tree = parse('4 * x + 4 * x')
    let result = execute(double, tree)
    expect(result).toEqual(parse('2 * 4 * x'))
})

const stupid: Action = {
    pattern: 'x * y',
    variables: { x: 'expression', y: 'number' },
    handle: ({ y }) => y
}

it('handles commutative operators', () => {
    let tree = parse('6 * (2 + x)')
    let result = execute(stupid, tree)
    expect(result).toEqual(parse('6'))
})

it('handles associative operators', () => {
    let tree = parse('x * y * 7')
    let result = execute(stupid, tree)
    expect(result).toEqual(parse('7'))
})
