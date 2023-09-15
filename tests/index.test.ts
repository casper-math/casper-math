import casper from './../src/index'

it('can interact with the casper function', () => {
    let result = casper().go('3 * (2 + 4)')
    expect(result).toBe('18')
})

it('can select the actions to run', () => {
    let result = casper().actions([]).go('(3 + 5) * 4')
    expect(result).toBe('(3 + 5) * 4')
})

it('can get latex output', () => {
    let result = casper().options({ output: 'latex' }).actions([]).go('x * y ^ z')
    expect(result).toBe('x \\cdot {y} ^ {z}')
})
