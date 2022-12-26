import { IReqParams } from "../../Types/index";
import router from "../../Router/index";
import dataStorage from "../../Storage/index";

class ProductPage {

  render(reqParams: IReqParams): void {
    if (!reqParams.id) {
      router.goTo('/404');
    }

    const product = dataStorage.getProductById(reqParams.id[0]);

    document.title = `Product ${product?.name || 'not found'}`;
    document.body.innerHTML = `
      <nav-links></nav-links>
    `;

    const wrapper = document.createElement('div');

    if (product) {
      wrapper.innerHTML = `
        <h1>Product ${product.name} Page</h1>
        <p>Price: ${product.price}</p>
        <img src="${product.imageUrl[0]}"></img>
      `
    } else {
      wrapper.innerHTML = `
      <h1>Product not found</h1>
      `
    }
    document.body.appendChild(wrapper);
  }
}

export default ProductPage;
