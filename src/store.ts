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

  public set(storeSet: StoreSet[]) : void {
    const fqdn = this.toFQDN(this.toOnlyFalse(storeSet));
    fqdn.map(value => {
      if (this.setList.find(set => set.url == value.url) == undefined)
        this.setList.push(value);
    });
  }

  public getAll() : StoreSet[] {
    return this.setList;
  }

  private toOnlyFalse(storeSet: StoreSet[]) : StoreSet[] {
    return storeSet.filter(value => value.practicable == false);
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
