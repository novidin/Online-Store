import cartStorage from '../../Storage/Cart';

class SectionCartTotal {

  private readonly promoContentDOM: HTMLElement;

  constructor() {
    this.promoContentDOM = this.createContainer();

    window.addEventListener('addedToCard', () => {
      this.promoContentDOM.removeChild(this.promoContentDOM.children[0]);
      this.promoContentDOM.prepend(this.createTotalColumnDOM());
      console.log('addedToCard Event');
    });
  }

  createContainer(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('promo__content');
    return container;
  }

  getHTML() {
    this.promoContentDOM.innerHTML = '';

    const columnsDOM = [this.createTotalColumnDOM(), this.createActivateColumnDOM(), this.createConfirmColumnDOM()];

    this.promoContentDOM.append(...columnsDOM);
    return this.promoContentDOM;
  }

  createTotalColumnDOM(promoPerc = 0): HTMLDivElement {
    const columnDOM = this.createColumnDOM() as HTMLDivElement;

    const cartCount = cartStorage.getCountProducts().toString();
    const cartTotal = cartStorage.getTotal().toString();
    const promoSum = +cartTotal * (promoPerc / 100);

    columnDOM.innerHTML = `
      <ul class="promo__list">
        <li class="promo__item">
          <span class="promo__item-title">Количество</span>
          <span class="promo__item-value">${cartCount} шт.</span>
        </li>
        <li class="promo__item">
          <span class="promo__item-title">Стоимость</span>
          <span class="promo__item-value">${cartTotal} руб</span>
        </li>
        <li class="promo__item">
           <span class="promo__item-title">Скидка</span>
           <span class="promo__item-value">- ${promoSum} руб</span>
        </li>
        <li class="promo__item promo__item--main">
           <span class="promo__item-title">Итого</span>
           <span class="promo__item-value">${+cartTotal - promoSum} руб</span>
        </li>
      </ul>
    `;

    return columnDOM;
  }

  createActivateColumnDOM(): HTMLDivElement {
    const columnDOM = this.createColumnDOM() as HTMLDivElement;

    columnDOM.innerHTML = `
      <ul class="promo__activated-list">
        <li class="promo__activated-item">
          <span class="promo__activated-code">LOLOLO</span>
          <span class="promo__activated-delete">Удалить</span>
        </li>
      </ul>
      <div class="promo__activate">
        <input class="promo__input" type="text" placeholder="Введите промокод" autocomplete="off">
        <button class="button button--special">Применить</button>
      </div>
    `;

    return columnDOM;
  }

  createConfirmColumnDOM(): HTMLDivElement {
    const columnDOM = this.createColumnDOM() as HTMLDivElement;
    columnDOM.innerHTML = `<button id="orderingButton" class="button promo__button">Оформить заказ</button>`;

    return columnDOM;
  }

  createColumnDOM(): HTMLDivElement {
    const columnDOM = document.createElement('div');
    columnDOM.classList.add('promo__column');
    return columnDOM;
  }
}

export default SectionCartTotal;
