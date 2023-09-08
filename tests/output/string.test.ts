import string from './../../src/output/string'
import parse from './../../src/parse'

it('can convert a simple expression to a string', () => {
    let tree = parse('4')
    expect(string(tree)).toBe('4')
})

it('can convert an addition to a string', () => {
    let tree = parse('2 + 3')
    expect(string(tree)).toBe('2 + 3')
})

it('can convert an expression with multiple operators to a string', () => {
    let tree = parse('2 * 3 + 4')
    expect(string(tree)).toBe('2 * 3 + 4')
})

it('inserts brackets if needed', () => {
    let tree = parse('2 * (3 + 4)')
    expect(string(tree)).toBe('2 * (3 + 4)')
})

it('can convert an addition with multiple terms to a string', () => {
    let tree = parse('2 + x + y + 4')
    expect(string(tree)).toBe('2 + x + y + 4')
})

it('can convert an exponentiation to a string', () => {
    let tree = parse('2 ^ 3 ^ 4')
    expect(string(tree)).toBe('2 ^ (3 ^ 4)')
})

it('can convert an exponentiation with brackets to a string', () => {
    let tree = parse('(2 ^ 3) ^ 4')
    expect(string(tree)).toBe('(2 ^ 3) ^ 4')
})