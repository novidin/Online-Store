import {IReqParams} from "../../Types/index";
import router from "../../Router/index";
import dataStorage from "../../Storage/index";
import pageHeader from "../../Components/PageHeader/index";
import pageFooter from "../../Components/PageFooter/index";
import {seasonNames} from "../../Storage/consts";

class ProductPage {

  render(reqParams: IReqParams): void {

    if (!reqParams.id) {
      router.goTo('/404');
    }

    const product = dataStorage.getProductById(reqParams.id[0]);
    document.title = `Online Store - ${product?.model || 'not found'}`;
    const main = document.createElement('main');
    main.className = 'main';
    main.innerHTML = '<p>Товар не найден</p>';

    if (product) {
      main.innerHTML = '';
      const breadcrumbsWrapper = document.createElement('div');
      breadcrumbsWrapper.className = 'link-navigation';
      main.appendChild(breadcrumbsWrapper);

      breadcrumbsWrapper.innerHTML = `
        <ul class="link-navigation__list">
          <li class="link-navigation__item">
            <a href="/catalog" class="link-navigation__link" data-local-link>Шины</a>
            <span class="icon icon--link-navigation"></span>
          </li>
          <li class="link-navigation__item">
            <a href="/catalog?season=${product.season}" class="link-navigation__link" data-local-link>${product.season}</a>
            <span class="icon icon--link-navigation"></span>
          </li>
          <li class="link-navigation__item">
            <a href="/catalog?brand=${product.brand}" class="link-navigation__link" data-local-link>${product.brand}</a>
            <span class="icon icon--link-navigation"></span>
          </li>
          <li class="link-navigation__item">
            <span class="link-navigation__link link-navigation__link--disable">${product.model}</span>
          </li>
        </ul>
      `

      const productContainer = document.createElement('div') as HTMLElement;
      productContainer.classList.add('catalog');

      main.appendChild(productContainer);

      const productWrapper = document.createElement('div');
      productWrapper.className = 'product product--page-view';
      productContainer.appendChild(productWrapper);

      let ratingStyleColor;

      if (parseFloat(product.rating.overageRating) >= 4.8) {
        ratingStyleColor = 'rating--good';
      } else if (parseFloat(product.rating.overageRating) > 3.9) {
        ratingStyleColor = 'rating--medium';
      } else {
        ratingStyleColor = 'rating--bad';
      }

      productWrapper.innerHTML = `
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
        <button class="product__buy product__button button">Купить</button>
        <button class="product__button button">В корзину</button>
      </div>
    `;
    }

    document.body.appendChild(pageHeader.getHeaderDOM());
    document.body.appendChild(main);
    document.body.appendChild(pageFooter.getFooterDOM());

    // Change image in card when user click miniature
    const miniatures = document.querySelectorAll('.product__miniatures-item') as NodeListOf<HTMLElement>;
    const productImage = document.querySelector('.product__image') as HTMLElement;

    miniatures.forEach((item: HTMLElement, i: number): void => {
      item.addEventListener('click', () => {
        const activeStyle = 'product__miniatures-item--active';

        if (item.classList.length === 1) {
          const activeMiniatures = document.querySelector(`.${activeStyle}`) as HTMLElement;
          activeMiniatures.classList.remove(`${activeStyle}`);
          item.classList.add(`${activeStyle}`);
          productImage.setAttribute('src', `${product.imageUrl[i]}`)
        }
      });
    });
  }

  update(reqParams: IReqParams) {
    this.render(reqParams)
  }
}

export default ProductPage;
