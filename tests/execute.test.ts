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

it('only matches the number of operands needed', () => {
    let tree = parse('3 + 2 + y')
    let result = execute(add, tree)
    expect(result).toEqual(parse('5 + y'))
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

const nonCommutative: Action = {
    pattern: 'x / y',
    variables: { x: 'expression', y: 'number' },
    handle: ({ x }) => x
}

it('can run a non-commutative action', () => {
    let tree = parse('(x + 3) / 8')
    let result = execute(nonCommutative, tree)
    expect(result).toEqual(parse('x + 3'))
})

it('does not run the non-commutative action when not possible', () => {
    let tree = parse('8 / (x + 3)')
    let result = execute(nonCommutative, tree)
    expect(result).toEqual(parse('8 / (x + 3)'))
})

const nested: Action = {
    pattern: 'x * (y + x)',
    variables: { x: 'expression', y: 'number' },
    handle: ({ x, y }) => `(${x} * ${y}) + (${x} * ${x})`
}

it('works with nested actions', () => {
    let tree = parse('7 * (3 + 7) + 5')
    let result = execute(nested, tree)
    expect(result).toEqual(parse('(7 * 3) + (7 * 7) + 5'))
})

it('applies commutativity when needed when nested', () => {
    let tree = parse('7 * (7 + 3)')
    let result = execute(nested, tree)
    expect(result).toEqual(parse('(7 * 3) + (7 * 7)'))
})

it('does not apply associativity when nested', () => {
    let tree = parse('7 * (3 + 7 + 5)')
    let result = execute(nested, tree)
    expect(result).toEqual(parse('7 * (3 + 7 + 5)'))
})

const root: Action = {
    pattern: 'x',
    variables: { x: 'expression' },
    handle: () => '3'
}

it('works from a root node', () => {
    let tree = parse('2 * x + 3')
    let result = execute(root, tree)
    expect(result).toEqual(parse('3'))
})

const typedRoot: Action = {
    pattern: 'y',
    variables: { y: 'number' },
    handle: () => 2
}

it('matches typed roots', () => {
    let tree = parse('7')
    let result = execute(typedRoot, tree)
    expect(result).toEqual(parse('2'))
})

it('does not match if the type is incorrect', () => {
    let tree = parse('x')
    let result = execute(typedRoot, tree)
    expect(result).toEqual(parse('x'))
})

it('can match parts of a root', () => {
    let tree = parse('x + 3')
    let result = execute(typedRoot, tree)
    expect(result).toEqual(parse('x + 2'))
})
