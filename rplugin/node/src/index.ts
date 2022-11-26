import * as neovim from 'neovim'
import { exportComponent } from './exportComponent'
import { Nvim } from './nvim'

export = (plugin: neovim.NvimPlugin) => {
  const nvim = new Nvim(plugin.nvim)

  plugin.registerCommand('SvelteExportComponent', exportComponent(nvim), {
    sync: false,
  })
}
