import {customsearch_v1} from "googleapis"
import {StoreSet} from "./storeSet"
global.fetch = require('node-fetch').default;

export class Connectivity {
  public static async try(url:string) {
    try {
      const response = await fetch(url);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  public static async tryResults(results:customsearch_v1.Schema$Result[]){
    const promises = results.map(async (result) => {
      const practicable = await this.try(result.link!);
      //return [result.title, result.link, practicable];
      const set : StoreSet = {title: result.title!, url: result.link!, practicable: practicable}; 
      return set;
    })
    return await Promise.all(promises);
  }
}

