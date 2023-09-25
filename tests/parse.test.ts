import { Type } from '../src/interfaces'
import Node from '../src/node'
import parse from './../src/parse'

test('it can parse an expressin with one operator', () => {
    const result = parse('2 + 3')

    const root = new Node(Type.Operator, '+')
    root.addChild(new Node(Type.Number, 2))
    root.addChild(new Node(Type.Number, 3))

    expect(result).toEqual(root)
})

it('can parse an expression with two operators #1', () => {
    const result = parse('2 + 3 * 4')

    const root = new Node(Type.Operator, '+')
    root.addChild(new Node(Type.Number, 2))
    const times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 3))
    times.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse an expression with two operators #2', () => {
    const result = parse('2 * 3 + 4')

    const root = new Node(Type.Operator, '+')
    const times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 2))
    times.addChild(new Node(Type.Number, 3))
    root.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse an expression with three operators #1', () => {
    const result = parse('2 + 3 * 4 ^ 5')

    const root = new Node(Type.Operator, '+')
    root.addChild(new Node(Type.Number, 2))
    const times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 3))
    const power = times.addChild(new Node(Type.Operator, '^'))
    power.addChild(new Node(Type.Number, 4))
    power.addChild(new Node(Type.Number, 5))

    expect(result).toEqual(root)
})

it('can parse an expression with three operators #2', () => {
    const result = parse('2 + 3 ^ 4 * 5')

    const root = new Node(Type.Operator, '+')
    root.addChild(new Node(Type.Number, 2))
    const times = root.addChild(new Node(Type.Operator, '*'))
    const power = times.addChild(new Node(Type.Operator, '^'))
    power.addChild(new Node(Type.Number, 3))
    power.addChild(new Node(Type.Number, 4))
    times.addChild(new Node(Type.Number, 5))

    expect(result).toEqual(root)
})

it('can parse an expression with three operators #3', () => {
    const result = parse('2 * 3 + 4 ^ 5')

    const root = new Node(Type.Operator, '+')
    const times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 2))
    times.addChild(new Node(Type.Number, 3))
    const power = root.addChild(new Node(Type.Operator, '^'))
    power.addChild(new Node(Type.Number, 4))
    power.addChild(new Node(Type.Number, 5))

    expect(result).toEqual(root)
})

it('can parse an expression with three operators #4', () => {
    const result = parse('2 * 3 ^ 4 + 5')

    const root = new Node(Type.Operator, '+')
    const times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 2))
    const power = times.addChild(new Node(Type.Operator, '^'))
    power.addChild(new Node(Type.Number, 3))
    power.addChild(new Node(Type.Number, 4))
    root.addChild(new Node(Type.Number, 5))

    expect(result).toEqual(root)
})

it('can parse an expression with three operators #5', () => {
    const result = parse('2 ^ 3 + 4 * 5')

    const root = new Node(Type.Operator, '+')
    const power = root.addChild(new Node(Type.Operator, '^'))
    power.addChild(new Node(Type.Number, 2))
    power.addChild(new Node(Type.Number, 3))
    const times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 4))
    times.addChild(new Node(Type.Number, 5))

    expect(result).toEqual(root)
})

it('can parse an expression with three operators #6', () => {
    const result = parse('2 ^ 3 * 4 + 5')

    const root = new Node(Type.Operator, '+')
    const times = root.addChild(new Node(Type.Operator, '*'))
    const power = times.addChild(new Node(Type.Operator, '^'))
    power.addChild(new Node(Type.Number, 2))
    power.addChild(new Node(Type.Number, 3))
    times.addChild(new Node(Type.Number, 4))
    root.addChild(new Node(Type.Number, 5))

    expect(result).toEqual(root)
})

it('can parse an associative operator', () => {
    const result = parse('2 * 3 * 4')

    const root = new Node(Type.Operator, '*')
    root.addChild(new Node(Type.Number, 2))
    root.addChild(new Node(Type.Number, 3))
    root.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse a non-associative operator left-to-right', () => {
    const result = parse('2 / 3 / 4')

    const root = new Node(Type.Operator, '/')
    const division = root.addChild(new Node(Type.Operator, '/'))
    division.addChild(new Node(Type.Number, 2))
    division.addChild(new Node(Type.Number, 3))
    root.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse a non-associative operator right-to-left', () => {
    const result = parse('2 ^ 3 ^ 4')

    const root = new Node(Type.Operator, '^')
    root.addChild(new Node(Type.Number, 2))
    const power = root.addChild(new Node(Type.Operator, '^'))
    power.addChild(new Node(Type.Number, 3))
    power.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse a simple expression with brackets #1', () => {
    const result = parse('(2 + 3) * 4')

    const root = new Node(Type.Operator, '*')
    const plus = root.addChild(new Node(Type.Operator, '+'))
    plus.addChild(new Node(Type.Number, 2))
    plus.addChild(new Node(Type.Number, 3))
    root.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse a simple expression with brackets #2', () => {
    const result = parse('2 * (3 + 4)')

    const root = new Node(Type.Operator, '*')
    root.addChild(new Node(Type.Number, 2))
    const plus = root.addChild(new Node(Type.Operator, '+'))
    plus.addChild(new Node(Type.Number, 3))
    plus.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse an expression with nested brackets', () => {
    const result = parse('(((2) * (3 + 4)))')

    const root = new Node(Type.Operator, '*')
    root.addChild(new Node(Type.Number, 2))
    const plus = root.addChild(new Node(Type.Operator, '+'))
    plus.addChild(new Node(Type.Number, 3))
    plus.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse constants', () => {
    const result = parse('e^(i*pi)')

    const root = new Node(Type.Operator, '^')
    root.addChild(new Node(Type.Constant, 'e'))
    const times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Constant, 'i'))
    times.addChild(new Node(Type.Constant, 'pi'))

    expect(result).toEqual(root)
})

