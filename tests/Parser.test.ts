import Node from './../src/Node'
import Parser from './../src/Parser'
import Tokenizer from './../src/Tokenizer'
import Type from './../src/Type'

test('it can parse an expressin with one operator', () => {
    let input = new Tokenizer().tokenize('2 + 3')
    let result = new Parser().parse(input)

    let root = new Node(Type.Operator, '+')
    root.addChild(new Node(Type.Number, 2))
    root.addChild(new Node(Type.Number, 3))

    expect(result).toEqual(root)
})

it('can parse an expression with two operators #1', () => {
    let input = new Tokenizer().tokenize('2 + 3 * 4')
    let result = new Parser().parse(input)

    let root = new Node(Type.Operator, '+')
    root.addChild(new Node(Type.Number, 2))
    let times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 3))
    times.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it('can parse an expression with two operators #2', () => {
    let input = new Tokenizer().tokenize('2 * 3 + 4')
    let result = new Parser().parse(input)

    let root = new Node(Type.Operator, '+')
    let times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 2))
    times.addChild(new Node(Type.Number, 3))
    root.addChild(new Node(Type.Number, 4))

    expect(result).toEqual(root)
})

it.skip('can parse an expression with three operators #1', () => {
    let input = new Tokenizer().tokenize('2 + 3 * 4 ^ 5')
})

it.skip('can parse an expression with three operators #2', () => {
    let input = new Tokenizer().tokenize('2 + 3 ^ 4 * 5')
})

it.skip('can parse an expression with three operators #3', () => {
    let input = new Tokenizer().tokenize('2 * 3 + 4 ^ 5')
})

it.skip('can parse an expression with three operators #4', () => {
    let input = new Tokenizer().tokenize('2 * 3 ^ 4 + 5')
})

it.skip('can parse an expression with three operators #5', () => {
    let input = new Tokenizer().tokenize('2 ^ 3 + 4 * 5')
})

it.skip('can parse an expression with three operators #6', () => {
    let input = new Tokenizer().tokenize('2 ^ 3 * 4 + 5')
})
