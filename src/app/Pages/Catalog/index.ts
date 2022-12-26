import { IReqParams } from "../../Types/index";
import dataStorage from "../../Storage/index";

class CatalogPage {

  render(reqParams: IReqParams): void {
    dataStorage.setFilters(reqParams);
    document.title = `Catalog`;
    document.body.innerHTML = `
      <nav-links></nav-links>
      <h1>Catalog Page</h1>
      <filter-check></filter-check>
      <product-list></product-list>
    `;
  }
}

export default CatalogPage;
