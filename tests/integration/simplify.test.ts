import casper from './../../src/index'

it.each([
    ['p + p + p + p', '4 * p'],
    ['x + x', '2 * x'],
    ['a + a + a + a + a + a + a + a', '8 * a'],
    ['r + r + r + r + r + r + r', '7 * r'],
    ['5a * 9b', '45 * a * b'],
    ['25a * -4b', '-100 * a * b'],
    ['-8b * 4a', '-32 * a * b'],
    ['-3p * -q', '3 * p * q'],
    ['6x * -5', '-30 * x'],
    ['-p * -a', 'a * p'],
    ['0.2a * c * 5b', 'a * b * c'],
    ['-8x * -y * 3z', '24 * x * y * z'],
    ['-a * -b * -1', '-1 * a * b'],
    ['5y * -3x * -z', '15 * x * y * z'],
    ['18y * 0 * -2x', '0'],
    ['-0.5a * c * -8b', '4 * a * b * c'],
    ['15a * 3a', '45 * a ^ 2'],
    ['15a * 3b', '45 * a * b'],
    ['(-1 / 3) * x * (-1 / 2) * x', '(1 / 6) * x ^ 2'],
    ['(-2 / 3) * (-3 / 4) * y', '(1 / 2) * y'],
    ['(1 / 3) * x * (2 / 3) * y * (-3 / 5) * x', '(-2 / 15) * x ^ 2 * y'],
    ['(2 / 3) * x * (1 / 2) * y * 3z', 'x * y * z'],
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
    ['3x + 8', '3 * x + 8'],
    ['2 * a * c + 6 * a * c', '8 * a * c'],
    ['2 * a * c + 8 * a * d', '2 * a * c + 8 * a * d'],
    ['a + (1 + 1 / 2) * a', '(5 / 2) * a'],
    ['(1 / 2) * a + (1 / 3) * b', '(1 / 2) * a + (1 / 3) * b'],
    ['(3 + 1 / 2) * a + (1 + 1 / 2) * a', '5 * a'],
    ['5a + 2b + 3a + 4b', '8 * a + 6 * b'],
    ['8a + 6 + 2a + 9', '10 * a + 15'],
    ['6a + 14a + 3b', '20 * a + 3 * b'],
    ['2 * a * b + 4b + 6 * a * b + 8b', '8 * a * b + 12 * b'],
    ['3 * a * b + 2 * b * c + 8 * b * c + a * b', '4 * a * b + 10 * b * c'],
    ['6a + 5b + 6b', '6 * a + 11 * b'],
    ['6a + 8a + 5a', '19 * a'],
    ['6a * 8a', '48 * a ^ 2'],
    ['6a + 8b + a', '7 * a + 8 * b'],
    ['6a * 8b', '48 * a * b'],
    ['3x + 4y + x + 2y', '4 * x + 6 * y'],
    ['-3x * -4y * -x', '-12 * x ^ 2 * y'],
    ['3x * -2y', '-6 * x * y'],
    ['3x + y + 2y + y', '3 * x + 4 * y'],
    ['p + p + q', '2 * p + q'],
    ['p + 5 + q + 8', 'p + q + 13'],
    ['-(1 + 2 / 3) * p * -(2 / 5) * p', '(2 / 3) * p ^ 2'],
    ['6p * -(2 / 3) * 3q', '-12 * p * q'],
    ['5a + 3b + (2 + 1 / 3) * c + 6a + 7b + (8 + 1 / 2) * c', '11 * a + 10 * b + (65 / 6) * c'],
    ['3 * a * b + 5 * b * c + 7 * a * c + 8 * a * b + 9 * a * c + 10 * b * c', '11 * a * b + 16 * a * c + 15 * b * c'],
    ['7 * p * q + 8p + 9q + 6 * p * q + p * q + p + q', '14 * p * q + 9 * p + 10 * q'],
    ['3 * a * b * -5 * -(2 + 1 / 2) * c * e * 8d', '300 * a * b * c * d * e'],
    ['12 * a * b * c * 5 * d * e * f * 0 * 30 * g * h', '0'],
    ['12 * a * b * c * 5 * b * d * 2 * 30 * a * e', '3600 * a ^ 2 * b ^ 2 * c * d * e'],
    ['3a - 5a', '-2 * a'],
    ['-3a - 5a', '-8 * a'],
    ['-3a + 5a', '2 * a'],
    ['6b + -2b', '4 * b'],
    ['-6b + -2b', '-8 * b'],
    ['-6b - -2b', '-4 * b'],
    ['5x - 4x', 'x'],
    ['-5x + 5x', '0'],
    ['4x - 5x', '-1 * x'],
    ['6p - 12p', '-6 * p'],
    ['-2a - 8a', '-10 * a'],
    ['0.6x + 1.4x', '2 * x'],
    ['5 * a * b - 12 * a * b', '-7 * a * b'],
    ['-3 * p * q - 4 * p * r', '-3 * p * q - 4 * p * r'],
    ['-12 * a * c + a * c', '-11 * a * c'],
    ['6a - 7a', '-1 * a'],
    ['3 * b * c - 2 * b * c', 'b * c'],
    ['-5 * a * c + 5 * b * c', '-5 * a * c + 5 * b * c'],
    ['2x - 3x - 4y', '-1 * x - 4 * y'],
    ['2x - 3y - 4y', '2 * x - 7 * y'],
    ['-3a - 4a + 2b', '-7 * a + 2 * b'],
    ['-3a - 4b + 2a', '-1 * a - 4 * b'],
    ['7p - 4q - 3q', '7 * p - 7 * q'],
    ['-3t - 4t - 5t', '-12 * t'],
    ['2a - 3b + 5a - 2b', '7 * a - 5 * b'],
    ['-3a - b + 2b - a', '-4 * a + b'],
    ['3a + 2b + 8a - 2b', '11 * a'],
    ['5x + 4y - x - 5y', '4 * x - y'],
    ['-3x + 8y - 8y + 3x', '0'],
    ['x - y + x + y', '2 * x'],
    ['2x - 3 + 5x - 2', '7 * x - 5'],
    ['-x + y + x - y', '0'],
    ['(3 + 1 / 4) * x - 1 + 8 - (1 / 2) * x', '(11 / 4) * x + 7'],
    ['-a - b - a + b', '-2 * a'],
    ['8a + 4 - 8a + 2', '6'],
    ['-(2 / 3) * a - a * b - 3 * a * b + (1 / 5) * a', '(-7 / 15) * a - 4 * a * b'],
    ['2 * 3a + 6 * 5a', '36 * a'],
    ['3 * 4n - 2n * 7', '-2 * n'],
    ['5p * 3q - 2 * 4 * p * q', '7 * p * q'],
    ['3x * 5y + (1 / 2) * x * 4y', '17 * x * y'],
    ['4a * 5b - 4a * 6b', '-4 * a * b'],
    ['20 * x * y + 6x * (1 / 3) * y', '22 * x * y'],
    ['5 * 2b + 10 * 3b', '40 * b'],
    ['-5 * 2b + 3 * b', '-7 * b'],
    ['8 * -2b - 5 * 3b', '-31 * b'],
    ['5a * 2b - 2a * b', '8 * a * b'],
    ['5a * 3b - 2a * c', '15 * a * b - 2 * a * c'],
    ['-8a * 3 - 5 * -3a', '-9 * a'],
    ['3 * 2x + 4 * 2x', '14 * x'],
    ['5 * 3y - 8 * 2y', '-1 * y'],
    ['5x * 2y - 15x * y', '-5 * x * y'],
    ['3x * 2z - 5x * 2y', '6 * x * z - 10 * x * y'],
    ['-4 * 2x - 8 * 6', '-8 * x - 48'],
    ['-4 * 2x - 8x * -3', '16 * x'],
    ['2 * 3x + 5 * 2x', '16 * x'],
    ['2 + 3x + 5 + 2x', '5 * x + 7'],
    ['2 * 3x + 5 + 2x', '8 * x + 5'],
    ['-3 * 2x + 5x - 2x', '-3 * x'],
    ['-3 + 2x + 5 - 2x', '2'],
    ['-3 * 2x - 5 * 2x', '-16 * x'],
    ['3 * 4a + 5 * 2a', '22 * a'],
    ['-3a * 4b + 2a * -3b', '-18 * a * b'],
    ['-3a + 4b + 2a + 3b', '-1 * a + 7 * b'],
    ['-3a * 3b + 2a * 3b', '-3 * a * b'],
    ['-3a - 3b + 2a - 3b', '-1 * a - 6 * b'],
    ['-3a * -3b + 2a - 3b', '9 * a * b + 2 * a - 3 * b'],
    ['5x * 3y - 3x + 2y', '15 * x * y - 3 * x + 2 * y'],
    ['5 * 3y - 3x * -2y', '6 * x * y + 15 * y'],
    ['5x + 3y - 3x - 2y', '2 * x + y'],
    ['6a * -2b - 2b * -a + 5a * -2b', '-20 * a * b'],
    ['3a - 2b - 2b * -a + 5a * -2b', '3 * a - 8 * a * b + -2 * b'],
    ['3a - 2b - 2b - a + 5a - 2b', '7 * a - 6 * b']
])('simplifies the expression', (input: string, output: string) => {
    const result = casper().go(input)
    expect(result.result).toBe(output)
})

