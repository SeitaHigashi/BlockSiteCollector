import {customsearch_v1} from "googleapis"
import { Search } from "./search"
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

  public static tryResults(results:customsearch_v1.Schema$Result[]){
    const promises = results.map(result => {
      return this.try(result.link!);
    })
    Promise.all(promises).then(results => console.log(results));

  }
}

Search.search("java sql")
.then(result => Connectivity.tryResults(result.data.items!))
.then(result => console.log(result));

Search.search("battle.net")
.then(result => Connectivity.tryResults(result.data.items!))
.then(result => console.log(result));
