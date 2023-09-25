import { Type } from '../src/interfaces'
import Node from '../src/node'

it('can instantiate a new node', () => {
    const node = new Node(Type.Operator, '+')
    expect(node.type).toBe(Type.Operator)
    expect(node.value).toBe('+')
})

test('numbers will be casted', () => {
    const node = new Node(Type.Number, '3')
    expect(node.value).not.toBe('3')
    expect(node.value).toBe(3)
})

it('has zero children', () => {
    const node = new Node(Type.Operator, '+')
    expect(node.children).toEqual([])
})

it('has no parent', () => {
    const node = new Node(Type.Operator, '+')
    expect(node.parent).toBeNull()
})

it('can set a parent', () => {
    const parent = new Node(Type.Operator, '+')
    const child = new Node(Type.Number, 3)
    expect(child.parent).toBeNull()
    child.setParent(parent)
    expect(child.parent).toBe(parent)
    child.setParent(null)
    expect(child.parent).toBeNull()
})

it('can add a child', () => {
    const parent = new Node(Type.Operator, '+')
    const child = new Node(Type.Operator, 3)
    expect(parent.addChild(child)).toBe(child)
    expect(parent.children).toEqual([child])
    expect(parent.children[0]).toBe(child)
    expect(child.parent).toBe(parent)
})

it('can convert a node to a string', () => {
    const parent = new Node(Type.Operator, '+')
    const times = parent.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Variable, 'y'))
    times.addChild(new Node(Type.Number, 2))
    parent.addChild(new Node(Type.Variable, 'x'))
    parent.addChild(new Node(Type.Number, 3))
    const division = parent.addChild(new Node(Type.Operator, '/'))
    division.addChild(new Node(Type.Number, 4))
    division.addChild(new Node(Type.Variable, 'z'))

    const result = parent.toString()
    expect(result).toBe(
        '+ [null]\r\n├─ * [+]\r\n│  ├─ y [*]\r\n│  └─ 2 [*]\r\n├─ x [+]\r\n├─ 3 [+]\r\n└─ / [+]\r\n   ├─ 4 [/]\r\n   └─ z [/]'
    )
})

it('can find its root', () => {
    const root = new Node(Type.Operator, '+')
    const parent = root.addChild(new Node(Type.Operator, '*'))
    const child = parent.addChild(new Node(Type.Number, 3))

    expect(root.root()).toBe(root)
    expect(parent.root()).toBe(root)
    expect(child.root()).toBe(root)
})

it('can replace a child', () => {
    const parent = new Node(Type.Operator, '+')
    const child1 = parent.addChild(new Node(Type.Number, 1))
    const child2 = parent.addChild(new Node(Type.Number, 2))
    const child3 = new Node(Type.Number, 3)

    expect(parent.children).toEqual([child1, child2])
    expect(child1.parent).toBe(parent)
    expect(child2.parent).toBe(parent)
    expect(child3.parent).toBeNull()

    parent.replaceChild(child2, child3)

    expect(parent.children).toEqual([child1, child3])
    expect(child1.parent).toBe(parent)
    expect(child2.parent).toBeNull()
    expect(child3.parent).toBe(parent)
})

it('can insert a node between two nodes', () => {
    const node = new Node(Type.Operator, '*')
    const parent = new Node(Type.Operator, '+')
    const child = parent.addChild(new Node(Type.Number, 3))

    expect(node.parent).toBeNull()
    expect(node.children).toEqual([])
    expect(parent.parent).toBeNull()
    expect(parent.children).toEqual([child])
    expect(parent.children[0]).toBe(child)
    expect(child.parent).toBe(parent)
    expect(child.children).toEqual([])

    node.insertBetween(parent, child)

    expect(node.parent).toBe(parent)
    expect(node.children).toEqual([child])
    expect(node.children[0]).toBe(child)
    expect(parent.parent).toBeNull()
    expect(parent.children).toEqual([node])
    expect(parent.children[0]).toBe(node)
    expect(child.parent).toBe(node)
    expect(child.children).toEqual([])
})

it('can set its children', () => {
    const parent = new Node(Type.Operator, '+')
    const child1 = parent.addChild(new Node(Type.Number, 2))
    const child2 = new Node(Type.Number, 3)

    expect(parent.children).toEqual([child1])
    parent.setChildren([child2])
    expect(parent.children).toEqual([child2])
})

it('can clone a node and its children', () => {
    const parent = new Node(Type.Operator, '+')
    const times = parent.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 2))
    times.addChild(new Node(Type.Number, 3))
    parent.addChild(new Node(Type.Number, 4))

    const clone = parent.clone()

    expect(parent).not.toBe(clone)
    expect(parent).toEqual(clone)
})

it('knows if it equals another node', () => {
    const parent = new Node(Type.Operator, '+')
    const times = parent.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 2))
    times.addChild(new Node(Type.Number, 3))
    parent.addChild(new Node(Type.Number, 4))

    const clone = parent.clone()
    const notClone = new Node(Type.Operator, '+')

    expect(parent.equals(parent)).toBeTruthy()
    expect(parent.equals(clone)).toBeTruthy()
    expect(parent.equals(notClone)).toBeFalsy()
    expect(clone.equals(parent)).toBeTruthy()
    expect(clone.equals(clone)).toBeTruthy()
    expect(clone.equals(notClone)).toBeFalsy()
    expect(notClone.equals(parent)).toBeFalsy()
    expect(notClone.equals(clone)).toBeFalsy()
    expect(notClone.equals(notClone)).toBeTruthy()
})

it('knows if it contains a type', () => {
    const root = new Node(Type.Operator, '+')
    root.addChild(new Node(Type.Number, 3))
    root.addChild(new Node(Type.Variable, 'x'))
    const times = root.addChild(new Node(Type.Operator, '*'))
    times.addChild(new Node(Type.Number, 6))

    expect(root.containsType(Type.BracketClose)).toBeFalsy()
    expect(root.containsType(Type.BracketOpen)).toBeFalsy()
    expect(root.containsType(Type.Comma)).toBeFalsy()
    expect(root.containsType(Type.Constant)).toBeFalsy()
    expect(root.containsType(Type.Function)).toBeFalsy()
    expect(root.containsType(Type.Number)).toBeTruthy()
    expect(root.containsType(Type.Operator)).toBeTruthy()
    expect(root.containsType(Type.Variable)).toBeTruthy()
})

it('can remove a child', () => {
    const parent = new Node(Type.Operator, '+')
    const child1 = parent.addChild(new Node(Type.Number, 3))
    const child2 = parent.addChild(new Node(Type.Number, 4))

    expect(parent.children[0]).toBe(child1)
    expect(parent.children[1]).toBe(child2)

    // Does nothing, even if node is equal (but not the same)
    parent.removeChild(new Node(Type.Number, 3))

    expect(parent.children[0]).toBe(child1)
    expect(parent.children[1]).toBe(child2)

    parent.removeChild(child1)

    expect(parent.children[0]).toBe(child2)
    expect(parent.children.includes(child1)).toBeFalsy()
})
