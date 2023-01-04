import { IReqParams, ICartProduct } from "../../Types/index";
import router from "../../Router/index";
import pageHeader from "../../Components/PageHeader/index";
import pageFooter from "../../Components/PageFooter/index";
import cartStorage from "../../Storage/Cart";
import dataStorage from "../../Storage";
import { seasonNames } from "../../Storage/consts";


class CartPage {

  private main: HTMLElement;

  constructor() {
    this.main = document.createElement('main');
    this.main.className = 'main'
  }

  render(reqParams: IReqParams): void {
    if (reqParams.length) {
      router.goTo('/cart');
    }
    document.title = `Online Store - Корзина`;


    this.main.innerHTML = '<div class="wrapper"><h2>Корзина пуста</h2></div>';

    const cartProducts = cartStorage.getCartProducts();
    if (cartProducts.length) {
      this.buildHTML(cartProducts);
    }

    document.body.appendChild(pageHeader.getHeaderDOM());
    document.body.appendChild(this.main);
    document.body.appendChild(pageFooter.getFooterDOM());
  }

  buildHTML(cartProducts: ICartProduct[]) {
    const cartProductsWrapper = document.createElement('div');

    this.main.appendChild(cartProductsWrapper)
    let counter = 1;
    cartProducts.forEach((cartProd) => {
      const cartProductWrapper = document.createElement('div');
      cartProductWrapper.className = 'product';
      const product = dataStorage.getProductById(cartProd.id);
      cartProductWrapper.innerHTML = `
      <div class="product__column product__column--main">
      <div class="product__header">
        <div class="product__title">
          <p class="product__brand">${counter}</>
          <h3 class="product__brand">${product.brand}</h3>
          <span class="product__model">${product.model}</span>
          <span class="product__sizes">${product.size}</span>
        </div>
      </div>
      <ul class="product__labels-list">
        <li class="product__labels-item">
          <span class="product__season icon icon--${product.season}"></span>
          <span class="product__labels-title">${seasonNames[product.season]}</span>
        </li>
        <li class="product__labels-item">
          <p class="product__rating">
            <span class="icon icon--star rating rating--good"></span>
            <span class="rating__value rating--good">${product.rating.overageRating}</span>
          </p>
          <span class="product__labels-title">Рейтинг</span>
        </li>
        <li class="product__labels-item">
          <span class="product__comments">${product.rating.commentsCount}</span>
          <span class="product__labels-title">Комент</span>
        </li>
      </ul>
    </div>
    <div class="product__column">
      <div class="product__subtitle">
        <p class="product__count">В наличии: ${product.count} шт.</p>
      </div>
      <img class="product__image"
          src="${product.imageUrl[0]}"
          alt="${product.brand} ${product.model}">
    </div>
    <div class="product__column product__column--price">


    </div>
      `
      cartProductsWrapper.appendChild(cartProductWrapper);
      counter += 1;
    })
  }

  update(reqParams: IReqParams) {
    this.render(reqParams)
  }
}

export default CartPage;
