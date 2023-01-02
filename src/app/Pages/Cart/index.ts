import { IReqParams } from "../../Types/index";
import router from "../../Router/index";

class CartPage {

  render(reqParams: IReqParams): void {
    if (reqParams.length) {
      router.goTo('/cart');
    }
    document.title = `Cart`;
    document.body.innerHTML = `
      <nav-links></nav-links>
      <h1>Cart Page</h1>
    `
  }

  update(reqParams: IReqParams) {
    this.render(reqParams)
  }
}

export default CartPage;
