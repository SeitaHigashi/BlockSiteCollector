import {customsearch_v1} from "googleapis"
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
      return [result.title, result.link, practicable];
    })
    //Promise.all(promises).then(results => console.log(results));
    return await Promise.all(promises);
  }
}

/*
Search.search("java sql")
.then(result => Connectivity.tryResults(result.data.items!))
.then(result => console.log(result));

Search.search("overwatch")
.then(result => Connectivity.tryResults(result.data.items!))
.then(result => console.log(result));
*/
