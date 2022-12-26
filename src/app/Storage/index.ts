import { IProducts, IProduct } from "../Types/index";
import { products } from "./data";

class DataStorage {

  private products: IProduct[];
  private currentProducts: IProduct[];
  // private categories: IFilterItems;
  constructor() {
    this.products = this.convertProductsToArray(products);
    this.currentProducts = this.products;
    console.log(this.products)
  }

  convertProductsToArray(products: IProducts): IProduct[] {
    const array: IProduct[] = [];
    for (const key in products) {
      const newObjProduct = Object.assign({}, products[key]);
      newObjProduct.name = key;
      array.push(newObjProduct);
    }

    return array;
  }

  getProductById(id: string): IProduct {
    return this.products.filter((product) => product.id === id)[0];
  }

}

const dataStorage = new DataStorage();

export default dataStorage;
