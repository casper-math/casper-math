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
    expect(sort(input)).toEqual(parse('a + x * y'))
})

it('sorts factors inside powers', () => {
    const input = parse('y^3 * x^2')
    expect(sort(input)).toEqual(parse('x^2 * y^3'))
})

it('sorts terms alphabetically', () => {
    const input = parse('b + c + a')
    expect(sort(input)).toEqual(parse('a + b + c'))
})

it('sorts constants to the back', () => {
    const input = parse('a + 3 + b')
    const result = sort(input)
    expect(result).toEqual(parse('a + b + 3'))
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
