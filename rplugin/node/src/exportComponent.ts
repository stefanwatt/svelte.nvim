import { Nvim } from "./nvim"

export const exportComponent = (nvim: Nvim)=> ()=>{
  nvim.print("exporting svelte component...")
}
