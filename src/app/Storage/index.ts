import { IProducts, IProduct, IFilterItems, IReqParams } from "../Types/index";
import { products } from "./data";

class DataStorage {

  private products: IProduct[];
  private currentProducts: IProduct[];

  constructor() {
    this.products = DataStorage.convertProductsToArray(products);
    this.currentProducts = this.products;
  }

  private static convertProductsToArray(products: IProducts): IProduct[] {
    const array: IProduct[] = [];

    for (const key in products) {
      const newObjProduct: IProduct = Object.assign({name: key}, products[key]);
      array.push(newObjProduct);
    }

    return array;
  }

  getSeasons(): IFilterItems {
    const result: IFilterItems = {};

    this.products.forEach((product) => {
      if(product.season in result) {
        result[product.season].total += 1;
      } else {
        result[product.season] = {curr: 0, total: 1};
      }
    })

    return result;
  }

  getCurrSeasons(): IFilterItems {
    const result: IFilterItems = Object.assign({}, this.getSeasons());

    this.currentProducts.forEach((product) => {
      if(product.season in result) {
        result[product.season].curr += 1;
      }
    })

    return result;
  }

  getCurrProducts() {
    return this.currentProducts;
  }

  getProductById(id: string): IProduct {
    return this.products.filter((product) => product.id === id)[0];
  }

  setFilters(reqParams: IReqParams) {
    let products = [...this.products];

    for (const key in reqParams) {
      if (reqParams[key].filter((reqParam) => reqParam)) {
        products = DataStorage.filterItems(key, reqParams[key], products);
      }
    }
    this.currentProducts = products;
    return this.currentProducts;
  }

  private static filterItems(key: string, value: string[], products: IProduct[]): IProduct[] {
    const prodKey = key as keyof IProduct;

    return products.filter((product) => value.includes(product[prodKey].toString()));
  }

}

const dataStorage = new DataStorage();

export default dataStorage;
