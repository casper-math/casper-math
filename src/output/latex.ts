import config from './../config'
import { Type } from './../interfaces'
import Node from './../node'

export default function latex(node: Node): string {
    if (node.type === Type.Function) {
        return `\\text{${value(node)}}(${node.children.map(child => latex(child)).join(', ')})`
    }

    if (node.type !== Type.Operator) {
        return value(node)
    }

    if (node.value === '+') {
        return brackets(
            node.children
                .map(child => latex(child))
                .join(' + ')
                .replace('+ -1 \\cdot', '-')
                .replace('+ -', '- '),
            node
        )
    }

    if (node.value === '*') {
        return brackets(node.children.map(child => latex(child)).join(' \\cdot '), node)
    }

    if (node.value === '/') {
        return `\\frac{${latex(node.children[0])}}{${latex(node.children[1])}}`
    }

    if (node.value === '^') {
        return `{${latex(node.children[0])}} ^ {${latex(node.children[1])}}`
    }

    return brackets(node.children.map(child => latex(child)).join(` ${value(node)} `), node)
}

function brackets(string: string, node: Node): string {
    let parentPrecedence = config().operators.filter(operator => operator.symbol === node.parent?.value)[0]?.precedence
    let childPrecedence = config().operators.filter(operator => operator.symbol === node.value)[0]?.precedence

    if (node.parent?.value === '^') {
        return string
    }

    return parentPrecedence >= childPrecedence ? `(${string})` : string
}

function value(node: Node): string {
    const greekLetters = [
        'alpha',
        'beta',
        'gamma',
        'delta',
        'epsilon',
        'zeta',
        'eta',
        'theta',
        'iota',
        'kappa',
        'lambda',
        'mu',
        'nu',
        'xi',
        'omicron',
        'pi',
        'rho',
        'sigma',
        'tau',
        'upsilon',
        'phi',
        'chi',
        'psi',
        'omega'
    ]

    return greekLetters.includes(node.value.toString()) ? '\\' + node.value.toString() : node.value.toString()
}