it.each([
    ['(a + b) * (c + d)', 'a * c + a * d + b * c + b * d'],
    [
        '(a + b + c) * (d + e) * (f + g + h)',
        'a * d * f + a * d * g + a * d * h + a * e * f + a * e * g + a * e * h + b * d * f + b * d * g + b * d * h + b * e * f + b * e * g + b * e * h + c * d * f + c * d * g + c * d * h + c * e * f + c * e * g + c * e * h'
    ],
    ['a * (b + c + d) * e', 'a * b * e + a * c * e + a * d * e']
])('can expand crazy brackets', (input: string, output: string) => {
    const result = casper().go(input)
    expect(result.result).toBe(output)
})

it.each([
    ['5(a + c)', '5 * a + 5 * c'],
    ['8(2a + b)', '16 * a + 8 * b'],
    ['a * (3b + c)', '3 * a * b + a * c'],
    ['x * (2y + 3)', '2 * x * y + 3 * x'],
    ['(3 / 2) * (4x + 2y)', '6 * x + 3 * y'],
    ['2p * (q + 1)', '2 * p * q + 2 * p'],
    ['6a * (3b + 1/2c)', '18 * a * b + 3 * a * c'],
    ['1/2p * (4q + 8s)', '2 * p * q + 4 * p * s'],
    ['5a * (2c + 3/2)', '10 * a * c + (15 / 2) * a'],
    ['1/3c * (3/4a + 6)', '(1 / 4) * a * c + 2 * c'],
    ['7 * a * b * (c + 3/14d)', '(3 / 2) * a * b * d + 7 * a * b * c'],
    ['2/3 * p * q * (3r + 3/2s)', '2 * p * q * r + p * q * s'],
    ['4(a + 3b) + 2a', '6 * a + 12 * b'],
    ['5(x + 2y) + 3y', '5 * x + 13 * y'],
    ['5(a + 2b) + 3(3a + b)', '14 * a + 13 * b'],
    ['4(2x + 5y) + 5(x + 5y)', '13 * x + 45 * y'],
    ['y = 8(x + 6)', 'y = 8 * x + 48'],
    ['T = 4(2a + 3)', 'T = 8 * a + 12'],
    ['y = 5(x + 1) + 3(2x + 6)', 'y = 11 * x + 23'],
    ['A = 5(2b + 3) + 3(4b + 2)', 'A = 22 * b + 21']
])('can expand brackets', (input: string, output: string) => {
    const result = casper().go(input)
    expect(result.result).toBe(output)
})
