import { Type } from '../../src/interfaces'
import Node from '../../src/node'
import string from './../../src/output/string'
import parse from './../../src/parse'

it('can convert a simple expression to a string', () => {
    const tree = parse('4')
    expect(string(tree)).toBe('4')
})

it('can convert an addition to a string', () => {
    const tree = parse('2 + 3')
    expect(string(tree)).toBe('2 + 3')
})

it('can convert an expression with multiple operators to a string', () => {
    const tree = parse('2 * 3 + 4')
    expect(string(tree)).toBe('2 * 3 + 4')
})

it('inserts brackets if needed', () => {
    const tree = parse('2 * (3 + 4)')
    expect(string(tree)).toBe('2 * (3 + 4)')
})

it('can convert an addition with multiple terms to a string', () => {
    const tree = parse('2 + x + y + 4')
    expect(string(tree)).toBe('2 + x + y + 4')
})

it('can convert an exponentiation to a string', () => {
    const tree = parse('2 ^ 3 ^ 4')
    expect(string(tree)).toBe('2 ^ (3 ^ 4)')
})

it('can convert an exponentiation with brackets to a string', () => {
    const tree = parse('(2 ^ 3) ^ 4')
    expect(string(tree)).toBe('(2 ^ 3) ^ 4')
})

it('converts subtraction correctly', () => {
    const tree = parse('-4 - 3 - x')
    expect(string(tree)).toBe('-4 - 3 - x')
})

it('converts a function', () => {
    const tree = parse('sin(2 * x)')
    expect(string(tree)).toBe('sin(2 * x)')
})

it('converts a function with multiple parameters', () => {
    const tree = parse('func(7, 3)')
    expect(string(tree)).toBe('func(7, 3)')
})

it('converts nested functions', () => {
    const tree = parse('func(2 * sin(4 + cos(7)), tan(3))')
    expect(string(tree)).toBe('func(2 * sin(4 + cos(7)), tan(3))')
})

it('adds brackets around powers when needed', () => {
    const tree = new Node(Type.Operator, '^')
    tree.addChild(new Node(Type.Number, -4))
    tree.addChild(new Node(Type.Number, 2))

    expect(string(tree)).toBe('(-4) ^ 2')
})
