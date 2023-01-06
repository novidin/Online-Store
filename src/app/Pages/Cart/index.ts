import { IReqParams } from "../../Types/index";
import pageHeader from "../../Components/PageHeader/index";
import pageFooter from "../../Components/PageFooter/index";
import cartStorage from "../../Storage/Cart";
import PaginationControls from "../../Components/PaginationControls";
import SectionCartProducts from "../../Components/SectionCartProducts";
// import router from "../../Router";


class CartPage {

  private sectionCartProducts: SectionCartProducts;
  private sectionCartProductsHTML?: HTMLDivElement;
  private paginationSection: HTMLElement;
  private main: HTMLElement;

  constructor() {

    this.sectionCartProducts = new SectionCartProducts();
    this.sectionCartProductsHTML;
    this.paginationSection = document.createElement('section')
    // this.paginationControls = new PaginationControls(cartStorage.getPagesCount());
    this.main = document.createElement('main');
    this.main.className = 'main';
  }

  render(reqParams: IReqParams): void {
    document.title = `Online Store - Корзина`;
    this.buildMainHTML(reqParams);
    document.body.appendChild(pageHeader.getHeaderDOM());
    document.body.appendChild(this.main);
    document.body.appendChild(pageFooter.getFooterDOM());
  }

  buildMainHTML(reqParams: IReqParams) {
    console.log(reqParams)
    const cartProducts = cartStorage.getCartProducts();

    if (!cartProducts.length) {
      this.main.innerHTML = '<div class="wrapper"><h2>Корзина пуста</h2></div>';
      return;
    }

    this.main.innerHTML = '';
    this.main.appendChild(this.paginationSection);
    this.buildPagination();
    this.setReqParams(reqParams);


  }

  buildPagination() {
    const paginationControls = new PaginationControls(cartStorage.getPagesCount());
    this.paginationSection.appendChild(paginationControls.getHTML());
  }

  buildProductsHTML(pageNum = 1) {
    this.sectionCartProductsHTML?.remove();
    this.sectionCartProductsHTML = this.sectionCartProducts.getHTML(pageNum);
    this.paginationSection.appendChild(this.sectionCartProductsHTML);
  }

  update(reqParams: IReqParams) {

    console.log('UPDATED', reqParams);
    this.setReqParams(reqParams)

  }

  setReqParams(reqParams: IReqParams) {
    console.log('rpar', reqParams);
    if (reqParams.limit) {
     cartStorage.setLimitProducts(+reqParams.limit[0]);
     this.paginationSection.innerHTML = '';
     this.buildPagination();
     //this.buildProductsHTML();
     // router.setReqParams('page', '1');
    }
    if (reqParams.page) {
      this.buildProductsHTML(+reqParams.page[0]);
    } else {
      this.buildProductsHTML();
    }

  }

}

export default CartPage;
