import * as Parser from "tree-sitter"
import { Nvim } from "./nvim"
import * as Svelte from 'tree-sitter-svelte'

export const exportComponent = (nvim: Nvim)=> async ()=>{
  nvim.print("exporting svelte component...")
  const parser = new Parser()
  // parser.setLanguage(Svelte)

  // const sourceCode = await nvim.getBufText()
  // const tree = parser.parse(sourceCode)
  // // const query = new Query(Svelte, sourceCode)
  // // console.log(query.predicates)
  // // const matches = query.matches(tree.rootNode)
  // const expressions = tree.rootNode.descendantsOfType('expression')
  // const reference = expressions[0].descendantsOfType('raw_text_expr')[0]
  // nvim.print(tree.rootNode.children[3].children[0].children[3].toString())
}
