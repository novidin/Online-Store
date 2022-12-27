import App from './app/App';
import MultiRange from './app/MultiRange';
import './styles/main.scss';

const app = new App();
app.start();


/* ===================================================== */

window.onload = ():void => {
  const addressesDOM = document.getElementById('addresses') as HTMLElement;
  const mainDOM = document.querySelector('.main') as HTMLElement;
  const tiresDOM = document.getElementById('tires') as HTMLElement;

  const renderNotFoundPage = ():void => {
    addressesDOM.addEventListener('click', ():void => {
      deleteChildsInMain();

      const notFoundDOM = document.createElement('div') as HTMLElement;
      notFoundDOM.classList.add('not-found');
      notFoundDOM.innerHTML = `<div class="wrapper"><span class="not-found__image"></span><p class="not-found__title">Ой! Что-то пошло не так...</p></div>`;

      mainDOM.append(notFoundDOM);
    });
  }

  const renderTiresPage = ():void => {
    tiresDOM.addEventListener('click', ():void => {
      deleteChildsInMain();

      const filtersTemplateDOM = document.getElementById('filters') as HTMLTemplateElement;
      const catalogTemplateDOM = document.getElementById('catalog') as HTMLTemplateElement;

      const filters = filtersTemplateDOM.content.cloneNode(true) as DocumentFragment;
      const catalog = catalogTemplateDOM.content.cloneNode(true) as DocumentFragment;

      mainDOM.append(filters);
      mainDOM.append(catalog);

      multiRange();
    })
  }

  const multiRange = ():void => {
    const multiRangePriceDOM = document.getElementById('multiRangePrice') as HTMLElement;
    const multiRangePriceProgressDOM = document.getElementById('multiRangePriceProgress') as HTMLElement;
    const multiRangePriceInputValueDOM = document.querySelectorAll('#multiRangePrice .multi-range__value') as NodeListOf<HTMLInputElement>
    const multiRangePriceInputRangeDOM = document.querySelectorAll('#multiRangePrice .multi-range__range') as NodeListOf<HTMLInputElement>
    const multiRangePrice = new MultiRange(multiRangePriceDOM, multiRangePriceInputValueDOM, multiRangePriceInputRangeDOM, multiRangePriceProgressDOM);
    multiRangePrice.start();

    const multiRangeCountDOM = document.getElementById('multiRangeCount') as HTMLElement;
    const multiRangeCountProgressDOM = document.getElementById('multiRangeCountProgress') as HTMLElement;
    const multiRangeCountInputValueDOM = document.querySelectorAll('#multiRangeCount .multi-range__value') as NodeListOf<HTMLInputElement>
    const multiRangeCountInputRangeDOM = document.querySelectorAll('#multiRangeCount .multi-range__range') as NodeListOf<HTMLInputElement>
    const multiRangeCount = new MultiRange(multiRangeCountDOM, multiRangeCountInputValueDOM, multiRangeCountInputRangeDOM, multiRangeCountProgressDOM);
    multiRangeCount.start();
  }

  const deleteChildsInMain = ():void => {
    while (mainDOM.firstChild) {
      mainDOM.removeChild(mainDOM.firstChild);
    }
  };

  renderNotFoundPage();
  renderTiresPage();
}
