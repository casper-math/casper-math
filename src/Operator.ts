export default interface Operator {
    symbol: string
    associative: boolean
    commutative: boolean
    evaluate: 'ltr' | 'rtl'
    precedence: number
}
