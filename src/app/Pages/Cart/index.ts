import { IReqParams } from "../../Types/index";
import pageHeader from "../../Components/PageHeader/index";
import pageFooter from "../../Components/PageFooter/index";
import cartStorage from "../../Storage/Cart";
import PaginationControls from "../../Components/PaginationControls";
import SectionCartProducts from "../../Components/SectionCartProducts";
import SectionCartTotal from "../../Components/SectionCartTotal";
import OrderingModal from "../../Components/OrderingModal";
import router from "../../Router";


class CartPage {

  private sectionCartProducts: SectionCartProducts;
  private sectionCartProductsHTML?: HTMLDivElement;
  private paginationSection: HTMLElement;
  private main: HTMLElement;
  private cartWrapper: HTMLElement;
  private totalWrapper: HTMLElement;
  private paginationControls: PaginationControls;
  private sectionCartTotal: SectionCartTotal;

  constructor() {
    this.paginationControls = new PaginationControls();
    this.sectionCartProducts = new SectionCartProducts(this.goFirstPage.bind(this));
    this.sectionCartProductsHTML;

    this.paginationSection = document.createElement('section');
    this.paginationSection.className = 'cart__section';

    this.main = document.createElement('main');
    this.main.className = 'main';

    this.cartWrapper = document.createElement('div');
    this.cartWrapper.className = 'cart';

    // this.paginationControls = new PaginationControls();

    this.totalWrapper = document.createElement('div');
    this.totalWrapper.className = 'promo';
    this.totalWrapper.innerHTML = '<h3 class="promo__header">Заказ</h3>';
    this.sectionCartTotal = new SectionCartTotal();
  }

  render(reqParams: IReqParams): void {
    document.title = `Online Store — Корзина`;
    this.buildMainHTML(reqParams);
    document.body.innerHTML = '';
    document.body.appendChild(pageHeader.getHTML());
    document.body.appendChild(this.main);
    this.main.appendChild(this.cartWrapper);
    document.body.appendChild(pageFooter.getHTML());
  }

  private buildMainHTML(reqParams: IReqParams): void {
    const cartProducts = cartStorage.getCartProducts();

    if (!cartProducts.length) {
      this.cartWrapper.innerHTML = '<p class="cart__empty">Ваша корзина пуста</p>';
      return;
    }

    this.cartWrapper.innerHTML = '';
    this.cartWrapper.appendChild(this.paginationSection);
    this.checkBuyNow(reqParams);
    this.buildPagination();
    this.setPaginationVals(reqParams);
    this.buildTotal();
    this.update(reqParams);
    this.startListeners();
  }

  private showOrderingModal(): void {
    const orderingModalDOM = new OrderingModal();
    orderingModalDOM.start();
  }

  private checkBuyNow(reqParams: IReqParams): void {
    if (reqParams.buy) {
      router.resetReqParams();
      this.showOrderingModal();
    }
  }

  private buildTotal(): void {
    this.cartWrapper.appendChild(this.totalWrapper);
    this.totalWrapper.appendChild(this.sectionCartTotal.getHTML());
  }

  private buildPagination(): void {
    this.paginationSection.appendChild(this.paginationControls.getHTML());
  }

  private goFirstPage(): void {
    this.paginationControls.goToFirstPage();
  }

  private setPaginationVals(reqParams: IReqParams): void {
    const limitVal = (reqParams.limit && reqParams.limit[0]) ?  +reqParams.limit[0] : 3;

    this.paginationControls.setValuesFromReqParams(limitVal)
  }

  private buildProductsHTML(pageNum = 1): void {
    const cartProducts = cartStorage.getCartProducts();

    if (!cartProducts.length) {
      this.cartWrapper.innerHTML = '<p class="cart__empty">Ваша корзина пуста</p>';
      return;
    }

    this.sectionCartProductsHTML?.remove();
    this.sectionCartProductsHTML = this.sectionCartProducts.getHTML(pageNum) as HTMLDivElement;
    this.paginationSection.appendChild(this.sectionCartProductsHTML);
  }

  private startListeners(): void {
    const orderingButtonDOM = this.cartWrapper.querySelector('.promo__button') as HTMLButtonElement;

    orderingButtonDOM.addEventListener('click', () => {
      this.showOrderingModal();
    })
  }

  update(reqParams: IReqParams): void {
    let pageVal = 1;

    if (reqParams.page && reqParams.page[0]) pageVal = +reqParams.page[0]
    this.buildProductsHTML(pageVal);
  }

}

export default CartPage;
