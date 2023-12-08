import parse from './../src/parse'
import sort from './../src/sort'

it('sorts factors alphabetically', () => {
    const input = parse('b * c * a')
    expect(sort(input)).toEqual(parse('a * b * c'))
})

it('sorts coefficients to the front', () => {
    const input = parse('b * 4 * a * 2')
    const result = sort(input)
    expect(result).toEqual(parse('2 * 4 * a * b'))
})

it('sorts nested factors', () => {
    const input = parse('a + y * x')
    expect(sort(input)).toEqual(parse('x * y + a'))
})

it('sorts factors inside powers', () => {
    const input = parse('y^3 * x^2')
    expect(sort(input)).toEqual(parse('x^2 * y^3'))
})

it('sorts numbers from large to small', () => {
    const input = parse('-3 + 0 + 10')
    expect(sort(input)).toEqual(parse('10 + 0 - 3'))
})

it('sorts terms alphabetically', () => {
    const input = parse('b + c + a')
    expect(sort(input)).toEqual(parse('a + b + c'))
})

it('sorts constants to the back', () => {
    const input = parse('a + 3 + b')
    expect(sort(input)).toEqual(parse('a + b + 3'))
})

it('sorts nested terms', () => {
    const input = parse('(y + x) * b')
    expect(sort(input)).toEqual(parse('(x + y) * b'))
})

it('sorts terms inside products', () => {
    const input = parse('c + a * b')
    expect(sort(input)).toEqual(parse('a * b + c'))
})

it('sorts terms inside powers', () => {
    const input = parse('c + a ^ 3')
    expect(sort(input)).toEqual(parse('a ^ 3 + c'))
})

it('checks the first letter', () => {
    const input = parse('2 * y + 4 * x')
    expect(sort(input)).toEqual(parse('4 * x + 2 * y'))
})

it('considers fractions as numbers', () => {
    const input = parse('(1 / 2) * y + 3 * x')
    expect(sort(input)).toEqual(parse('3 * x + (1 / 2) * y'))
})

it('sorts terms by the highest exponent', () => {
    const input = parse('x^2 + 2x^4 + x^3')
    expect(sort(input)).toEqual(parse('2x^4 + x^3 + x^2'))
})

it('sorts dubble products by the first letter', () => {
    const input = parse('b * c + a * d')
    expect(sort(input)).toEqual(parse('a * d + b * c'))
})

it('sorts functions to the front', () => {
    const input = parse('3 + sin(x) + cos(x)')
    expect(sort(input)).toEqual(parse('cos(x) + sin(x) + 3'))
})
