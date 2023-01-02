import dataStorage from "../../Storage";
import { seasonNames } from "../../Storage/consts";
import { IProduct } from "../../Types";
import cardViewIcon from '../../../assets/icons/card-view.svg';
import SortSelect from "../SortSelect";


class SectionProducts {
  getSectionHTML() {
    const productsData = dataStorage.getCurrProducts()
    const section = document.createElement('section');
    section.innerHTML = '';
    section.className = 'catalog';
    /**
     * TODO: insert views buttons and sort list
     */
    const title = document.createElement('p');
    title.className = 'catalog__title';
    title.innerHTML = `Найдено: <span class="catalog__count">${productsData.length}</span>`;
    section.appendChild(title);

    const infoWrapper = document.createElement('div');
    infoWrapper.className = 'catalog__info';
    section.appendChild(infoWrapper);
    const switchCardViewButton = document.createElement('button');
    switchCardViewButton.className = 'button';
    switchCardViewButton.innerHTML = `<img class="catalog__image" src="${cardViewIcon}" alt="Change view style">`;
    infoWrapper.appendChild(switchCardViewButton);
    const sortSelect = new SortSelect();
    infoWrapper.appendChild(sortSelect.getHTML());

    const productsContainer = document.createElement('div');
    productsContainer.className = 'catalog__container';
    section.appendChild(productsContainer);

    productsData.forEach((product) => {
      const productCard = this.getProductCardHTML(product);
      productsContainer.appendChild(productCard);
    })

    return section;
  }

  getProductCardHTML(product: IProduct): HTMLElement {
    const wrapper = document.createElement('article');
    wrapper.className = 'product product--list-view';
    wrapper.innerHTML = `
      <div class="product__column product__column--main">
      <a href="/product?id=${product.id}" data-local-link id="productTitle" class="product__title">
        <h3 class="product__brand">${product.brand}</h3>
        <span class="product__model">${product.model}</span>
        <span class="product__sizes">${product.size}</span>
      </a>
      <img class="product__image"
          src="${product.imageUrl[0]}"
          alt="${product.brand} ${product.model}">
    </div>
    <div class="product__column product__column--short">
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
    cartButton.onclick = () => {
      console.log('add to cart id: ' + product.id);
    }
    return wrapper;
  }


}

export default SectionProducts;
