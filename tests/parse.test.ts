import { Type } from '../src/interfaces'
import Node from '../src/node'
import parse from './../src/parse'

test('it can parse an expressin with one operator', () => {
    let result = parse('2 + 3')

    let root = new Node(Type.Operator, '+')
    root.addChild(new Node(Type.Number, 2))
    root.addChild(new Node(Type.Number, 3))

    expect(result).toEqual(root)
})

it('can parse an expression with two operators #1', () => {
    let result = parse('2 + 3 * 4')

    let root = new Node(Type.Operator, '+')
    root.addChild(new Node(Type.Number, 2))
    let times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 3))
    times.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse an expression with two operators #2', () => {
    let result = parse('2 * 3 + 4')

    let root = new Node(Type.Operator, '+')
    let times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 2))
    times.addChild(new Node(Type.Number, 3))
    root.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse an expression with three operators #1', () => {
    let result = parse('2 + 3 * 4 ^ 5')

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
    let result = parse('2 + 3 ^ 4 * 5')

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
    let result = parse('2 * 3 + 4 ^ 5')

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
    let result = parse('2 * 3 ^ 4 + 5')

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
    let result = parse('2 ^ 3 + 4 * 5')

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
    let result = parse('2 ^ 3 * 4 + 5')

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
    let result = parse('2 * 3 * 4')

    let root = new Node(Type.Operator, '*')
    root.addChild(new Node(Type.Number, 2))
    root.addChild(new Node(Type.Number, 3))
    root.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse a non-associative operator left-to-right', () => {
    let result = parse('2 / 3 / 4')

    let root = new Node(Type.Operator, '/')
    let division = root.addChild(new Node(Type.Operator, '/'))
    division.addChild(new Node(Type.Number, 2))
    division.addChild(new Node(Type.Number, 3))
    root.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse a non-associative operator right-to-left', () => {
    let result = parse('2 ^ 3 ^ 4')

    let root = new Node(Type.Operator, '^')
    root.addChild(new Node(Type.Number, 2))
    let power = root.addChild(new Node(Type.Operator, '^'))
    power.addChild(new Node(Type.Number, 3))
    power.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse a simple expression with brackets #1', () => {
    let result = parse('(2 + 3) * 4')

    let root = new Node(Type.Operator, '*')
    let plus = root.addChild(new Node(Type.Operator, '+'))
    plus.addChild(new Node(Type.Number, 2))
    plus.addChild(new Node(Type.Number, 3))
    root.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse a simple expression with brackets #2', () => {
    let result = parse('2 * (3 + 4)')

    let root = new Node(Type.Operator, '*')
    root.addChild(new Node(Type.Number, 2))
    let plus = root.addChild(new Node(Type.Operator, '+'))
    plus.addChild(new Node(Type.Number, 3))
    plus.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse an expression with nested brackets', () => {
    let result = parse('(((2) * (3 + 4)))')

    let root = new Node(Type.Operator, '*')
    root.addChild(new Node(Type.Number, 2))
    let plus = root.addChild(new Node(Type.Operator, '+'))
    plus.addChild(new Node(Type.Number, 3))
    plus.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse constants', () => {
    let result = parse('e^(i*pi)')

    let root = new Node(Type.Operator, '^')
    root.addChild(new Node(Type.Constant, 'e'))
    let times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Constant, 'i'))
    times.addChild(new Node(Type.Constant, 'pi'))

    expect(result).toEqual(root)
})

it('can parse a simple function', () => {
    let result = parse('sin(3)')

    let root = new Node(Type.Function, 'sin')
    root.addChild(new Node(Type.Number, 3))

    expect(result).toEqual(root)
})

it('can parse nested functions', () => {
    let result = parse('2 * (3 + cos(7))')

    let root = new Node(Type.Operator, '*')
    root.addChild(new Node(Type.Number, 2))
    let plus = root.addChild(new Node(Type.Operator, '+'))
    plus.addChild(new Node(Type.Number, 3))
    let sin = plus.addChild(new Node(Type.Function, 'cos'))
    sin.addChild(new Node(Type.Number, 7))

    expect(result).toEqual(root)
})

it('can parse functions with complex arguments', () => {
    let result = parse('tan(4 * x + 6)')

    let root = new Node(Type.Function, 'tan')
    let plus = root.addChild(new Node(Type.Operator, '+'))
    let times = plus.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 4))
    times.addChild(new Node(Type.Variable, 'x'))
    plus.addChild(new Node(Type.Number, 6))

    expect(result).toEqual(root)
})

it('can parse nested functions', () => {
    let result = parse('(sin(2 * cos(3 + tan(4))))')

    let root = new Node(Type.Function, 'sin')
    let times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 2))
    let cos = times.addChild(new Node(Type.Function, 'cos'))
    let plus = cos.addChild(new Node(Type.Operator, '+'))
    plus.addChild(new Node(Type.Number, 3))
    let tan = plus.addChild(new Node(Type.Function, 'tan'))
    tan.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse a simple function with multiple arguments', () => {
    let result = parse('func(2, 3)')

    let root = new Node(Type.Function, 'func')
    root.addChild(new Node(Type.Number, 2))
    root.addChild(new Node(Type.Number, 3))

    expect(result).toEqual(root)
})

it('can parse a complex function with multiple arguments', () => {
    let result = parse('line(2, 3 + 4, sin(5), cos(func(6, 7)))')

    let root = new Node(Type.Function, 'line')
    root.addChild(new Node(Type.Number, 2))
    let plus = root.addChild(new Node(Type.Operator, '+'))
    plus.addChild(new Node(Type.Number, 3))
    plus.addChild(new Node(Type.Number, 4))
    let sin = root.addChild(new Node(Type.Function, 'sin'))
    sin.addChild(new Node(Type.Number, 5))
    let cos = root.addChild(new Node(Type.Function, 'cos'))
    let func = cos.addChild(new Node(Type.Function, 'func'))
    func.addChild(new Node(Type.Number, 6))
    func.addChild(new Node(Type.Number, 7))

    expect(result).toEqual(root)
})

it('removes brackets for associative operators', () => {
    let result = parse('2 * (3 * 4)')

    let root = new Node(Type.Operator, '*')
    root.addChild(new Node(Type.Number, 2))
    root.addChild(new Node(Type.Number, 3))
    root.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})
