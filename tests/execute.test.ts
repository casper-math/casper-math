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
    const tree = parse('2 + 5')
    const result = execute(add, tree)
    expect(result).toEqual(parse('7'))
})

it('can run the add action when nested', () => {
    const tree = parse('3 * (2 + 4)')
    const result = execute(add, tree)
    expect(result).toEqual(parse('3 * 6'))
})

it('does not match any expression', () => {
    const tree = parse('x + 2 * y')
    const result = execute(add, tree)
    expect(result).toEqual(parse('x + 2*y'))
})

it('only matches the number of operands needed', () => {
    const tree = parse('3 + 2 + y')
    const result = execute(add, tree)
    expect(result).toEqual(parse('y + 5'))
})

const double: Action = {
    name: 'double',
    pattern: 'x + x',
    variables: { x: 'expression' },
    handle: ({ x }) => `2 * (${x})`
}

it('can run the double action', () => {
    const tree = parse('4 + 4')
    const result = execute(double, tree)
    expect(result).toEqual(parse('2 * 4'))
})

it('does not match different variables', () => {
    const tree = parse('4 + 3')
    const result = execute(double, tree)
    expect(result).toEqual(parse('4 + 3'))
})

it('can match any expression', () => {
    const tree = parse('y^3 + y^3')
    const result = execute(double, tree)
    expect(result).toEqual(parse('2 * y^3'))
})

it('does not add nested associative operators', () => {
    const tree = parse('4 * x + 4 * x')
    const result = execute(double, tree)
    expect(result).toEqual(parse('2 * 4 * x'))
})

const stupid: Action = {
    name: 'stupid',
    pattern: 'x * y',
    variables: { x: 'single', y: 'number' },
    handle: ({ y }) => y
}

it('handles commutative operators', () => {
    const tree = parse('6 * a')
    const result = execute(stupid, tree)
    expect(result).toEqual(parse('6'))
})

it('handles associative operators', () => {
    const tree = parse('x * y * 7')
    const result = execute(stupid, tree)
    expect(result).toEqual(parse('y * 7'))
})

const nonCommutative: Action = {
    name: 'non-commutative',
    pattern: 'x / y',
    variables: { x: 'expression', y: 'number' },
    handle: ({ x }) => x
}

it('can run a non-commutative action', () => {
    const tree = parse('(x + 3) / 8')
    const result = execute(nonCommutative, tree)
    expect(result).toEqual(parse('x + 3'))
})

it('does not run the non-commutative action when not possible', () => {
    const tree = parse('8 / (x + 3)')
    const result = execute(nonCommutative, tree)
    expect(result).toEqual(parse('8 / (x + 3)'))
})

const nested: Action = {
    name: 'nested',
    pattern: 'x * (x + y)',
    variables: { x: 'expression', y: 'number' },
    handle: ({ x, y }) => `(${x} * ${y}) + (${x} * ${x})`
}

it('works with nested actions', () => {
    const tree = parse('7 * (7 + 3) + 5')
    const result = execute(nested, tree)
    expect(result).toEqual(parse('(7 * 3) + (7 * 7) + 5'))
})

it('applies commutativity when needed when nested', () => {
    const tree = parse('7 * (3 + 7)')
    const result = execute(nested, tree)
    expect(result).toEqual(parse('(7 * 3) + (7 * 7)'))
})

it('does not apply associativity when nested', () => {
    const tree = parse('7 * (3 + 7 + 5)')
    const result = execute(nested, tree)
    expect(result).toEqual(parse('7 * (3 + 7 + 5)'))
})

const root: Action = {
    name: 'root',
    pattern: 'y',
    variables: { y: 'number' },
    handle: () => 2
}

it('matches typed roots', () => {
    const tree = parse('7')
    const result = execute(root, tree)
    expect(result).toEqual(parse('2'))
})

it('does not match if the type is incorrect', () => {
    const tree = parse('x')
    const result = execute(root, tree)
    expect(result).toEqual(parse('x'))
})

it('can match parts of a root', () => {
    const tree = parse('x + 3')
    const result = execute(root, tree)
    expect(result).toEqual(parse('x + 2'))
})

