import { IProducts, IProduct, IFilterItems, IReqParams } from "../Types/index";
import products from "./data.json";

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
      const newObjParams = {
        name: key,
        size: `${products[key].sizes.width}/${products[key].sizes.profile} R${products[key].sizes.radius}`
      }
      const newObjProduct: IProduct = Object.assign(newObjParams, products[key]);
      array.push(newObjProduct);
    }
    console.log(array)
    return array;
  }

  // getSeasons(): IFilterItems {
  //   const result: IFilterItems = {};

  //   this.products.forEach((product) => {
  //     if(product.season in result) {
  //       result[product.season].total += 1;
  //     } else {
  //       result[product.season] = {curr: 0, total: 1};
  //     }
  //   })

  //   return result;
  // }

  // getCurrSeasons(): IFilterItems {
  //   const result: IFilterItems = Object.assign({}, this.getSeasons());

  //   this.currentProducts.forEach((product) => {
  //     if(product.season in result) {
  //       result[product.season].curr += 1;
  //     }
  //   })

  //   return result;
  // }

  // getBrands(): IFilterItems {
  //   const result: IFilterItems = {};

  //   this.products.forEach((product) => {
  //     if(product.brand in result) {
  //       result[product.brand].total += 1;
  //     } else {
  //       result[product.brand] = {curr: 0, total: 1};
  //     }
  //   })

  //   return result;
  // }

  // getSizes(): IFilterItems {
  //   const result: IFilterItems = {};

  //   this.products.forEach((product) => {
  //     if(product.size in result) {
  //       result[product.size].total += 1;
  //     } else {
  //       result[product.size] = {curr: 0, total: 1};
  //     }
  //   })

  //   return result;
  // }
/*********************************TEST */
  getValuesByKey(key: string) {
    const result: IFilterItems = {};
    const prodKey = key as keyof IProduct;
    this.products.forEach((product) => {
      const value = product[prodKey].toString();

      if(value in result) {
        result[value].total += 1;
      } else {
        result[value] = {curr: 0, total: 1};
      }
    })

    return result;
  }

/**TEST**************************************/

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
