import { IReqParams } from "../../Types/index";
import router from "../../Router/index";
import dataStorage from "../../Storage/index";
import pageHeader from "../../Components/PageHeader/index";
import pageFooter from "../../Components/PageFooter/index";
import { seasonNames } from "../../Storage/consts";

class ProductPage {

  render(reqParams: IReqParams): void {

    if (!reqParams.id) {
      router.goTo('/404');
    }

    const product = dataStorage.getProductById(reqParams.id[0]);
    document.title = `Online Store - ${product?.name || 'not found'}`;
    const main = document.createElement('main');
    main.className = 'main';
    main.innerHTML = '<h1>Товар не найден</h1>';

    if (product) {
      main.innerHTML = '';
      const breadcrumbsWrapper = document.createElement('div');
      breadcrumbsWrapper.className = 'link-navigation';
      main.appendChild(breadcrumbsWrapper);

      breadcrumbsWrapper.innerHTML = `
        <ul class="link-navigation__list">
          <li class="link-navigation__item">
            <span class="link-navigation__title">Шины</span>
            <span class="icon icon--link-navigation"></span>
          </li>
          <li class="link-navigation__item">
            <span class="link-navigation__title">${product.season}</span>
            <span class="icon icon--link-navigation"></span>
          </li>
          <li class="link-navigation__item">
            <span class="link-navigation__title">${product.brand}</span>
            <span class="icon icon--link-navigation"></span>
          </li>
          <li class="link-navigation__item">
            <span class="link-navigation__title link-navigation__title--active">${product.name}</span>
          </li>
        </ul>
      `

      const productWrapper = document.createElement('div');
      productWrapper.className = 'product product--page-view';
      main.appendChild(productWrapper);
      productWrapper.innerHTML = `
      <div class="product__column product__column--main">
      <div class="product__header">
        <div class="product__title">
          <h3 class="product__brand">${product.brand}</h3>
          <span class="product__model">${product.model}</span>
          <span class="product__sizes">${product.size}</span>
        </div>
        <div class="product__subtitle--top">
          <p class="product__price">${product.price} руб</p>
          <p class="product__count">В наличии: ${product.count} шт.</p>
        </div>
      </div>
      <img class="product__image"
          src="${product.imageUrl[0]}"
          alt="${product.brand} ${product.model}">
    </div>
    <div class="product__column">
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
      `
    }

    document.body.appendChild(pageHeader.getHeaderDOM());
    document.body.appendChild(main);
    document.body.appendChild(pageFooter.getFooterDOM());
  }

  update(reqParams: IReqParams) {
    this.render(reqParams)
  }
}

export default ProductPage;
