import config, { getConfig } from './config'
import execute from './execute'
import { Options, Result, Step } from './interfaces'
import { clearLogs, clearTemporarySteps, getLogs, setResult } from './logger'
import Node from './node'
import latex from './output/latex'
import string from './output/string'
import parse from './parse'
import sort from './sort'

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
        clearLogs()

        let tree = parse(expression)
        let old: Node | undefined
        let newRun = true

        while (newRun) {
            newRun = false
            old = tree.clone()

            config().actions.forEach(action => {
                if (newRun) {
                    return
                }

                tree = execute(action, tree)
                tree = sort(tree)

                if (!old?.equals(tree)) {
                    newRun = true
                    setResult(string(tree))
                } else {
                    clearTemporarySteps()
                }
            })
        }

        const result = config().output === 'string' ? string(tree) : latex(tree)

        if (config().output === 'latex') {
            var steps: Step[] = getLogs().map(step => ({
                name: step.name,
                search: latex(parse(step.search)),
                replace: latex(parse(step.replace)),
                result: latex(parse(step.result))
            }))
        } else {
            var steps: Step[] = getLogs().map(step => ({
                name: step.name,
                search: step.search,
                replace: step.replace,
                result: step.result
            }))
        }

        return { result, steps }
    }
}
