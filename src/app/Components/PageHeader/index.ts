// import logo from '../../../assets/icons/logo.svg';
// "./assets/icons/logo.svg"
import template from './template.html';
import cartStorage from '../../Storage/Cart';

class PageHaeader {
  getHeaderDOM() {
    const header = document.createElement('header');
    header.className = 'header';

    header.innerHTML = template;

    const cartCounter = header.querySelector('#basketCount') as HTMLSpanElement;

    this.setCartCounter(cartCounter);

    window.addEventListener('addedToCard', () => {
      this.setCartCounter(cartCounter);
    })
    return header;
  }

  setCartCounter(cartCounter: HTMLSpanElement): void {
    const cartCount = cartStorage.getCount().toString();
    const cartTotal = cartStorage.getTotal().toString();
    cartCounter.textContent = `${cartCount}шт/${cartTotal}руб`;
  }
}

const pageHeader = new PageHaeader();
export default pageHeader;
