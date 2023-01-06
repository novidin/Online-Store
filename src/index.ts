import App from './app/App';

import './styles/main.scss';

// const app = new App();
// app.start();


/* ===================================================== */
/*
window.onload = ():void => {
  const mainDOM = document.querySelector('.main') as HTMLElement;
  // Вкладка шины
  const tiresDOM = document.getElementById('tires') as HTMLElement;
  const cartLinkDOM = document.getElementById('cartLink') as HTMLElement;

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
    const productTitleDOM = document.querySelector('.product__title') as HTMLDivElement;

    productTitleDOM.addEventListener('click', ():void => {
      deleteChildsInMain();

      const productTemplateDOM = document.getElementById('product') as HTMLTemplateElement;
      const product = productTemplateDOM.content.cloneNode(true) as DocumentFragment;

      mainDOM.append(product);
    });
  }

  const renderCartPage = (): void => {
    cartLinkDOM.addEventListener('click', () => {
      deleteChildsInMain();

      const isCartEmpty = true;

      if (isCartEmpty) {
        const cartTemplateDOM = document.getElementById('cart') as HTMLTemplateElement;
        const cart = cartTemplateDOM.content.cloneNode(true) as DocumentFragment;

        mainDOM.append(cart);

        const orderingTemplateDOM = document.getElementById('ordering') as HTMLTemplateElement;
        const ordering = orderingTemplateDOM.content.cloneNode(true) as DocumentFragment;

        mainDOM.append(ordering);

        const orderingButtonDOM = document.getElementById('orderingButton') as HTMLButtonElement;
        const orderingDOM = document.querySelector('.ordering') as HTMLElement;
        const shadowDOM = document.querySelector('.shadow') as HTMLElement;

        orderingButtonDOM.addEventListener('click', () => {
          orderingDOM.classList.add('ordering--active');
          shadowDOM.classList.add('shadow--active');
        });

        shadowDOM.addEventListener('click', () => {
          orderingDOM.classList.remove('ordering--active');
          shadowDOM.classList.remove('shadow--active');
        })

      } else {
        const emptyCartMessageDOM = document.createElement('div') as HTMLElement;
        emptyCartMessageDOM.classList.add('cart');
        emptyCartMessageDOM.innerHTML = `<p class="cart__empty">Ваша корзина пуста</p>`;

        mainDOM.append(emptyCartMessageDOM);
      }
    });
  }

  const deleteChildsInMain = ():void => {
    while (mainDOM.firstChild) {
      mainDOM.removeChild(mainDOM.firstChild);
    }
  };

  renderTiresPage();
  renderCartPage();
}
*/
