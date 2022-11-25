import { AsyncBuffer, Buffer } from 'neovim/lib/api/Buffer'
import { Neovim } from "neovim";


export class Nvim {
  constructor(private nvim: Neovim){

  }
  
  public async print(text: string|number){
    await this.nvim.lua(`print('${text}')`)
  }

  public async getBufText  (_buf?: Buffer): Promise<string> {
    const buf = _buf || (await this.nvim.buffer)
    const lines = await buf.lines
    const bufText = this.linesToString(lines)
    return bufText
  }


  public async setBufText (text: string) {
    await this.nvim.outWrite(text)
  }

  private linesToString (lines: string[]){
    return (lines.length === 1
      ? lines[0]
      : lines.reduce((previous, current) => `${previous}\n${current}`, '')
    ).trim()
  } 
}
