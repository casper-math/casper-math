import Node from './../src/Node'
import Type from './../src/Type'

it('can instantiate a new node', () => {
    let node = new Node(Type.Operator, '+')
    expect(node.type).toBe(Type.Operator)
    expect(node.value).toBe('+')
})

test('numbers will be casted', () => {
    let node = new Node(Type.Number, '3')
    expect(node.value).not.toBe('3')
    expect(node.value).toBe(3)
})

it('has zero children', () => {
    let node = new Node(Type.Operator, '+')
    expect(node.children).toEqual([])
})

it('has no parent', () => {
    let node = new Node(Type.Operator, '+')
    expect(node.parent).toBeNull()
})

it('can set a parent', () => {
    let parent = new Node(Type.Operator, '+')
    let child = new Node(Type.Number, 3)
    expect(child.parent).toBeNull()
    child.setParent(parent)
    expect(child.parent).toBe(parent)
    child.setParent(null)
    expect(child.parent).toBeNull()
})

it('can add a child', () => {
    let parent = new Node(Type.Operator, '+')
    let child = new Node(Type.Operator, 3)
    expect(parent.addChild(child)).toBe(child)
    expect(parent.children).toEqual([child])
    expect(parent.children[0]).toBe(child)
    expect(child.parent).toBe(parent)
})

it('can convert a node to a string', () => {
    let parent = new Node(Type.Operator, '+')
    parent.addChild(new Node(Type.Variable, 'x'))
    parent.addChild(new Node(Type.Number, 3))

    let result = parent.toString()
    expect(result).toBe('+\n  x\n  3\n')
})

it('can find its root', () => {
    let root = new Node(Type.Operator, '+')
    let parent = root.addChild(new Node(Type.Operator, '*'))
    let child = parent.addChild(new Node(Type.Number, 3))

    expect(root.root()).toBe(root)
    expect(parent.root()).toBe(root)
    expect(child.root()).toBe(root)
})
