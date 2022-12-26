export interface IReqParams {
  [key: string]: string[]
}

export interface IProductsItem {
  id: string;
  brand: string;
  model: string;
  season: string;
  count: string;
  protector: string;
  price: string;
  imageUrl: string[];
  sizes: {
    width: string;
    profile: string;
    radius: string;
  };
  rating: {
    overageRating: string;
    commentsCount: string;
  }
}

export interface IProduct extends IProductsItem {
  name: string;
}

export interface IProducts {
  [key: string]: IProductsItem
}

export interface IFilterItems {
  [key: string]: {curr: number, total: number};
}
