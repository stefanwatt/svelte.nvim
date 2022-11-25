"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportComponent = void 0;
const Parser = require("tree-sitter");
const exportComponent = (nvim) => async () => {
    nvim.print("exporting svelte component...");
    const parser = new Parser();
    // parser.setLanguage(Svelte)
    // const sourceCode = await nvim.getBufText()
    // const tree = parser.parse(sourceCode)
    // // const query = new Query(Svelte, sourceCode)
    // // console.log(query.predicates)
    // // const matches = query.matches(tree.rootNode)
    // const expressions = tree.rootNode.descendantsOfType('expression')
    // const reference = expressions[0].descendantsOfType('raw_text_expr')[0]
    // nvim.print(tree.rootNode.children[3].children[0].children[3].toString())
};
exports.exportComponent = exportComponent;
