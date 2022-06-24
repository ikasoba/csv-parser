export interface Row<T> extends Array<T> {}
export class CSV<T> extends Array<Row<T>> {
  getItem(row:number,column:number): T|undefined {
    return this?.[row]?.[column]
  }
  getRow(row:number): T[] | undefined {
    return this?.[row]
  }
  appendRow(...row:T[]): void {
    this.push(row)
  }
}

/**
 * If translator is omitted, `CSV<string>` is used, otherwise `CSV<T>`.
 * On the typedef, `CSV<T|string>|null` is always returned.
*/
export function parser<T = string>(code:string,header:boolean = false,translator:null|((v:string)=>T) = null): CSV<T|string> | null {
  const res = new CSV<string|T>()
  const optionalInvoke = (v:string,f:((v:string)=>T)|null = null) => f ? f(v) : v
  for (const rawRow of code.split("\n")){
    const row:Row<string|T> = []
    let next:"STR"|"PAD" = "STR"
    for (let i = 0;i<rawRow.length;){
      let m;
      try {
      if (next == "STR" && (m = rawRow.slice(i).match(/^\s*(?:"((?:[^"]|"")*)"|([^\s",]*))/))){
        next = "PAD"
        row.push(optionalInvoke((m[1] ? m[1].replaceAll('""','"') : m[2]) || "",translator) || "")
        i += m[0].length
        continue
      }else if (next == "PAD" && (m = rawRow.slice(i).match(/^\s*,/))){
        next = "STR"
        i += m[0].length
        continue
      }else return null
      }finally {console.log(row,m,i,rawRow.slice(i))}
    }
    res.push(row)
  }
  return res
}