"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Treesitter = void 0;
const tree_sitter_1 = __importDefault(require("tree-sitter"));
const tree_sitter_svelte_1 = __importDefault(require("tree-sitter-svelte"));
// const query = new Query(Svelte, sourceCode)
// console.log(query.predicates)
// const matches = query.matches(tree.rootNode)
class Treesitter {
    constructor() {
        this.parser = new tree_sitter_1.default();
        this.parser.setLanguage(tree_sitter_svelte_1.default);
    }
    parse(sourceCode) {
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
