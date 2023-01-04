import dataStorage from '.';
import { ICartProduct } from '../Types';


class CartStorage {

  private cartProducts: ICartProduct[]

  constructor() {
    this.cartProducts = [];
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
}

const cartStorage = new CartStorage();

export default cartStorage;
