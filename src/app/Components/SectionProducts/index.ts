import dataStorage from "../../Storage";
import { seasonNames } from "../../Storage/consts";
import { IProduct } from "../../Types";
import cardViewIcon from '../../../assets/icons/card-view.svg';
import listViewIcon from '../../../assets/icons/list-view.svg';
import SortSelect from "../SortSelect";
import cartStorage from "../../Storage/Cart";


class SectionProducts {

  private readonly section: HTMLElement;

  constructor() {
    this.section = document.createElement('section');
  }

  buildHTML() {
    const productsData = dataStorage.getCurrProducts()
    this.section.innerHTML = '';
    this.section.className = 'catalog';
    /**
     * TODO: insert views buttons and sort list
     */
    const infoWrapper = document.createElement('div');
    infoWrapper.className = 'catalog__info';
    this.section.appendChild(infoWrapper);

    const switchCardViewButton = document.createElement('button');
    switchCardViewButton.className = 'catalog__button';
    switchCardViewButton.innerHTML = `<img class="catalog__image" src="${cardViewIcon}" alt="Change view style">`;

    switchCardViewButton.onclick = () => {
      const productCard = document.querySelector('.product') as HTMLElement;
      const iconSrc = productCard.classList.contains('product--tile-view') ? listViewIcon : cardViewIcon;
      switchCardViewButton.innerHTML = `<img class="catalog__image " src="${iconSrc}" alt="Change view style">`;
      changeProductsView();
    }

    infoWrapper.appendChild(switchCardViewButton)

    const sortSelect = new SortSelect();
    infoWrapper.appendChild(sortSelect.getHTML());

    const title = document.createElement('p');
    title.className = 'catalog__title';
    title.innerHTML = `Найдено: <span class="catalog__count">${productsData.length}</span>`;
    this.section.appendChild(title);

    const productsContainer = document.createElement('div');
    productsContainer.className = 'catalog__container';
    this.section.appendChild(productsContainer);

    const productCards = productsData.map((product) => {
      const productCard = this.getProductCardHTML(product);
      productsContainer.appendChild(productCard);
      return productCard;
    })

    // TODO Временное решение,
    //  т.к. возможно лучше удалить все карточки и добавить карточки с новым видом,
    //  чем менять вид карточек (класс) по живому
    const changeProductsView = () => {
      const productCardArr = document.querySelectorAll('.product') as NodeListOf<HTMLElement>;
      const productNewViewStyle = productCardArr[0].classList.contains('product--tile-view')
        ? 'product--list-view'
        : 'product--tile-view';

      productCardArr.forEach((item: HTMLElement): void => {
        item.setAttribute("class", "product");
        item.classList.add(productNewViewStyle);
      })
    }

    console.log('cards', productCards)
  }

  getSectionHTML() {
    this.buildHTML();
    return this.section;
  }

  getProductCardHTML(product: IProduct): HTMLElement {
    const wrapper = document.createElement('article') as HTMLElement;
    wrapper.className = 'product product--tile-view';

    let ratingStyleColor;

    if (parseFloat(product.rating.overageRating) >= 4.8) {
      ratingStyleColor = 'rating--good';
    } else if (parseFloat(product.rating.overageRating) > 3.9) {
      ratingStyleColor = 'rating--medium';
    } else {
      ratingStyleColor = 'rating--bad';
    }

    wrapper.innerHTML = `
      <div class="product__column product__column--main">
       <h3 class="product__header">
          <a id="productTitle" class="product__title" href="/product?id=${product.id}" data-local-link>
            <span class="product__brand">${product.brand}</span>
            <span class="product__model">${product.model}</span>
            <span class="product__sizes">${product.size}</span>
          </a>
        </h3>
      <ul class="product__miniatures-list">
          <li class="product__miniatures-item product__miniatures-item--active">
            <img class="product__miniatures-image"
                 src="${product.imageUrl[0]}" alt="${product.brand} ${product.model}">
          </li>
          <li class="product__miniatures-item">
            <img class="product__miniatures-image"
                 src="${product.imageUrl[1]}" alt="${product.brand} ${product.model}">
          </li>
        </ul>
      <img class="product__image"
          src="${product.imageUrl[0]}"
          alt="${product.brand} ${product.model}">
    </div>
      <div class="product__column product__column--short">
        <div class="product__subtitle product__subtitle--top">
          <span class="product__price">${product.price} руб</span>
          <span class="product__count">В наличии: ${product.count} шт.</span>
        </div>
        <ul class="product__labels-list">
          <li class="product__labels-item">
            <span class="product__season icon icon--${product.season}"></span>
            <span class="product__labels-title">${seasonNames[product.season]}</span>
          </li>
          <li class="product__labels-item">
            <p class="product__rating">
              <span class="icon icon--star rating ${ratingStyleColor}"></span>
              <span class="rating__value ${ratingStyleColor}">${product.rating.overageRating}</span>
            </p>
            <span class="product__labels-title">Рейтинг</span>
          </li>
          <li class="product__labels-item">
            <span class="product__comments">${product.rating.commentsCount}</span>
            <span class="product__labels-title">Комент</span>
          </li>
        </ul>
        <ul class="product__features-list">
          <li class="product__features-item">
            <span class="product__features-title">Глубина протектора</span>
            <span class="product__features-value">${product.features.protector} мм</span>
          </li>
          <li class="product__features-item">
            <span class="product__features-title">Вес</span>
            <span class="product__features-value">${product.features.weight} кг</span>
          </li>
          <li class="product__features-item">
            <span class="product__features-title">Эксплуатация</span>
            <span class="product__features-value">${product.features.exploitation}</span>
          </li>
          <li class="product__features-item">
            <span class="product__features-title">Защита диска</span>
            <span class="product__features-value">${product.features.discProtector}</span>
          </li>
          <li class="product__features-item">
            <span class="product__features-title">Индекс нагрузки</span>
            <span class="product__features-value">${product.features.loadIndex}</span>
          </li>
          <li class="product__features-item">
            <span class="product__features-title">Индекс скорости</span>
            <span class="product__features-value">${product.features.speedIndex}</span>
          </li>
        </ul>
      </div>
      <div class="product__column product__column--price">
        <div class="product__subtitle">
          <p class="product__price">${product.price} руб</p>
          <p class="product__count">В наличии: ${product.count} шт.</p>
        </div>
        <ul class="product__offers-list">
            <li class="product__offers-item">
              <span class="product__offers-icon icon icon--pay"></span>
              <p class="product__offers-title">Оплата частями</p>
            </li>
            <li class="product__offers-item">
              <span class="product__offers-icon icon icon--guarantee"></span>
              <p class="product__offers-title">Официальная гарантия</p>
            </li>
            <li class="product__offers-item">
              <span class="product__offers-icon icon icon--shipping"></span>
              <p class="product__offers-title">Доставка по РБ</p>
            </li>
          </ul>
        <button class="product__button button">В корзину</button>
      </div>
    `;

    const cartButton = wrapper.querySelector('.button') as HTMLButtonElement;

    if (cartStorage.isProductInCart(product.id)) {
      cartButton.textContent = 'В корзине';
      cartButton.classList.add('button--accent');
    }

    cartButton.onclick = () => {
      if (cartStorage.isProductInCart(product.id)) {
        cartStorage.removeProduct(product.id);
      } else {
        cartStorage.addProduct(product.id);
      }
      const addToCartEvent = new Event('addedToCard', { bubbles: true });
      cartButton.dispatchEvent(addToCartEvent);
      this.buildHTML();
    }
    return wrapper;
  }
}

export default SectionProducts;
