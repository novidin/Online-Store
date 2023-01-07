import cartStorage from "../../Storage/Cart";
class SectionCartTotal {

  private totalWrapper: HTMLElement;
  private totalColumn: HTMLElement;

  constructor() {
    this.totalWrapper = document.createElement('div');
    this.totalWrapper.className = 'promo__content';

    this.totalColumn = document.createElement('div');
    this.totalColumn.className = 'promo__column';
    this.totalWrapper.appendChild(this.totalColumn);

    window.addEventListener('addedToCard', () => {
      console.log('kjgkjhkjh')
      this.buildTotalColumnHTML();
    })
  }

  getHTML() {

    this.buildTotalColumnHTML();
    return this.totalWrapper;
  }

  buildTotalColumnHTML(promoPerc = 0) {
    this.totalColumn.innerHTML = '';
    const cartCount = cartStorage.getCountProducts().toString();
    const cartTotal = cartStorage.getTotal().toString();
    // const totalSum = +cartCount * +cartTotal;
    const promoSum = +cartTotal * (promoPerc / 100);
    this.totalColumn.innerHTML = `
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
    `
  }
}
export default SectionCartTotal;
