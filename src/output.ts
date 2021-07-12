import XLSX from "xlsx";

export class Output{
  public static out() {
    const wb : XLSX.WorkBook = XLSX.utils.book_new();
    wb.Props = {
      Title: "SheetJS Tutorial",
      Subject: "Test",
      Author: "Red Stapler",
      CreatedDate: new Date(2017,12,19)
    };
    wb.SheetNames.push("Test Sheet");
    wb.Sheets["Test Sheet"] = XLSX.utils.aoa_to_sheet([["hello", "world"]]);
    const wopts : XLSX.WritingOptions = { bookType:'xlsx', type:'binary' };
    return XLSX.write(wb, wopts);
  }
}
