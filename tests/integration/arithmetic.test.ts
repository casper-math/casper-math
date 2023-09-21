import casper from './../../src/index'

it.each([
    ['53 + 8', '61'],
    ['173 + 6', '179'],
    ['800 + 35', '835']
])('can do arithmetic', (input, output) => {
    let result = casper().go(input)
    expect(result).toBe(output)
})
