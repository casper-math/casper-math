import config from './config'
import execute from './execute'
import { Action, Options } from './interfaces'
import latex from './output/latex'
import string from './output/string'
import parse from './parse'

export default function casper() {
    return new Casper()
}

class Casper {
    options(options: Options) {
        config().options = { ...config().options, ...options }
        return this
    }

    actions(actions: Action[]) {
        config().actions = actions
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

        return config().options.output === 'string' ? string(tree) : latex(tree)
    }
}
