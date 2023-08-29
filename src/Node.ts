import Type from './Type'

export default class Node {
    type: Type
    value: string | number
    children: Node[]
    parent: Node | null

    constructor(type: Type, value: string | number) {
        this.type = type
        this.value = value
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

    toString(indent: number = 0) {
        let string = ' '.repeat(indent) + this.value.toString() + '\n'

        this.children.forEach(child => (string = string + child.toString(indent + 2)))

        return string
    }
}
