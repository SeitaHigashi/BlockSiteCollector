import XLSX from "xlsx";
import {StoreSet} from "./storeSet";

export class Output{
  public static makeBook(storeSets: StoreSet[]) {
    const wb : XLSX.WorkBook = XLSX.utils.book_new();
    wb.Props = {
      Title: "BlockSiteWookBook",
      Author: "BlockSiteCollector made by SeitaHIGASHI",
      CreatedDate: new Date()
    };
    wb.SheetNames.push("BlockSites");
    wb.Sheets["BlockSites"] = XLSX.utils.aoa_to_sheet(this.convertToArray(storeSets));
    return XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
  }

  private static convertToArray(storeSets: StoreSet[]) : string[][] {
    return storeSets.map(value => [value.title, value.url]);
  }
}
