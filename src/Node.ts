import Type from './Type'

export default class Node {
    type: Type
    value: string

    constructor(type: Type, value: string) {
        this.type = type
        this.value = value
    }
}
