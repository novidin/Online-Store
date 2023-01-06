import dataStorage from '.';
import { ICartProduct} from '../Types';
import Paginator from './Paginator';


class CartStorage {

  private cartProducts: ICartProduct[];
  private paginator: Paginator;

  constructor() {
    this.cartProducts = [
      { id: '1', count: 2 },
      { id: '7', count: 1 },
      { id: '4', count: 1 },
      { id: '13', count: 1 },
      { id: '15', count: 1 },
      { id: '18', count: 2 },

    ];

    this.paginator = new Paginator(this.cartProducts);
  }

  addProduct(id: string) {
    if (this.isProductInCart(id)) {
      const cartProduct = this.cartProducts.find((cartProd) => cartProd.id === id);
      if (cartProduct) cartProduct.count += 1;
    } else {
      this.cartProducts.push({
        id: id,
        count: 1
      })
    }
    console.log('cart', this.cartProducts)
  }

  removeProduct(id: string) {
    const cartProduct = this.cartProducts.find((cartProd) => cartProd.id === id);
    if (cartProduct) {
      cartProduct.count -=1;
      if (cartProduct.count === 0) {
        this.cartProducts = this.cartProducts.filter((cartProd) => cartProd.count !== 0);
      }
    }
    console.log('cart', this.cartProducts)
  }

  getCartProducts() {
    return this.cartProducts;
  }

  getOrderedProducts() {
    const orderedProducts = this.cartProducts.map((cartProd, i) => {
      cartProd.num = i + 1;
      return cartProd;
    } );
    return orderedProducts;
  }


  getCount() {
    return this.cartProducts.length;
  }

  getTotal() {
    return this.cartProducts.reduce((sum, cartProd) => sum + (+this.getPriceById(cartProd.id) * +cartProd.count), 0);
  }

  getPriceById(id: string) {
    const product = dataStorage.getProductById(id);
    return +product.price;
  }

  isProductInCart(id: string) {
    const productInCart = this.cartProducts.filter((cartProd) => cartProd.id === id);
    return !!productInCart.length;
  }

  /* pagination */

  setLimitProducts(limit: number) {
    this.paginator.setLimit(limit);
  }

  getPagesCount() {
    return this.paginator.getPagesCount();
  }

  getPaginatedItems(page = 1) {

    this.paginator.setItems(this.getOrderedProducts());
    return this.paginator.getPageItems(page);
  }

}

const cartStorage = new CartStorage();

export default cartStorage;
