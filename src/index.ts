import config, { getConfig } from './config'
import execute from './execute'
import { OptionalOptions } from './interfaces'
import latex from './output/latex'
import string from './output/string'
import parse from './parse'

export default function casper() {
    return new Casper()
}

class Casper {
    constructor() {
        getConfig().reset()
    }

    options(options: OptionalOptions) {
        getConfig().options = { ...config(), ...options }
        return this
    }

    go(expression: string) {
        let tree = parse(expression)
        let old

        while (!old?.equals(tree)) {
            old = tree.clone()

            config().actions.forEach(action => {
                tree = execute(action, tree)
            })
        }

        return config().output === 'string' ? string(tree) : latex(tree)
    }
}
