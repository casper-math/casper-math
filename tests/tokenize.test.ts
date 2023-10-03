import { Type } from '../src/interfaces'
import tokenize from './../src/tokenize'

it('can tokenize a single expression', () => {
    const input = '5'
    const result = tokenize(input)
    expect(result).toEqual([{ type: Type.Number, value: '5' }])
})

it('can tokenize a simple expression', () => {
    const input = '2 + 3'
    const result = tokenize(input)

    expect(result).toEqual([
        { type: Type.Number, value: '2' },
        { type: Type.Operator, value: '+' },
        { type: Type.Number, value: '3' }
    ])
})

it('can tokenize an expression with brackets', () => {
    const input = '(x + 3)'
    const result = tokenize(input)

    expect(result).toEqual([
        { type: Type.BracketOpen, value: '(' },
        { type: Type.Variable, value: 'x' },
        { type: Type.Operator, value: '+' },
        { type: Type.Number, value: '3' },
        { type: Type.BracketClose, value: ')' }
    ])
})

it('can tokenize a string with complex variable names', () => {
    const input = 'something_3 + IAMAVARIABLE'
    const result = tokenize(input)

    expect(result).toEqual([
        { type: Type.Variable, value: 'something_3' },
        { type: Type.Operator, value: '+' },
        { type: Type.Variable, value: 'IAMAVARIABLE' }
    ])
})

it('throws an error when the pattern cant be finished', () => {
    const input = '(x + @)'
    const result = () => tokenize(input)
    expect(result).toThrow('Syntax error: cannot parse "(x+@)".')
})

it('can tokenize functions', () => {
    const input = '3+sin(2*x)'
    const result = tokenize(input)

    expect(result).toEqual([
        { type: Type.Number, value: '3' },
        { type: Type.Operator, value: '+' },
        { type: Type.Function, value: 'sin' },
        { type: Type.BracketOpen, value: '(' },
        { type: Type.Number, value: '2' },
        { type: Type.Operator, value: '*' },
        { type: Type.Variable, value: 'x' },
        { type: Type.BracketClose, value: ')' }
    ])
})

it('can tokenize different number formats', () => {
    const input = '0.5 + .54 - 4 - 0.45 - .2'
    const result = tokenize(input)

    expect(result).toEqual([
        { type: Type.Number, value: '0.5' },
        { type: Type.Operator, value: '+' },
        { type: Type.Number, value: '.54' },
        { type: Type.Operator, value: '+' },
        { type: Type.Number, value: '-4' },
        { type: Type.Operator, value: '+' },
        { type: Type.Number, value: '-0.45' },
        { type: Type.Operator, value: '+' },
        { type: Type.Number, value: '-.2' }
    ])
})

it('can tokenize powers', () => {
    const input = '2 ^ 3'
    const result = tokenize(input)

    expect(result).toEqual([
        { type: Type.Number, value: '2' },
        { type: Type.Operator, value: '^' },
        { type: Type.Number, value: '3' }
    ])
})

it('can tokenize divisions', () => {
    const input = '2 / 3'
    const result = tokenize(input)

    expect(result).toEqual([
        { type: Type.Number, value: '2' },
        { type: Type.Operator, value: '/' },
        { type: Type.Number, value: '3' }
    ])
})

it('can tokenize constants', () => {
    const input = 'e^(i*pi)'
    const result = tokenize(input)

    expect(result).toEqual([
        { type: Type.Constant, value: 'e' },
        { type: Type.Operator, value: '^' },
        { type: Type.BracketOpen, value: '(' },
        { type: Type.Constant, value: 'i' },
        { type: Type.Operator, value: '*' },
        { type: Type.Constant, value: 'pi' },
        { type: Type.BracketClose, value: ')' }
    ])
})

it('can tokenize variables with longer names', () => {
    const input = '2 * epsilon'
    const result = tokenize(input)

    expect(result).toEqual([
        { type: Type.Number, value: '2' },
        { type: Type.Operator, value: '*' },
        { type: Type.Variable, value: 'epsilon' }
    ])
})

it('can tokenize commas', () => {
    const input = 'func(2, 3)'
    const result = tokenize(input)

    expect(result).toEqual([
        { type: Type.Function, value: 'func' },
        { type: Type.BracketOpen, value: '(' },
        { type: Type.Number, value: '2' },
        { type: Type.Comma, value: ',' },
        { type: Type.Number, value: '3' },
        { type: Type.BracketClose, value: ')' }
    ])
})

it('can tokenize subtraction', () => {
    const input = '-12 - 9 - x'
    const result = tokenize(input)

    expect(result).toEqual([
        { type: Type.Number, value: '-12' },
        { type: Type.Operator, value: '+' },
        { type: Type.Number, value: '-9' },
        { type: Type.Operator, value: '+' },
        { type: Type.Number, value: '-1' },
        { type: Type.Operator, value: '*' },
        { type: Type.Variable, value: 'x' }
    ])
})

it('can tokenize nested brackets', () => {
    const input = '(38 - (3 + 2)) * 5'
    const result = tokenize(input)

    expect(result).toEqual([
        { type: Type.BracketOpen, value: '(' },
        { type: Type.Number, value: '38' },
        { type: Type.Operator, value: '+' },
        { type: Type.Number, value: '-1' },
        { type: Type.Operator, value: '*' },
        { type: Type.BracketOpen, value: '(' },
        { type: Type.Number, value: '3' },
        { type: Type.Operator, value: '+' },
        { type: Type.Number, value: '2' },
        { type: Type.BracketClose, value: ')' },
        { type: Type.BracketClose, value: ')' },
        { type: Type.Operator, value: '*' },
        { type: Type.Number, value: '5' }
    ])
})

it('can tokenize implicit multiplication', () => {
    const input = '2xy + 3sin(x)'
    const result = tokenize(input)

    expect(result).toEqual([
        { type: Type.Number, value: '2' },
        { type: Type.Operator, value: '*' },
        { type: Type.Variable, value: 'xy' },
        { type: Type.Operator, value: '+' },
        { type: Type.Number, value: '3' },
        { type: Type.Operator, value: '*' },
        { type: Type.Function, value: 'sin' },
        { type: Type.BracketOpen, value: '(' },
        { type: Type.Variable, value: 'x' },
        { type: Type.BracketClose, value: ')' }
    ])
})

it('can tokenize subtraction after brackets', () => {
    const input = '(x + 3) - 5'
    const result = tokenize(input)

    expect(result).toEqual([
        { type: Type.BracketOpen, value: '(' },
        { type: Type.Variable, value: 'x' },
        { type: Type.Operator, value: '+' },
        { type: Type.Number, value: '3' },
        { type: Type.BracketClose, value: ')' },
        { type: Type.Operator, value: '+' },
        { type: Type.Number, value: '-5' }
    ])
})

it('can tokenize squares and subtraction', () => {
    const input = '5^2 - 4^2'
    const result = tokenize(input)

    expect(result).toEqual([
        { type: Type.Number, value: '5' },
        { type: Type.Operator, value: '^' },
        { type: Type.Number, value: '2' },
        { type: Type.Operator, value: '+' },
        { type: Type.Number, value: '-1' },
        { type: Type.Operator, value: '*' },
        { type: Type.Number, value: '4' },
        { type: Type.Operator, value: '^' },
        { type: Type.Number, value: '2' }
    ])
})