const timesOne: Action = {
    name: 'times one',
    pattern: '1 * x',
    variables: { x: 'expression' },
    handle: ({ x }) => x
}

it('can match the times-one pattern', () => {
    const tree = parse('1 * 7')
    const result = execute(timesOne, tree)
    expect(result).toEqual(parse('7'))
})

it('can match an entire expression', () => {
    const tree = parse('1 * (3 + 4 * x)')
    const result = execute(timesOne, tree)
    expect(result).toEqual(parse('3 + 4 * x'))
})

it('applies commutativity', () => {
    const tree = parse('y * 1')
    const result = execute(timesOne, tree)
    expect(result).toEqual(parse('y'))
})

it('applies associativity', () => {
    const tree = parse('5 * 1 * z')
    const result = execute(timesOne, tree)
    expect(result).toEqual(parse('z * 5'))
})

const anotherNested: Action = {
    name: 'another nested',
    pattern: 'a / b + c',
    variables: { a: 'number', b: 'number', c: 'number' },
    handle: ({ a, b, c }) => `${Number(a) + Number(b) * Number(c)} / ${b}`
}

it('can run the action', () => {
    const tree = parse('3 / 7 + 4')
    const result = execute(anotherNested, tree)
    expect(result).toEqual(parse('31 / 7'))
})

it('applies commutativity with fractions', () => {
    const tree = parse('4 + 3 / 7')
    const result = execute(anotherNested, tree)
    expect(result).toEqual(parse('31 / 7'))
})

it('applies associativity with fractions', () => {
    const tree = parse('x + 13 / 3 + 8')
    const result = execute(anotherNested, tree)
    expect(result).toEqual(parse('x + 37 / 3'))
})

const division: Action = {
    name: 'division',
    pattern: '(x + y) / 6',
    variables: { x: 'number', y: 'number' },
    handle: () => 1
}

it('does not match the same variable with other inputs', () => {
    const tree = parse('6 / (3 + 4)')
    const result = execute(division, tree)
    expect(result).toEqual(parse('6 / (3 + 4)'))
})

const reversedDivision: Action = {
    name: 'reversed division',
    pattern: 'x / 3',
    variables: { x: 'number' },
    handle: () => 2
}

it('does not apply commutativity with constants if the operator is not commutative', () => {
    const tree = parse('3 / 5')
    const result = execute(reversedDivision, tree)
    expect(result).toEqual(parse('3 / 5'))
})

const func: Action = {
    name: 'function',
    pattern: 'func(x, 6)',
    variables: { x: 'number' },
    handle: () => 3
}

it('checks for functions', () => {
    const tree = parse('func(6, 3)')
    const result = execute(func, tree)
    expect(result).toEqual(parse('func(6, 3)'))
})

const manual: Action = {
    name: 'manual',
    run: node => {
        if (node.value === 3) {
            return 4
        }
        if (node.value === 5) {
            return '6 * 7'
        }
        return node
    }
}

it('can execute a "manual" action', () => {
    const tree = parse('3 + 7')
    const result = execute(manual, tree)
    expect(result).toEqual(parse('4 + 7'))
})

it('works from the root', () => {
    const tree = parse('3')
    const result = execute(manual, tree)
    expect(result).toEqual(parse('4'))
})

it('can return expressions', () => {
    const tree = parse('2 + 5')
    const result = execute(manual, tree)
    expect(result).toEqual(parse('2 + 6 * 7'))
})

it('handles associative operators', () => {
    const tree = parse('2 * 5')
    const result = execute(manual, tree)
    expect(result).toEqual(parse('2 * 6 * 7'))
})

const multiplyByZero: Action = {
    name: 'multiply by zero',
    pattern: '0 * x',
    variables: { x: 'expression' },
    handle: () => 0
}

it('can run the multiply by zero action', () => {
    const tree = parse('2 * 0')
    const result = execute(multiplyByZero, tree)
    expect(result).toEqual(parse('0'))
})

it('can run the multiply by zero action with commutativity', () => {
    const tree = parse('0 * 2')
    const result = execute(multiplyByZero, tree)
    expect(result).toEqual(parse('0'))
})
