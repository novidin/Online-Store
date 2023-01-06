import dataStorage from "../../Storage";
import { seasonNames } from "../../Storage/consts";
import cartStorage from "../../Storage/Cart";

class SectionCartProducts {

  private section: HTMLElement;

  constructor() {
    this.section = document.createElement('section');
  }

  getHTML(pageNum = 1) {
    const cartProductsWrapper = document.createElement('div');

    console.log('pageCount', cartStorage.getPagesCount(), pageNum)
    if (pageNum > cartStorage.getPagesCount()) {
      cartProductsWrapper.innerHTML = `<p>товары не найдены </p>`;
      return cartProductsWrapper;
    }
    const productsData = cartStorage.getPaginatedItems(pageNum)

    productsData.forEach((cartProd) => {
      const cartProductWrapper = document.createElement('div');
      cartProductWrapper.className = 'product';
      const product = dataStorage.getProductById(cartProd.id);
      cartProductWrapper.innerHTML = `
      <div class="product__column product__column--main">
      <div class="product__header">
        <div class="product__title">
          <p class="product__brand">${cartProd.num}</>
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

      `
      const inputsWrapper = document.createElement('div');
      inputsWrapper.className = 'product__column product__column--price';
      cartProductWrapper.appendChild(inputsWrapper);

      const counterWrapper =  document.createElement('div');
      cartProductWrapper.appendChild(counterWrapper);

      const decrCountButton = document.createElement('button');
      decrCountButton.textContent = '-';
      counterWrapper.appendChild(decrCountButton);

      const countInput = document.createElement('input');
      countInput.type = 'number';
      countInput.disabled = true;
      countInput.value = cartProd.count.toString();
      counterWrapper.appendChild(countInput);

      const incrCountButton = document.createElement('button');
      incrCountButton.textContent = '+';
      incrCountButton.onclick = () => {
        if (+countInput.value >= +product.count) return;
        const addToCartEvent = new Event('addedToCard', {bubbles: true});
        incrCountButton.dispatchEvent(addToCartEvent);
        cartStorage.addProduct(cartProd.id);
        const value = +countInput.value + 1
        countInput.value = value.toString();
      }
      counterWrapper.appendChild(incrCountButton);


      cartProductsWrapper.appendChild(cartProductWrapper);
    })

    return cartProductsWrapper;
  }

  // getCounterHTML() {

  // }

}

export default SectionCartProducts;
