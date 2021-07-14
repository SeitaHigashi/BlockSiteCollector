import {google} from "googleapis"

export class Search {
  public static async search(keywords:string) {
    const customSearch = google.customsearch('v1');
    let result = await customSearch.cse.list({
      auth: process.env.GOOGLE_API_KEY,
      cx: process.env.GOOGLE_CSE_ID,
      q: keywords,
      lr: 'lang_ja',
    });
    return result.data.items;
  }
}

