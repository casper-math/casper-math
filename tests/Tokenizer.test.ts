import Tokenizer from './../src/Tokenizer'
import Type from './../src/Type'

it('can tokenize a string', () => {
    let input = '(x + 3)'
    let result = new Tokenizer().tokenize(input)

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
    let result = new Tokenizer().tokenize(input)

    expect(result).toEqual([
        { type: Type.Variable, value: 'something_3' },
        { type: Type.Operator, value: '+' },
        { type: Type.Variable, value: 'IAMAVARIABLE' }
    ])
})

it('throws an error when the pattern cant be finished', () => {
    let input = '(x + @)'
    let result = () => new Tokenizer().tokenize(input)
    expect(result).toThrow('Syntax error: cannot parse "(x+@)".')
})

it('can tokenize functions', () => {
    let input = '3+sin(2*x)'
    let result = new Tokenizer().tokenize(input)

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
