import casper from './../src/index'

it('can interact with the casper function', () => {
    let result = casper().go('3 * (2 + 4)')
    expect(result).toBe('3 * 6')
})
