// import Parser, { Query } from 'tree-sitter'
// import Svelte from 'tree-sitter-svelte'
import { readFile } from 'fs/promises'
import * as neovim from 'neovim'
import { exportComponent } from './exportComponent'
import { Nvim } from './nvim'

export = (plugin: neovim.NvimPlugin) => {
  // const nvim = new Nvim(plugin.nvim)
  // plugin.registerCommand('SvelteExportComponent', exportComponent, { sync: false })
}


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


