import Type from './Type'

export default class Node {
    type: Type
    value: string | number
    children: Node[]

    constructor(type: Type, value: string | number) {
        this.type = type
        this.value = value
        this.children = []
    }

    addChild(child: Node) {
        this.children.push(child)
        return child
    }
}
