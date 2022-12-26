import { IReqParams } from "../../Types/index";
import router from "../../Router/index";

class CatalogPage {

  render(reqParams: IReqParams): void {
    if (reqParams.length) {
      router.goTo('/catalog');
    }
    document.title = `Catalog`;
    document.body.innerHTML = `
      <nav-links></nav-links>
      <h1>Catalog Page</h1>
    `;
  }
}

export default CatalogPage;
