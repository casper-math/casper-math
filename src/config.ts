import addNumbers from './actions/add-numbers'
import multiplyNumbers from './actions/multiply-numbers'
import { Action, Operator, Options } from './interfaces'

export default function config(): Config {
    return Config.getInstance()
}

class Config {
    private static instance: Config

    static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config()
        }

        return Config.instance
    }

    operators: Operator[] = [
        {
            symbol: '+',
            associative: true,
            commutative: true,
            evaluate: 'ltr',
            precedence: 1
        },
        {
            symbol: '-',
            associative: false,
            commutative: false,
            evaluate: 'ltr',
            precedence: 1
        },
        {
            symbol: '*',
            associative: true,
            commutative: true,
            evaluate: 'ltr',
            precedence: 2
        },
        {
            symbol: '/',
            associative: false,
            commutative: false,
            evaluate: 'ltr',
            precedence: 2
        },
        {
            symbol: '^',
            associative: false,
            commutative: false,
            evaluate: 'rtl',
            precedence: 3
        }
    ]

    constants: string[] = ['e', 'i', 'pi']

    actions: Action[] = [addNumbers, multiplyNumbers]

    options: Options = {
        output: 'string'
    }
}
