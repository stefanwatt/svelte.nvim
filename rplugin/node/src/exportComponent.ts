import { Nvim } from './nvim'
import { sourceCode } from './svelteSample';
import { Treesitter } from './treesitter'

export const exportComponent = (nvim: Nvim) => async () => {
  const treesitter = new Treesitter();
  treesitter.parse(sourceCode)
  nvim.print(treesitter.raw_text_expr)
}
