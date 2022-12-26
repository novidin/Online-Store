import { IReqParams } from "../../Types/index";
// import router from "../../Router/index";
import dataStorage from "../../Storage/index";

class CatalogPage {

  render(reqParams: IReqParams): void {
    // if (reqParams.length) {
    //   router.goTo('/catalog');
    // }
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
