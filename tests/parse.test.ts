import Node from '../src/node'
import Type from '../src/type'
import parse from './../src/parse'
import tokenize from './../src/tokenize'

test('it can parse an expressin with one operator', () => {
    let input = tokenize('2 + 3')
    let result = parse(input)

    let root = new Node(Type.Operator, '+')
    root.addChild(new Node(Type.Number, 2))
    root.addChild(new Node(Type.Number, 3))

    expect(result).toEqual(root)
})

it('can parse an expression with two operators #1', () => {
    let input = tokenize('2 + 3 * 4')
    let result = parse(input)

    let root = new Node(Type.Operator, '+')
    root.addChild(new Node(Type.Number, 2))
    let times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 3))
    times.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse an expression with two operators #2', () => {
    let input = tokenize('2 * 3 + 4')
    let result = parse(input)

    let root = new Node(Type.Operator, '+')
    let times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 2))
    times.addChild(new Node(Type.Number, 3))
    root.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse an expression with three operators #1', () => {
    let input = tokenize('2 + 3 * 4 ^ 5')
    let result = parse(input)

    let root = new Node(Type.Operator, '+')
    root.addChild(new Node(Type.Number, 2))
    let times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 3))
    let power = times.addChild(new Node(Type.Operator, '^'))
    power.addChild(new Node(Type.Number, 4))
    power.addChild(new Node(Type.Number, 5))

    expect(result).toEqual(root)
})

it('can parse an expression with three operators #2', () => {
    let input = tokenize('2 + 3 ^ 4 * 5')
    let result = parse(input)

    let root = new Node(Type.Operator, '+')
    root.addChild(new Node(Type.Number, 2))
    let times = root.addChild(new Node(Type.Operator, '*'))
    let power = times.addChild(new Node(Type.Operator, '^'))
    power.addChild(new Node(Type.Number, 3))
    power.addChild(new Node(Type.Number, 4))
    times.addChild(new Node(Type.Number, 5))

    expect(result).toEqual(root)
})

it('can parse an expression with three operators #3', () => {
    let input = tokenize('2 * 3 + 4 ^ 5')
    let result = parse(input)

    let root = new Node(Type.Operator, '+')
    let times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 2))
    times.addChild(new Node(Type.Number, 3))
    let power = root.addChild(new Node(Type.Operator, '^'))
    power.addChild(new Node(Type.Number, 4))
    power.addChild(new Node(Type.Number, 5))

    expect(result).toEqual(root)
})

it('can parse an expression with three operators #4', () => {
    let input = tokenize('2 * 3 ^ 4 + 5')
    let result = parse(input)

    let root = new Node(Type.Operator, '+')
    let times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 2))
    let power = times.addChild(new Node(Type.Operator, '^'))
    power.addChild(new Node(Type.Number, 3))
    power.addChild(new Node(Type.Number, 4))
    root.addChild(new Node(Type.Number, 5))

    expect(result).toEqual(root)
})

it('can parse an expression with three operators #5', () => {
    let input = tokenize('2 ^ 3 + 4 * 5')
    let result = parse(input)

    let root = new Node(Type.Operator, '+')
    let power = root.addChild(new Node(Type.Operator, '^'))
    power.addChild(new Node(Type.Number, 2))
    power.addChild(new Node(Type.Number, 3))
    let times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 4))
    times.addChild(new Node(Type.Number, 5))

    expect(result).toEqual(root)
})

it('can parse an expression with three operators #6', () => {
    let input = tokenize('2 ^ 3 * 4 + 5')
    let result = parse(input)

    let root = new Node(Type.Operator, '+')
    let times = root.addChild(new Node(Type.Operator, '*'))
    let power = times.addChild(new Node(Type.Operator, '^'))
    power.addChild(new Node(Type.Number, 2))
    power.addChild(new Node(Type.Number, 3))
    times.addChild(new Node(Type.Number, 4))
    root.addChild(new Node(Type.Number, 5))

    expect(result).toEqual(root)
})

it('can parse an associative operator', () => {
    let input = tokenize('2 * 3 * 4')
    let result = parse(input)

    let root = new Node(Type.Operator, '*')
    root.addChild(new Node(Type.Number, 2))
    root.addChild(new Node(Type.Number, 3))
    root.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse a non-associative operator left-to-right', () => {
    let input = tokenize('2 / 3 / 4')
    let result = parse(input)

    let root = new Node(Type.Operator, '/')
    let division = root.addChild(new Node(Type.Operator, '/'))
    division.addChild(new Node(Type.Number, 2))
    division.addChild(new Node(Type.Number, 3))
    root.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse a non-associative operator right-to-left', () => {
    let input = tokenize('2 ^ 3 ^ 4')
    let result = parse(input)

    let root = new Node(Type.Operator, '^')
    root.addChild(new Node(Type.Number, 2))
    let power = root.addChild(new Node(Type.Operator, '^'))
    power.addChild(new Node(Type.Number, 3))
    power.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse a simple expression with brackets #1', () => {
    let input = tokenize('(2 + 3) * 4')
    let result = parse(input)

    let root = new Node(Type.Operator, '*')
    let plus = root.addChild(new Node(Type.Operator, '+'))
    plus.addChild(new Node(Type.Number, 2))
    plus.addChild(new Node(Type.Number, 3))
    root.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse a simple expression with brackets #2', () => {
    let input = tokenize('2 * (3 + 4)')
    let result = parse(input)

    let root = new Node(Type.Operator, '*')
    root.addChild(new Node(Type.Number, 2))
    let plus = root.addChild(new Node(Type.Operator, '+'))
    plus.addChild(new Node(Type.Number, 3))
    plus.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse an expression with nested brackets', () => {
    let input = tokenize('(((2) * (3 + 4)))')
    let result = parse(input)

    let root = new Node(Type.Operator, '*')
    root.addChild(new Node(Type.Number, 2))
    let plus = root.addChild(new Node(Type.Operator, '+'))
    plus.addChild(new Node(Type.Number, 3))
    plus.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})
