import multiplyNumbers from '../../src/actions/multiply-numbers'
import execute from './../../src/execute'
import parse from './../../src/parse'

it('adds numbers at the root', () => {
    let tree = parse('2 * 5')
    let result = execute(multiplyNumbers, tree)
    expect(result).toEqual(parse('10'))
})

it('adds numbers when nested', () => {
    let tree = parse('3 + 2 * 4')
    let result = execute(multiplyNumbers, tree)
    expect(result).toEqual(parse('3 + 8'))
})
