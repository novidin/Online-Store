import { IProducts, IProduct, IFilterItems, IReqParams } from "../Types/index";
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
      const newObjProduct: IProduct = Object.assign({name: key}, products[key]);
      array.push(newObjProduct);
    }

    return array;
  }

  getSeasons(): IFilterItems {
    const result: IFilterItems = {};
    this.products.forEach((el) => {
      if(el.season in result) {
        result[el.season].total += 1;
      } else {
        result[el.season] = {curr: 0, total: 1};
      }
    })

    return result;
  }

  getCurrSeasons(): IFilterItems {
    const result: IFilterItems = Object.assign({}, this.getSeasons());
    console.log('REZ', result)
    this.currentProducts.forEach((el) => {
      if(el.season in result) {
        result[el.season].curr += 1;
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
      if (reqParams[key].filter((el) => el)) {
        products = this.filterItems(key, reqParams[key], products)
      }
    }
    this.currentProducts = products;
    return this.currentProducts;
  }

  filterItems(key: string, value: string[], data: IProduct[]): IProduct[] {
    const prodKey = key as keyof IProduct;
    return data.filter((el) => value.includes(el[prodKey].toString()));
  }

}

const dataStorage = new DataStorage();

export default dataStorage;
