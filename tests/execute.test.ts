import execute from './../src/execute'
import { Action } from './../src/interfaces'
import parse from './../src/parse'

const add: Action = {
    name: 'add',
    pattern: 'x + y',
    variables: { x: 'number', y: 'number' },
    handle: ({ x, y }) => Number(x) + Number(y)
}

it('can run the add action', () => {
    let tree = parse('2 + 5')
    let result = execute(add, tree)
    expect(result.equals(parse('7'))).toBeTruthy()
})

it('can run the add action when nested', () => {
    let tree = parse('3 * (2 + 4)')
    let result = execute(add, tree)
    expect(result.equals(parse('3 * 6'))).toBeTruthy()
})

it('does not match any expression', () => {
    let tree = parse('x + 2 * y')
    let result = execute(add, tree)
    expect(result.equals(parse('x + 2*y'))).toBeTruthy()
})

it('only matches the number of operands needed', () => {
    let tree = parse('3 + 2 + y')
    let result = execute(add, tree)
    expect(result.equals(parse('y + 5'))).toBeTruthy()
})

const double: Action = {
    name: 'double',
    pattern: 'x + x',
    variables: { x: 'expression' },
    handle: ({ x }) => `2 * (${x})`
}

it('can run the double action', () => {
    let tree = parse('4 + 4')
    let result = execute(double, tree)
    expect(result.equals(parse('2 * 4'))).toBeTruthy()
})

it('does not match different variables', () => {
    let tree = parse('4 + 3')
    let result = execute(double, tree)
    expect(result.equals(parse('4 + 3'))).toBeTruthy()
})

it('can match any expression', () => {
    let tree = parse('y^3 + y^3')
    let result = execute(double, tree)
    expect(result.equals(parse('2 * y^3'))).toBeTruthy()
})

it('does not add nested associative operators', () => {
    let tree = parse('4 * x + 4 * x')
    let result = execute(double, tree)
    expect(result.equals(parse('2 * 4 * x'))).toBeTruthy()
})

const stupid: Action = {
    name: 'stupid',
    pattern: 'x * y',
    variables: { x: 'single', y: 'number' },
    handle: ({ y }) => y
}

it('handles commutative operators', () => {
    let tree = parse('6 * a')
    let result = execute(stupid, tree)
    expect(result.equals(parse('6'))).toBeTruthy()
})

it('handles associative operators', () => {
    let tree = parse('x * y * 7')
    let result = execute(stupid, tree)
    expect(result.equals(parse('y * 7'))).toBeTruthy()
})

const nonCommutative: Action = {
    name: 'non-commutative',
    pattern: 'x / y',
    variables: { x: 'expression', y: 'number' },
    handle: ({ x }) => x
}

it('can run a non-commutative action', () => {
    let tree = parse('(x + 3) / 8')
    let result = execute(nonCommutative, tree)
    expect(result.equals(parse('x + 3'))).toBeTruthy()
})

it('does not run the non-commutative action when not possible', () => {
    let tree = parse('8 / (x + 3)')
    let result = execute(nonCommutative, tree)
    expect(result.equals(parse('8 / (x + 3)'))).toBeTruthy()
})

const nested: Action = {
    name: 'nested',
    pattern: 'x * (y + x)',
    variables: { x: 'expression', y: 'number' },
    handle: ({ x, y }) => `(${x} * ${y}) + (${x} * ${x})`
}

it('works with nested actions', () => {
    let tree = parse('7 * (3 + 7) + 5')
    let result = execute(nested, tree)
    expect(result.equals(parse('(7 * 3) + (7 * 7) + 5'))).toBeTruthy()
})

it('applies commutativity when needed when nested', () => {
    let tree = parse('7 * (7 + 3)')
    let result = execute(nested, tree)
    expect(result.equals(parse('(7 * 3) + (7 * 7)'))).toBeTruthy()
})

it('does not apply associativity when nested', () => {
    let tree = parse('7 * (3 + 7 + 5)')
    let result = execute(nested, tree)
    expect(result.equals(parse('7 * (3 + 7 + 5)'))).toBeTruthy()
})

const root: Action = {
    name: 'root',
    pattern: 'y',
    variables: { y: 'number' },
    handle: () => 2
}

it('matches typed roots', () => {
    let tree = parse('7')
    let result = execute(root, tree)
    expect(result.equals(parse('2'))).toBeTruthy()
})

it('does not match if the type is incorrect', () => {
    let tree = parse('x')
    let result = execute(root, tree)
    expect(result.equals(parse('x'))).toBeTruthy()
})

it('can match parts of a root', () => {
    let tree = parse('x + 3')
    let result = execute(root, tree)
    expect(result.equals(parse('x + 2'))).toBeTruthy()
})

const timesOne: Action = {
    name: 'times one',
    pattern: '1 * x',
    variables: { x: 'expression' },
    handle: ({ x }) => x
}

it('can match the times-one pattern', () => {
    let tree = parse('1 * 7')
    let result = execute(timesOne, tree)
    expect(result.equals(parse('7'))).toBeTruthy()
})

it('can match an entire expression', () => {
    let tree = parse('1 * (3 + 4 * x)')
    let result = execute(timesOne, tree)
    expect(result.equals(parse('3 + 4 * x'))).toBeTruthy()
})

it('applies commutativity', () => {
    let tree = parse('y * 1')
    let result = execute(timesOne, tree)
    expect(result.equals(parse('y'))).toBeTruthy()
})

it('applies associativity', () => {
    let tree = parse('5 * 1 * z')
    let result = execute(timesOne, tree)
    expect(result.equals(parse('5 * z'))).toBeTruthy()
})
