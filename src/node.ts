import Type from './type'
const asciitree = require('ascii-tree')

export default class Node {
    type: Type
    value: string | number
    children: Node[]
    parent: Node | null

    constructor(type: Type, value: string | number) {
        this.type = type
        this.value = type === Type.Number ? Number(value) : value
        this.children = []
        this.parent = null
    }

    setParent(parent: Node | null) {
        this.parent = parent
    }

    addChild(child: Node) {
        this.children.push(child)

        child.setParent(this)

        return child
    }

    replaceChild(search: Node, replace: Node) {
        let index = this.children.indexOf(search)
        this.children[index] = replace

        search.setParent(null)
        replace.setParent(this)
    }

    toString(indent: number = 1) {
        let string =
            '#'.repeat(indent) +
            this.value.toString() +
            (this.parent ? ` [${this.parent.value.toString()}]` : ' [null]') +
            '\r\n'

        this.children.forEach(child => (string += child.toString(indent + 1)))

        return indent === 1 ? asciitree.generate(string) : string
    }

    root(): Node {
        return this.parent === null ? this : this.parent.root()
    }

    insertBetween(parent: Node, child: Node) {
        parent.replaceChild(child, this)

        this.addChild(child)
    }

    setChildren(children: Node[]) {
        this.children = children
    }

    clone(): Node {
        let node = new Node(this.type, this.value)

        this.children.forEach(child => node.addChild(child.clone()))

        return node
    }

    equals(node: Node): boolean {
        if (!node) return false

        if (this.type !== node.type || this.value !== node.value) return false

        return (
            !this.children.map((child, index) => child.equals(node.children[index])).includes(false) &&
            !node.children.map((child, index) => child.equals(this.children[index])).includes(false)
        )
    }
}
