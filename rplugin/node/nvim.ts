import * as Path from 'path'
import { Neovim } from 'neovim'
import { AutocmdOptions } from 'neovim/lib/host/NvimPlugin'
import { AsyncBuffer, Buffer } from 'neovim/lib/api/Buffer'

const linesToString = (lines: string[]) =>
  (lines.length === 1
    ? lines[0]
    : lines.reduce((previous, current) => `${previous}\n${current}`, '')
  ).trim()

let nvim: Neovim

export const autoCmdOptions: AutocmdOptions = { pattern: '*' }

export const initNvim = (_nvim: Neovim) => {
  nvim = _nvim
}

export const getBuf = async (): Promise<AsyncBuffer> => await nvim.buffer

export const getBufText = async (_buf?: Buffer): Promise<string> => {
  const buf = _buf || (await nvim.buffer)
  const lines = await buf.lines
  const bufText = linesToString(lines)
  return bufText
}

export const setBufText = async (text: string) => {
  await nvim.outWrite(text)
}

export const print = async (text: string | number) => {
  await nvim.lua(`print('${text}')`)
}

export const hSplit = async () => {
  await nvim.command('sp')
}

export const duplicateCurrentBuf = async () => {
  const { dir, name, ext } = Path.parse(await getBufFilepath())
  await hSplit()
  await nvim.command(`e ${dir}/typing_test_${name}.${ext}`)
}
const getBufFilepath = async (): Promise<string> => {
  const getFilepathCmd = 'lua print(vim.api.nvim_buf_get_name(0))'
  const filepath = await nvim.commandOutput(getFilepathCmd)
  return filepath
}
