import actions from './actions/index'
import { RequiredOptions } from './interfaces'

export default function config(): RequiredOptions {
    return Config.getInstance().options
}

export function getConfig(): Config {
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

    reset() {
        this.options = new Config().options
    }

    options: RequiredOptions = {
        operators: [
            { symbol: '=', associative: true, commutative: true, evaluate: 'ltr', precedence: 0 },
            { symbol: '+', associative: true, commutative: true, evaluate: 'ltr', precedence: 1 },
            { symbol: '*', associative: true, commutative: true, evaluate: 'ltr', precedence: 2 },
            { symbol: '/', associative: false, commutative: false, evaluate: 'ltr', precedence: 2 },
            { symbol: '^', associative: false, commutative: false, evaluate: 'rtl', precedence: 3 }
        ],
        constants: ['e', 'i', 'pi'],
        output: 'string',
        actions
    }
}
