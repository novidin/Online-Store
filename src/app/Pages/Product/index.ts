import { IReqParams } from "../../Types/index";
import router from "../../Router/index";

class ProductPage {
  render(reqParams: IReqParams): void {
    if (!reqParams.id) {
      router.goTo('/404');
    }

    document.body.innerHTML = `
      <nav-links></nav-links>
      <h1>Product ${reqParams.id} Page</h1>
    `
  }
}

export default ProductPage;
