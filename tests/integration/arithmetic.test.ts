import casper from './../../src/index'

it.each([
    ['53 + 8', '61'],
    ['173 + 6', '179'],
    ['800 + 35', '835'],
    ['12 - 9', '3'],
    ['83 - 7', '76'],
    ['500 - 17', '483'],
    ['64 + 89 + 36', '189'],
    ['17 + 58 + 183', '258'],
    ['600 + 800', '1400'],
    ['5 + 7', '12'],
    ['500 + 700', '1200'],
    ['5000 + 70', '5070'],
    ['23 - 7', '16'],
    ['2300 - 700', '1600'],
    ['2300 - 70', '2230'],
    ['2300 + 700', '3000'],
    ['7500 - 3200', '4300'],
    ['8000 - 111', '7889'],
    ['7 * 4', '28'],
    ['3 * 8', '24'],
    ['5 * 3', '15'],
    ['8 * 4', '32'],
    ['80 * 40', '3200'],
    ['800 * 40', '32000'],
    ['9 * 4', '36'],
    ['700 * 30', '21000'],
    ['400 * 9000', '3600000'],
    ['56 / 8', '7'],
    ['28 / 7', '4'],
    ['24 / 3', '8'],
    ['640 / 8', '80'],
    ['1800 / 600', '3'],
    ['3600 / 60', '60'],
    ['1800 / 90', '20'],
    ['54000 / 60', '900'],
    ['6900 / 3', '2300']
])('can do arithmetic', (input: string, output: string) => {
    let result = casper().go(input)
    expect(result.result).toBe(output)
})

it.each([
    ['(9 + 6) * 5', '75'],
    ['9 * 6 + 5', '59'],
    ['9 * (6 + 5)', '99'],
    ['8 + 3 * 7 + 2', '31'],
    ['8 + 3 * (7 + 2)', '35'],
    ['(8 + 3) * (7 + 2)', '99'],
    ['20 - 2 * (8 - 4)', '12'],
    ['20 - 2 * 8 + 4', '8'],
    ['(20 - 2) * 8 + 4', '148'],
    ['38 - (3 + 2) * 5', '13'],
    ['(38 - 3) + 2 * 5', '45'],
    ['(38 - (3 + 2)) * 5', '165'],
    ['8 + 7 * 6 - 3', '47'],
    ['32 - (25 - 17) / 4', '30'],
    ['32 - (300 - 50 * 2) + 450', '282'],
    ['420 / 4 - (125 - 117) * 4 + 48 / 12 - 4', '73'],
    ['48 / (8 - 4) * 4 + 48 / (12 - 4)', '54'],
    ['(9 * 6 - 18 - 8 * 3) / 6 + 5 * 3', '17'],
    ['(9 * 6 - (18 - 8) * 3) / 6 + 5 * 3', '19']
])('respects the order of operations', (input: string, output: string) => {
    let result = casper().go(input)
    expect(result.result).toBe(output)
})

it.each([
    ['15 / 25', '3 / 5'],
    ['15 / 27', '5 / 9'],
    ['18 / 36', '1 / 2'],
    ['28 / 35', '4 / 5'],
    ['20 / 100', '1 / 5'],
    ['56 / 40', '7 / 5'],
    ['35 / 90', '7 / 18'],
    ['60 / 12', '5'],
    ['32 / 32', '1'],
    ['24 / 42', '4 / 7'],
    ['27 / 15', '9 / 5'],
    ['32 / 12', '8 / 3'],
    ['1 / 2 + 1 / 3', '5 / 6'],
    ['1 / 2 + 1 / 4', '3 / 4'],
    ['3 / 4 - 1 / 3', '5 / 12'],
    ['(1 + 1 / 2) - 1 / 4', '5 / 4']
])('can do arithmetic with fractions', (input: string, output: string) => {
    let result = casper().go(input)
    expect(result.result).toBe(output)
})
