import Parser from 'tree-sitter'
import Svelte from 'tree-sitter-svelte'


// const query = new Query(Svelte, sourceCode)
// console.log(query.predicates)
// const matches = query.matches(tree.rootNode)

export class Treesitter{
  parser:Parser;
  tree:any

  constructor(){
    this.parser = new Parser()
    this.parser.setLanguage(Svelte)
  }

  public parse(sourceCode:string){
    if(!this.parser) return;
    this.tree = this.parser.parse(sourceCode)
  } 

  public get raw_text_expr(): string {
    if(!this.tree) return;
    const expressions = this.tree.rootNode.descendantsOfType('expression')
    const reference = expressions[0].descendantsOfType('raw_text_expr')[0]
    return this.tree.rootNode.children[3].children[0].children[3].toString()
  }
}