it('can parse a simple function', () => {
    const result = parse('sin(3)')

    const root = new Node(Type.Function, 'sin')
    root.addChild(new Node(Type.Number, 3))

    expect(result).toEqual(root)
})

it('can parse nested functions', () => {
    const result = parse('2 * (3 + cos(7))')

    const root = new Node(Type.Operator, '*')
    root.addChild(new Node(Type.Number, 2))
    const plus = root.addChild(new Node(Type.Operator, '+'))
    plus.addChild(new Node(Type.Number, 3))
    const sin = plus.addChild(new Node(Type.Function, 'cos'))
    sin.addChild(new Node(Type.Number, 7))

    expect(result).toEqual(root)
})

it('can parse functions with complex arguments', () => {
    const result = parse('tan(4 * x + 6)')

    const root = new Node(Type.Function, 'tan')
    const plus = root.addChild(new Node(Type.Operator, '+'))
    const times = plus.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 4))
    times.addChild(new Node(Type.Variable, 'x'))
    plus.addChild(new Node(Type.Number, 6))

    expect(result).toEqual(root)
})

it('can parse nested functions', () => {
    const result = parse('(sin(2 * cos(3 + tan(4))))')

    const root = new Node(Type.Function, 'sin')
    const times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 2))
    const cos = times.addChild(new Node(Type.Function, 'cos'))
    const plus = cos.addChild(new Node(Type.Operator, '+'))
    plus.addChild(new Node(Type.Number, 3))
    const tan = plus.addChild(new Node(Type.Function, 'tan'))
    tan.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse a simple function with multiple arguments', () => {
    const result = parse('func(2, 3)')

    const root = new Node(Type.Function, 'func')
    root.addChild(new Node(Type.Number, 2))
    root.addChild(new Node(Type.Number, 3))

    expect(result).toEqual(root)
})

it('can parse a complex function with multiple arguments', () => {
    const result = parse('line(2, 3 + 4, sin(5), cos(func(6, 7)))')

    const root = new Node(Type.Function, 'line')
    root.addChild(new Node(Type.Number, 2))
    const plus = root.addChild(new Node(Type.Operator, '+'))
    plus.addChild(new Node(Type.Number, 3))
    plus.addChild(new Node(Type.Number, 4))
    const sin = root.addChild(new Node(Type.Function, 'sin'))
    sin.addChild(new Node(Type.Number, 5))
    const cos = root.addChild(new Node(Type.Function, 'cos'))
    const func = cos.addChild(new Node(Type.Function, 'func'))
    func.addChild(new Node(Type.Number, 6))
    func.addChild(new Node(Type.Number, 7))

    expect(result).toEqual(root)
})

it('can parse multiple functions', () => {
    const result = parse('sin(2 * pi) + cos(3 + pi)')

    const root = new Node(Type.Operator, '+')
    const sin = root.addChild(new Node(Type.Function, 'sin'))
    const times = sin.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 2))
    times.addChild(new Node(Type.Constant, 'pi'))
    const cos = root.addChild(new Node(Type.Function, 'cos'))
    const plus = cos.addChild(new Node(Type.Operator, '+'))
    plus.addChild(new Node(Type.Number, 3))
    plus.addChild(new Node(Type.Constant, 'pi'))

    expect(result).toEqual(root)
})

it('removes brackets for associative operators', () => {
    const result = parse('2 * (3 * 4)')

    const root = new Node(Type.Operator, '*')
    root.addChild(new Node(Type.Number, 2))
    root.addChild(new Node(Type.Number, 3))
    root.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('parses multiplication before division correctly', () => {
    const result = parse('2 * 3 / 4')

    const root = new Node(Type.Operator, '/')
    const times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 2))
    times.addChild(new Node(Type.Number, 3))
    root.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('parses division before multiplication correctly', () => {
    const result = parse('2 / 3 * 4')

    const root = new Node(Type.Operator, '*')
    const division = root.addChild(new Node(Type.Operator, '/'))
    division.addChild(new Node(Type.Number, 2))
    division.addChild(new Node(Type.Number, 3))
    root.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse nested brackets', () => {
    const result = parse('(38 - (3 + 2)) * 5')

    const root = new Node(Type.Operator, '*')
    const plus = root.addChild(new Node(Type.Operator, '+'))
    plus.addChild(new Node(Type.Number, 38))
    const times = plus.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, -1))
    const nestedPlus = times.addChild(new Node(Type.Operator, '+'))
    nestedPlus.addChild(new Node(Type.Number, 3))
    nestedPlus.addChild(new Node(Type.Number, 2))
    root.addChild(new Node(Type.Number, 5))

    expect(result).toEqual(root)
})
