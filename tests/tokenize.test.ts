import { Type } from '../src/interfaces'
import tokenize from './../src/tokenize'

it('can tokenize a single expression', () => {
    let input = '5'
    let result = tokenize(input)
    expect(result).toEqual([{ type: Type.Number, value: '5' }])
})

it('can tokenize a simple expression', () => {
    let input = '2 + 3'
    let result = tokenize(input)

    expect(result).toEqual([
        { type: Type.Number, value: '2' },
        { type: Type.Operator, value: '+' },
        { type: Type.Number, value: '3' }
    ])
})

it('can tokenize an expression with brackets', () => {
    let input = '(x + 3)'
    let result = tokenize(input)

    expect(result).toEqual([
        { type: Type.BracketOpen, value: '(' },
        { type: Type.Variable, value: 'x' },
        { type: Type.Operator, value: '+' },
        { type: Type.Number, value: '3' },
        { type: Type.BracketClose, value: ')' }
    ])
})

it('can tokenize a string with complex variable names', () => {
    let input = 'something_3 + IAMAVARIABLE'
    let result = tokenize(input)

    expect(result).toEqual([
        { type: Type.Variable, value: 'something_3' },
        { type: Type.Operator, value: '+' },
        { type: Type.Variable, value: 'IAMAVARIABLE' }
    ])
})

it('throws an error when the pattern cant be finished', () => {
    let input = '(x + @)'
    let result = () => tokenize(input)
    expect(result).toThrow('Syntax error: cannot parse "(x+@)".')
})

it('can tokenize functions', () => {
    let input = '3+sin(2*x)'
    let result = tokenize(input)

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
    let input = '0.5 + .54 - 4 - 0.45 - .2'
    let result = tokenize(input)

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
    let input = '2 ^ 3'
    let result = tokenize(input)

    expect(result).toEqual([
        { type: Type.Number, value: '2' },
        { type: Type.Operator, value: '^' },
        { type: Type.Number, value: '3' }
    ])
})

it('can tokenize divisions', () => {
    let input = '2 / 3'
    let result = tokenize(input)

    expect(result).toEqual([
        { type: Type.Number, value: '2' },
        { type: Type.Operator, value: '/' },
        { type: Type.Number, value: '3' }
    ])
})

it('can tokenize constants', () => {
    let input = 'e^(i*pi)'
    let result = tokenize(input)

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
    let input = '2 * epsilon'
    let result = tokenize(input)

    expect(result).toEqual([
        { type: Type.Number, value: '2' },
        { type: Type.Operator, value: '*' },
        { type: Type.Variable, value: 'epsilon' }
    ])
})

it('can tokenize commas', () => {
    let input = 'func(2, 3)'
    let result = tokenize(input)

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
    let input = '-12 - 9 - x'
    let result = tokenize(input)

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
    let input = '(38 - (3 + 2)) * 5'
    let result = tokenize(input)

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
