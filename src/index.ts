import config, { getConfig } from './config'
import execute from './execute'
import { Options, Result } from './interfaces'
import { deleteLogs, getLogs } from './logger'
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

    options(options: Options) {
        getConfig().options = { ...config(), ...options }
        return this
    }

    go(expression: string): Result {
        deleteLogs()

        let tree = parse(expression)
        let old

        while (!old?.equals(tree)) {
            old = tree.clone()

            config().actions.forEach(action => {
                tree = execute(action, tree)
            })
        }

        let result = config().output === 'string' ? string(tree) : latex(tree)

        return { result: result, steps: getLogs() }
    }
}
