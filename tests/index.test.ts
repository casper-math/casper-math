import casper from './../src/index'

it('can interact with the casper function', () => {
    const result = casper().go('3 * (2 + 4)')

    expect(result).toEqual({
        result: '18',
        steps: [
            {
                name: 'add numbers',
                search: '2 + 4',
                replace: '6',
                result: '3 * 6'
            },
            {
                name: 'multiply numbers',
                search: '3 * 6',
                replace: '18',
                result: '18'
            }
        ]
    })
})

it('can select the actions to run', () => {
    const result = casper().options({ actions: [] }).go('(3 + 5) * 4')

    expect(result).toEqual({
        result: '(3 + 5) * 4',
        steps: []
    })
})

it('can run with different configurations', () => {
    const result1 = casper().options({ actions: [] }).go('(3 + 5) * 4')
    expect(result1.result).toBe('(3 + 5) * 4')

    const result2 = casper().go('(3 + 5) * 4')
    expect(result2.result).toBe('32')
})

it('can get latex output', () => {
    const result = casper().options({ output: 'latex' }).go('2 * 3 ^ 4')
    expect(result).toEqual({
        result: '162',
        steps: [
            {
                name: 'compute powers',
                search: '{3} ^ {4}',
                replace: '81',
                result: '2 \\cdot 81'
            },
            {
                name: 'multiply numbers',
                search: '2 \\cdot 81',
                replace: '162',
                result: '162'
            }
        ]
    })
})
