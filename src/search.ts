import {customsearch_v1, google} from "googleapis"

export class Search {
  public static async search(keywords:string, num:number=10) {
    const customSearch = google.customsearch('v1');
    const params = new Array<customsearch_v1.Params$Resource$Cse$List>();
    for(let i = 0; i < num/10; i++) {
      params.push({
        auth: process.env.GOOGLE_API_KEY,
        cx: process.env.GOOGLE_CSE_ID,
        q: keywords,
        lr: 'lang_ja',
      });
    }
    return Promise.all(
      params.map(async param => await customSearch.cse.list(param))
    ).then(result => {
      return result.map(result => result.data.items!)
    }).then(result =>
    result.reduce((acc, val) => acc.concat(val), [])
    );
  }
}

