import config from '../config'
import { Type } from '../interfaces'
import Node from './../node'

export default function latex(node: Node): string {
    if (node.type === Type.Function) {
        return `\\text{${value(node)}}(${node.children.map(child => latex(child)).join(', ')})`
    }

    if (node.type !== Type.Operator) {
        return value(node)
    }

    if (node.value === '/') {
        const numerator = latex(node.children[0])
        const denominator = latex(node.children[1])

        return `\\frac{${numerator}}{${denominator}}`
    }

    if (node.value === '^') {
        const base = latex(node.children[0])
        const exponent = latex(node.children[1])

        return shouldInsertBrackets(node, node.children[0])
            ? `{(${base})} ^ {${exponent}}`
            : `{${base}} ^ {${exponent}}`
    }

    return node.children
        .map(child => (shouldInsertBrackets(node, child) ? `(${latex(child)})` : latex(child)))
        .join(` ${value(node)} `)
        .replace(/-1 \\cdot /g, '-')
        .replace(/\+ -/g, '- ')
}

function shouldInsertBrackets(parent: Node, child: Node): boolean {
    if (parent.value === '^' && child.type === Type.Number && Number(child.value) < 0) {
        return true
    }

    if (child.type !== Type.Operator) {
        return false
    }

    const parentPrecedence = config().operators.filter(operator => operator.symbol === parent.value)[0].precedence

    const childPrecedence = config().operators.filter(operator => operator.symbol === child.value)[0].precedence

    return parentPrecedence >= childPrecedence
}

function value(node: Node): string {
    const mappings: { [key: string]: string } = {
        '*': '\\cdot',
        alpha: '\\alpha',
        beta: '\\beta',
        gamma: '\\gamma',
        delta: '\\delta',
        epsilon: '\\epsion',
        zeta: '\\zeta',
        eta: '\\eta',
        theta: '\\theta',
        iota: '\\iota',
        kappa: '\\kappa',
        lambda: '\\lambda',
        mu: '\\mu',
        nu: '\\nu',
        xi: '\\xi',
        omicron: '\\omicron',
        pi: '\\pi',
        rho: '\\rho',
        sigma: '\\sigma',
        tau: '\\tau',
        upsilon: '\\upsilon',
        phi: '\\phi',
        chi: '\\chi',
        psi: '\\psi',
        omega: '\\omega'
    }

    if (Object.keys(mappings).includes(node.value.toString())) {
        return mappings[node.value]
    }

    return node.value.toString()
}
