import App from './app/App';

import './styles/main.scss';

const app = new App();
app.start();


/* ===================================================== */
/*
window.onload = ():void => {
  // Хедер, адресс магазинов (для показа 404)
  const addressesDOM = document.getElementById('addresses') as HTMLElement;
  const mainDOM = document.querySelector('.main') as HTMLElement;
  // Вкладка шины
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

      const showFilters = ():void => {
        const filtersButtonDOM = document.getElementById('filtersButton') as HTMLButtonElement;
        const filtersGridDOM = document.querySelector('.filters__grid') as HTMLDivElement;
        const filtersButtonIconDOM = document.querySelector('.icon--arrow-down') as HTMLElement;

        filtersButtonDOM.addEventListener('click', (e: Event) => {
          e.preventDefault();
          filtersGridDOM.style.display = filtersGridDOM.style.display !== 'flex' ? 'flex' : '';
          filtersButtonIconDOM.style.transform = filtersButtonIconDOM.style.transform === '' ? 'rotate(-180deg)' : '';
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

      showFilters();
      multiRange();

      // Open product page
      renderProductPage();
    })
  }

  const renderProductPage = (): void => {
    const productTitleDOM = document.getElementById('productTitle') as HTMLDivElement;

    productTitleDOM.addEventListener('click', ():void => {
      deleteChildsInMain();

      const productTemplateDOM = document.getElementById('product') as HTMLTemplateElement;
      const product = productTemplateDOM.content.cloneNode(true) as DocumentFragment;

      mainDOM.append(product);
    });
  }

  const deleteChildsInMain = ():void => {
    while (mainDOM.firstChild) {
      mainDOM.removeChild(mainDOM.firstChild);
    }
  };

  renderNotFoundPage();
  renderTiresPage();
}
*/
