import router from "../../Router/index";
import dataStorage from "../../Storage/index";
import { IProduct } from "../../Types/index";

class Products extends HTMLElement {

  private wrapper: HTMLDivElement;
  private products: IProduct[];

  constructor() {
    super();
    this.products = dataStorage.getCurrProducts();
    this.wrapper = document.createElement('div');
    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.appendChild(this.wrapper);
    this.render();
  }

  render() {
    this.wrapper.innerHTML = `<p>Found ${this.products.length} </p>`;

    this.products.forEach((product) => {
      const itemWrapper = document.createElement('div');
      const title = document.createElement('h3');

      title.textContent = product.name;
      itemWrapper.appendChild(title);

      const category =  document.createElement('p');

      category.textContent = product.season;
      itemWrapper.appendChild(category);

      const detailButton = document.createElement('buton');

      detailButton.textContent = 'Detail';
      detailButton.onclick = () => {
        router.goTo(`/product?id=${product.id}`)
      }
      itemWrapper.appendChild(detailButton);
      this.wrapper.appendChild(itemWrapper);
    })
  }
}

window.customElements.define('product-list', Products);

export default Products;
