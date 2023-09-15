import latex from './../../src/output/latex'
import parse from './../../src/parse'

it('can convert a simple expression', () => {
    let tree = parse('4')
    expect(latex(tree)).toBe('4')
})

it('can convert an expression with addition', () => {
    let tree = parse('x + 6')
    expect(latex(tree)).toBe('x + 6')
})

test('multiplication gets converted to "cdot"', () => {
    let tree = parse('2 * 4')
    expect(latex(tree)).toBe('2 \\cdot 4')
})

it('can convert divisions', () => {
    let tree = parse('3 / 4')
    expect(latex(tree)).toBe('\\frac{3}{4}')
})

it('doesnt add brackets when unnecessary', () => {
    let tree = parse('3 * 4 + 5')
    expect(latex(tree)).toBe('3 \\cdot 4 + 5')
})

it('adds brackets when necessary', () => {
    let tree = parse('3 * (4 + 5)')
    expect(latex(tree)).toBe('3 \\cdot (4 + 5)')
})

it('can convert powers', () => {
    let tree = parse('x ^ 5')
    expect(latex(tree)).toBe('{x} ^ {5}')
})

it('can convert complex trees with powers', () => {
    let tree = parse('2 * x ^ (3 + y)')
    expect(latex(tree)).toBe('2 \\cdot {x} ^ {3 + y}')
})

it('can convert complex trees with fractions', () => {
    let tree = parse('3 + 4 / (x / y)')
    expect(latex(tree)).toBe('3 + \\frac{4}{\\frac{x}{y}}')
})