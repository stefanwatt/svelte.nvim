'use strict'
const nvim_1 = require('./nvim')
const typingTest_1 = require('./typingTest')
module.exports = (plugin) => {
  const { nvim } = plugin
  ;(0, nvim_1.initNvim)(nvim)
  plugin.registerCommand('TypingTestStart', typingTest_1.startTypingTest, {
    sync: false,
  })
  plugin.registerCommand('TypingTestQuit', typingTest_1.quitTypingTest, {
    sync: false,
  })
  plugin.registerAutocmd(
    'TextChangedI',
    typingTest_1.compareBufferTextToTemplate,
    nvim_1.autoCmdOptions
  )
  plugin.registerAutocmd(
    'TextChanged',
    typingTest_1.compareBufferTextToTemplate,
    nvim_1.autoCmdOptions
  )
}
//# sourceMappingURL=app.js.map
