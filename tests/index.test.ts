import casper from './../src/index'

it('can interact with the casper function', () => {
    let result = casper().go('3 * (2 + 4)')

    expect(result).toEqual({
        result: '18',
        steps: [
            { name: 'add numbers', search: '2 + 4', replace: '6', result: '3 * 6' },
            { name: 'multiply numbers', search: '3 * 6', replace: '18', result: '18' }
        ]
    })
})

it('can select the actions to run', () => {
    let result = casper().options({ actions: [] }).go('(3 + 5) * 4')

    expect(result).toEqual({
        result: '(3 + 5) * 4',
        steps: []
    })
})

it('can run with different configurations', () => {
    let result1 = casper().options({ actions: [] }).go('(3 + 5) * 4')
    expect(result1.result).toBe('(3 + 5) * 4')

    let result2 = casper().go('(3 + 5) * 4')
    expect(result2.result).toBe('32')
})

it('can get latex output', () => {
    let result = casper().options({ output: 'latex', actions: [] }).go('x * y ^ z')
    expect(result.result).toBe('x \\cdot {y} ^ {z}')
})
