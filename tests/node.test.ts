import Node from './../src/Node'
import Type from './../src/Type'

it('can instantiate a new node', () => {
    let node = new Node(Type.Operator, '+')
    expect(node.type).toBe(Type.Operator)
    expect(node.value).toBe('+')
})

it('has zero children', () => {
    let node = new Node(Type.Operator, '+')
    expect(node.children).toEqual([])
})

it('can add a child', () => {
    let parent = new Node(Type.Operator, '+')
    let child = new Node(Type.Operator, 3)
    expect(parent.addChild(child)).toBe(child)
    expect(parent.children).toEqual([child])
    expect(parent.children[0]).toBe(child)
})
