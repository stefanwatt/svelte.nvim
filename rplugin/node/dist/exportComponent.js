"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportComponent = void 0;
const Parser = require("tree-sitter");
const tree_sitter_svelte_1 = require("tree-sitter-svelte");
const exportComponent = (nvim) => () => {
    nvim.print("exporting svelte component...");
    const parser = new Parser();
    parser.setLanguage(tree_sitter_svelte_1.default);
    const sourceCode = await getBufText();
    const tree = parser.parse(sourceCode);
    // const query = new Query(Svelte, sourceCode)
    // console.log(query.predicates)
    // const matches = query.matches(tree.rootNode)
    const expressions = tree.rootNode.descendantsOfType('expression');
    const reference = expressions[0].descendantsOfType('raw_text_expr')[0];
    nvim.print(tree.rootNode.children[3].children[0].children[3].toString());
};
exports.exportComponent = exportComponent;
