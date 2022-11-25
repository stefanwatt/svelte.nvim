import levenshtein from 'fast-levenshtein'

const s1 = "This is some text"
const s2 = "This is some text"

export const getDistanceAsPercentage = (s1:string,s2:string):number=>{
  const distance = levenshtein.get(s1,s2)
  const maxLength = Math.max(s1.length,s2.length)
  const percentage = 100*(maxLength-distance)/maxLength
  return Math.round(percentage)
}
