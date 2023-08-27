import Node from './../src/Node'
import Type from './../src/Type'

it('can instantiate a new node', () => {
    let node = new Node(Type.Operator, '+')
    expect(node.type).toBe(Type.Operator)
    expect(node.value).toBe('+')
})
