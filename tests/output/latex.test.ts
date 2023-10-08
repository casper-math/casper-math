import { Type } from '../../src/interfaces'
import Node from '../../src/node'
import latex from './../../src/output/latex'
import parse from './../../src/parse'

it('can convert a simple expression', () => {
    const tree = parse('4')
    expect(latex(tree)).toBe('4')
})

it('can convert an expression with addition', () => {
    const tree = parse('x + 6')
    expect(latex(tree)).toBe('x + 6')
})

test('multiplication gets converted to "cdot"', () => {
    const tree = parse('2 * 4')
    expect(latex(tree)).toBe('2 \\cdot 4')
})

it('can convert divisions', () => {
    const tree = parse('3 / 4')
    expect(latex(tree)).toBe('\\frac{3}{4}')
})

it('doesnt add brackets when unnecessary', () => {
    const tree = parse('3 * 4 + 5')
    expect(latex(tree)).toBe('3 \\cdot 4 + 5')
})

it('adds brackets when necessary', () => {
    const tree = parse('3 * (4 + 5)')
    expect(latex(tree)).toBe('3 \\cdot \\left( 4 + 5 \\right)')
})

it('can convert powers', () => {
    const tree = parse('x ^ 5')
    expect(latex(tree)).toBe('{x} ^ {5}')
})

it('can convert complex trees with powers', () => {
    const tree = parse('2 * x ^ (3 + y)')
    expect(latex(tree)).toBe('2 \\cdot {x} ^ {3 + y}')
})

it('can convert complex trees with fractions', () => {
    const tree = parse('3 + 4 / (x / y)')
    expect(latex(tree)).toBe('3 + \\frac{4}{\\frac{x}{y}}')
})

it('can convert functions and constants', () => {
    const tree = parse('func(2 * e, 5)')
    expect(latex(tree)).toBe('\\text{func} \\left( 2 \\cdot e, 5 \\right)')
})

it('converts greek constters', () => {
    const tree = parse('sin(pi + 2 * alpha)')
    expect(latex(tree)).toBe('\\text{sin} \\left( \\pi + 2 \\cdot \\alpha \\right)')
})

it('converts subtraction correctly', () => {
    const tree = parse('-4 - 3 - x')
    expect(latex(tree)).toBe('-4 - 3 - x')
})

it('converts equality correctly', () => {
    const tree = parse('2 * x = 8')
    expect(latex(tree)).toBe('2 \\cdot x = 8')
})

it('adds brackets around powers when needed', () => {
    const tree = new Node(Type.Operator, '^')
    tree.addChild(new Node(Type.Number, -4))
    tree.addChild(new Node(Type.Number, 2))

    expect(latex(tree)).toBe('{ \\left( -4 \\right) } ^ {2}')
})

it('converts square roots', () => {
    const tree = parse('sqrt(9)')
    expect(latex(tree)).toBe('\\sqrt{9}')
})

it('converts variable names with subscripts', () => {
    const tree = parse('x_1 + x_12 + F_drag + alpha_epsilon')
    expect(latex(tree)).toBe('x_{1} + x_{12} + F_{drag} + \\alpha_{\\epsilon}')
})

it('wraps fractions in big brackets', () => {
    const tree = parse('(2 / 5) ^ 3')
    expect(latex(tree)).toBe('{ \\left( \\frac{2}{5} \\right) } ^ {3}')
})
