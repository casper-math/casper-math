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
    ['-p * -a', 'p * a'],
    ['0.2a * c * 5b', 'a * b * c'],
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
    ['(2 / 3) * x * (1 / 2) * y * 3z', 'x * z * y'],
    ['6a + 7a', '13 * a'],
    ['2c + 3c', '5 * c'],
    ['1096x + 4x', '1100 * x'],
    ['15y + y', '16 * y'],
    ['154x + 46x', '200 * x'],
    ['1.5q + 0.5q', '2 * q'],
    ['2 * a * b + 8 * a * b', '10 * a * b'],
    ['4.5 * p + p', '(11 / 2) * p'],
    ['c + 13c', '14 * c'],
    ['3a + 10a', '13 * a'],
    ['3a + 10 * a * b', '3 * a + 10 * a * b'],
    ['b + 8b', '9 * b'],
    ['3x + 8', '8 + 3 * x'],
    ['2 * a * c + 6 * a * c', '8 * a * c'],
    ['2 * a * c + 8 * a * d', '2 * a * c + 8 * a * d'],
    ['a + (1 + 1 / 2) * a', '(5 / 2) * a'],
    ['(1 / 2) * a + (1 / 3) * b', '(1 / 2) * a + (1 / 3) * b'],
    ['(3 + 1 / 2) * a + (1 + 1 / 2) * a', '5 * a'],
    ['5a + 2b + 3a + 4b', '8 * a + 6 * b'],
    ['8a + 6 + 2a + 9', '15 + 10 * a'],
    ['6a + 14a + 3b', '20 * a + 3 * b'],
    ['2 * a * b + 4b + 6 * a * b + 8b', '8 * a * b + 12 * b'],
    ['3 * a * b + 2 * b * c + 8 * b * c + a * b', '4 * a * b + 10 * b * c'],
    ['6a + 5b + 6b', '6 * a + 11 * b'],
    ['6a + 8a + 5a', '19 * a'],
    ['6a * 8a', '48 * a ^ 2'],
    ['6a + 8b + a', '7 * a + 8 * b'],
    ['6a * 8b', 'a * b * 48'],
    ['3x + 4y + x + 2y', '4 * x + 6 * y'],
    ['-3x * -4y * -x', 'y * -12 * x ^ 2'],
    ['3x * -2y', 'x * y * -6'],
    ['3x + y + 2y + y', '3 * x + 4 * y'],
    ['p + p + q', '2 * p + q'],
    ['p + 5 + q + 8', '13 + p + q'],
    ['-(1 + 2 / 3) * p * -(2 / 5) * p', '(2 / 3) * p ^ 2'],
    ['6p * -(2 / 3) * 3q', 'p * q * -12'],
    ['5a + 3b + (2 + 1 / 3) * c + 6a + 7b + (8 + 1 / 2) * c', '11 * a + 10 * b + (65 / 6) * c'],
    ['3 * a * b + 5 * b * c + 7 * a * c + 8 * a * b + 9 * a * c + 10 * b * c', '11 * a * b + 15 * b * c + 16 * a * c'],
    ['7 * p * q + 8p + 9q + 6 * p * q + p * q + p + q', '14 * p * q + 9 * p + 10 * q'],
    ['3 * a * b * -5 * -(2 + 1 / 2) * c * e * 8d', 'a * b * c * e * d * 300'],
    ['12 * a * b * c * 5 * d * e * f * 0 * 30 * g * h', '0'],
    ['12 * a * b * c * 5 * b * d * 2 * 30 * a * e', 'c * d * e * 3600 * a ^ 2 * b ^ 2'],
    ['3a - 5a', '-2 * a'],
    ['-3a - 5a', '-8 * a'],
    ['-3a + 5a', '2 * a'],
    ['6b + -2b', '4 * b'],
    ['-6b + -2b', '-8 * b'],
    ['-6b - -2b', '-4 * b'],
    ['5x - 4x', 'x'],
    ['-5x + 5x', '0']
])('simplifies the expression', (input: string, output: string) => {
    const result = casper().go(input)
    expect(result.result).toBe(output)
})
