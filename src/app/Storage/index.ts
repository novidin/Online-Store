import { IProducts, IProduct, IFilterItems, IReqParams } from '../Types';
import products from './data.json';

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
        size: `${products[key].sizes.width}/${products[key].sizes.profile} R${products[key].sizes.radius}`,
        productRating: products[key].rating.overageRating
      }
      const newObjProduct: IProduct = Object.assign(newObjParams, products[key]);
      array.push(newObjProduct);
    }
    console.log(array)
    return array;
  }

  getValuesByKey(key: string, withCurrent?: boolean) {
    const result: IFilterItems = {};
    const prodKey = key as keyof IProduct;
    this.products.forEach((product) => {
      const value = product[prodKey].toString();

      if (value in result) {
        result[value].total += 1;
      } else {
        result[value] = { curr: 0, total: 1 };
      }
    })

    if (withCurrent) {
      this.currentProducts.forEach((product) => {
        const value = product[prodKey].toString();
        if (value in result) {
          result[value].curr += 1;
        }
      })
    }

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
        if (['price', 'count'].includes(key)) {
          products = DataStorage.filterRangeItems(key, reqParams[key], products);
        } else if (key in products[0]) {
          products = DataStorage.filterEqualItems(key, reqParams[key], products);
        } else if (key === 'search') {
          products = DataStorage.filterSearchedItems(reqParams[key], products)
        } else if (key === 'sort') {
          const [prodKey, order] = reqParams[key][0].split('-')
          products = DataStorage.sortItemsBy(prodKey, order, products)
        }
      }
    }
    this.currentProducts = products;
    return this.currentProducts;
  }

  private static sortItemsBy(key: string, order: string, products: IProduct[]): IProduct[] {
    const prodKey = key as keyof IProduct;
    return products.sort((a, b) => order === 'ASC' ? (+a[prodKey] - +b[prodKey]) : (+b[prodKey] - +a[prodKey]));
  }

  private static filterSearchedItems(value: string[], products: IProduct[]): IProduct[] {

    const temp = products.filter((product) => {
      let isSearched = false;

      for (const key in product) {
        const prodKey = key as keyof IProduct;
        if (!['id', 'imageUrl'].includes(key) && (product[prodKey].toString().toLowerCase().indexOf(value[0].toLowerCase()) >= 0)) {
          isSearched = true;
        }
      }
      return isSearched;
    })

    console.log('temp', temp);
    return temp;
  }

  private static filterRangeItems(key: string, value: string[], products: IProduct[]): IProduct[] {
    const prodKey = key as keyof IProduct;
    const [min, max] = value
    return products.filter((product) => (+min <= +product[prodKey]) && (+product[prodKey] <= +max));
  }

  private static filterEqualItems(key: string, value: string[], products: IProduct[]): IProduct[] {
    const prodKey = key as keyof IProduct;
    return products.filter((product) => value.includes(product[prodKey]?.toString()));
  }

}

const dataStorage = new DataStorage();

export default dataStorage;
