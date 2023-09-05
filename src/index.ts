import config from './config'
import execute from './execute'
import string from './output/string'
import parse from './parse'

export default function casper() {
    return new Casper()
}

class Casper {
    go(expression: string) {
        let tree = parse(expression)
        let old

        while (!old?.equals(tree)) {
            old = tree.clone()

            config().actions.forEach(action => {
                tree = execute(action, tree)
            })
        }

        return string(tree)
    }
}
