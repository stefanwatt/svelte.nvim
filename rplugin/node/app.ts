import * as neovim from 'neovim'
import { autoCmdOptions, initNvim } from './nvim'
import {
  compareBufferTextToTemplate,
  quitTypingTest,
  startTypingTest,
} from './typingTest'

export = (plugin: neovim.NvimPlugin) => {
  const { nvim } = plugin
  initNvim(nvim)
  plugin.registerCommand('TypingTestStart', startTypingTest, { sync: false })
  plugin.registerCommand('TypingTestQuit', quitTypingTest, { sync: false })
  plugin.registerAutocmd(
    'TextChangedI',
    compareBufferTextToTemplate,
    autoCmdOptions
  )
  plugin.registerAutocmd(
    'TextChanged',
    compareBufferTextToTemplate,
    autoCmdOptions
  )
}
