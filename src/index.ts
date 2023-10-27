import config, { getConfig } from './config'
import execute from './execute'
import { Options, Result } from './interfaces'
import { clearLogs, clearTemporarySteps, getLogs } from './logger'
import Node from './node'
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

                if (!old?.equals(tree)) {
                    newRun = true
                    clearTemporarySteps(string(tree))
                }
            })
        }

        const result = config().output === 'string' ? string(tree) : latex(tree)

        if (config().output === 'latex') {
            var steps = getLogs().map(step => ({
                name: step.name,
                search: latex(parse(step.search)),
                replace: latex(parse(step.replace)),
                description: this.description(step.description, true),
                result: latex(parse(step.result))
            }))
        } else {
            var steps = getLogs().map(step => ({
                name: step.name,
                search: step.search,
                replace: step.replace,
                description: this.description(step.description, false),
                result: step.result
            }))
        }

        return { result, steps }
    }

    private description(description: string, useLatex: boolean): string {
        if (!useLatex) {
            return description.replace(/\$ ?([^$ ]?[^$]*[^$ ]) ?\$/g, '$1').replace(/ {2,}/g, ' ')
        }

        const matches = description.match(/\$[^$]+\$/g)

        matches?.forEach(match => {
            description = description.replace(match, '$ ' + latex(parse(match.slice(1, -1))) + ' $')
        })

        return description
    }
}
