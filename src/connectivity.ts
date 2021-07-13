import {customsearch_v1} from "googleapis"
import {StoreSet} from "./storeSet"
import {FetchError} from "node-fetch"
global.fetch = require('node-fetch-with-proxy');

export class Connectivity {
  public static async try(url:string) {
    try {
      const response = await fetch(url);
      return response.ok;
    } catch (error)  {
      if(!(error instanceof FetchError))
        console.log(error);
      return false;
    }
  }

  public static async tryResults(results:customsearch_v1.Schema$Result[]){
    const promises = results.map(async (result) => {
      const practicable = await this.try(result.link!);
      const set : StoreSet = {title: result.title!, url: result.link!, practicable: practicable}; 
      return set;
    })
    return await Promise.all(promises);
  }
}

