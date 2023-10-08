import casper from './../../src/index'

it.each([
    ['p + p + p + p', '4 * p'],
    ['x + x', '2 * x'],
    ['a + a + a + a + a + a + a + a', '8 * a'],
    ['r + r + r + r + r + r + r', '7 * r'],
    ['5a * 9b', 'a * b * 45'],
    ['25a * -4b', 'a * b * -100'],
    ['-8b * 4a', 'b * a * -32'],
    ['-3p * -q', 'p * q * 3'],
    ['6x * -5', 'x * -30'],
    ['-p * -a', 'a * p'],
    ['0.2a * c * 5b', 'c * b * a'],
    ['-8x * -y * 3z', 'x * y * z * 24'],
    ['-a * -b * -1', 'a * b * -1'],
    ['5y * -3x * -z', 'y * x * z * 15'],
    ['18y * 0 * -2x', '0'],
    ['-0.5a * c * -8b', 'a * c * b * 4'],
    ['15a * 3a', '45 * a ^ 2'],
    ['15a * 3b', 'a * b * 45'],
    ['(-1 / 3) * x * (-1 / 2) * x', '(1 / 6) * x ^ 2'],
    ['(-2 / 3) * (-3 / 4) * y', 'y * (1 / 2)'],
    ['(1 / 3) * x * (2 / 3) * y * (-3 / 5) * x', 'y * (-2 / 15) * x ^ 2'],
    ['(2 / 3) * x * (1 / 2) * y * 3z', 'y * z * x']
])('simplifies the expression', (input: string, output: string) => {
    const result = casper().go(input)
    expect(result.result).toBe(output)
})
