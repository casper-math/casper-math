import casper from '../../src/index'

it.each([
    ['p + p + p + p', '4 * p'],
    ['x + x', '2 * x'],
    ['a + a + a + a + a + a + a + a', '8 * a'],
    ['r + r + r + r + r + r + r', '7 * r'],
    ['5a * 9b', 'a * b * 45'],
    ['25a * -4b', 'a * b * -100']
])('simplifies the expression', (input: string, output: string) => {
    const result = casper().go(input)
    expect(result.result).toBe(output)
})
