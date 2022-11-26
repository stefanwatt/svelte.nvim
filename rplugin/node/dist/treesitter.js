"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Treesitter = void 0;
// const query = new Query(Svelte, sourceCode)
// console.log(query.predicates)
// const matches = query.matches(tree.rootNode)
class Treesitter {
    constructor() {
        // this.parser = new Parser()
        // this.parser.setLanguage(Svelte)
    }
    parse(sourceCode) {
        if (!this.parser)
            return;
        this.tree = this.parser.parse(sourceCode);
    }
    get raw_text_expr() {
        if (!this.tree)
            return;
        const expressions = this.tree.rootNode.descendantsOfType('expression');
        const reference = expressions[0].descendantsOfType('raw_text_expr')[0];
        return this.tree.rootNode.children[3].children[0].children[3].toString();
    }
}
exports.Treesitter = Treesitter;
