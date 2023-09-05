import Operator from './operator'

export default function config(): Config {
    return Config.getInstance()
}

class Config {
    private static instance: Config

    private options: { operators: Operator[]; constants: string[] } = {
        operators: [
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
        ],
        constants: ['e', 'i', 'pi']
    }

    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config()
        }

        return Config.instance
    }

    operators(): Operator[] {
        return this.options.operators
    }

    setOperators(operators: Operator[]): void {
        this.options.operators = operators
    }

    constants(): string[] {
        return this.options.constants
    }

    setConstants(constants: string[]): void {
        this.options.constants = constants
    }
}
