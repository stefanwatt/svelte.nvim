"use strict";
const exportComponent_1 = require("./exportComponent");
const nvim_1 = require("./nvim");
module.exports = (plugin) => {
    const nvim = new nvim_1.Nvim(plugin.nvim);
    plugin.registerCommand('SvelteExportComponent', exportComponent_1.exportComponent, { sync: false });
};
// const main = async () => {
//   const parser = new Parser()
//   parser.setLanguage(Svelte)
//   const sourceCode = await readFile(
//     '/home/stefan/Projects/svelte.nvim/src/test.svelte',
//     'utf8'
//   )
//   const tree = parser.parse(sourceCode)
//   // const query = new Query(Svelte, sourceCode)
//   // console.log(query.predicates)
//   // const matches = query.matches(tree.rootNode)
//   const expressions = tree.rootNode.descendantsOfType('expression')
//   const reference = expressions[0].descendantsOfType('raw_text_expr')[0]
//   console.log(tree.rootNode.children[3].children[0].children[3])
// }
