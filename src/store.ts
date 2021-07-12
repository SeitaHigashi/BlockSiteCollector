import url from "url"
import {StoreSet} from "./storeSet"

export class Store {
  private setList : StoreSet[];

  private static store : Store;

  private constructor() {
    this.setList = new Array<StoreSet>();
  }

  public static getStore() : Store {
    if(this.store == null)
      this.store = new Store();
    return this.store;
  }

  public sets(storeSet: StoreSet[]) : void {
    const fqdn = this.toFQDN(storeSet);
    console.log(fqdn)
  }

  private toFQDN(storeSet: StoreSet[]) : StoreSet[] {
    const results : StoreSet[] = storeSet.map(value => {
      const url = new URL(value.url);
      const set : StoreSet = {
        title: value.title,
        url: url.host,
        practicable: value.practicable
      } 
      return set;
    });
    return results;
  }
}
