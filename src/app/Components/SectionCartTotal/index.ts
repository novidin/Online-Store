import cartStorage from '../../Storage/Cart';
import { promocodes } from '../../Storage/promocodes';
import { IPromocode } from '../../Types';

class SectionCartTotal {

  private readonly promoContentDOM: HTMLElement;
  private promocodes: IPromocode[];
  private promoPercent: 0;

  constructor() {
    this.promoContentDOM = this.createContainer();
    this.promocodes = promocodes;
    this.promoPercent = 0

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

  createTotalColumnDOM(): HTMLDivElement {
    const columnDOM = this.createColumnDOM() as HTMLDivElement;

    const cartCount = cartStorage.getCountProducts().toString();
    const cartTotal = cartStorage.getTotal().toString();
    const promoSum = +cartTotal * (this.promoPercent / 100);

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
    const promoList = document.createElement('ul');

    promoList.className = 'promo__activated-list'
    columnDOM.appendChild(promoList);
    this.showActivatedPromocodes(promoList)

    const activateInputsWrapper = document.createElement('div');

    activateInputsWrapper.className = 'promo__activate';
    columnDOM.appendChild(activateInputsWrapper);

    const activateInput = document.createElement('input');

    activateInput.className = 'promo__input';
    activateInput.type = 'text';
    activateInput.placeholder = 'RS, EPAM';
    activateInputsWrapper.appendChild(activateInput);

    const activateButton = document.createElement('button');

    activateButton.className = 'button button--special';
    activateButton.textContent = 'Применить';
    activateButton.onclick = () => {
      if (!activateInput.value) return;
      const [ validCode ] = this.promocodes
                                  .filter((promocode) => (promocode.isActivated === 'false') 
                                    && (promocode.code === activateInput.value));

      if (!validCode) return;  
      validCode.isActivated = 'true';
      this.showActivatedPromocodes(promoList);
      this.promoPercent += +validCode.percent;
      this.promoContentDOM.removeChild(this.promoContentDOM.children[0]);
      this.promoContentDOM.prepend(this.createTotalColumnDOM());
    }
    activateInputsWrapper.appendChild(activateButton);

    return columnDOM;
  }

  showActivatedPromocodes(parentList: HTMLUListElement) {
    parentList.innerHTML = '';
    this.promocodes.forEach((code) => {
      if (('isActivated' in code) && (code['isActivated'] === 'true')) {
        const li = document.createElement('li');

        li.className = 'promo__activated-item';
        li.innerHTML = `
          <span class="promo__activated-code">${code.code}(-${code.percent}%)</span>
        `

        const delButton = document.createElement('button');

        delButton.className = 'promo__activated-delete';
        delButton.textContent = 'Удалить';
        li.appendChild(delButton);
        delButton.onclick = () => {
          code['isActivated'] = 'false';
          this.showActivatedPromocodes(parentList)
          this.promoPercent -= +code.percent;
          this.promoContentDOM.removeChild(this.promoContentDOM.children[0]);
          this.promoContentDOM.prepend(this.createTotalColumnDOM());
        }
        parentList.appendChild(li)
      }
    })
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
