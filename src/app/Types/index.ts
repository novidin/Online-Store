export interface IReqParams {
  [key: string]: string[]
}

export interface IProductsItem {
  id: string;
  brand: string;
  model: string;
  season: string;
  count: string;
  price: string;
  imageUrl: string[];
  sizes: ISizes;
  rating: IRating,
  features: IFeatures
}

interface IRating {
  overageRating: string;
  commentsCount: string;
}

interface IFeatures {
  protector: string;
  weight: string;
  exploitation: string;
  discProtector: string;
  loadIndex: string;
  speedIndex: string
}

interface ISizes {
  width: string;
  profile: string;
  radius: string;
}

export type IProductValue = string | string[] | IRating | IFeatures | ISizes;

export interface IProduct extends IProductsItem {
  // [key: string]: IProductValue;
  name: string;
  size: string;
}



export interface IProducts {
  [key: string]: IProductsItem
}

export interface IFilterItems {
  [key: string]: { curr: number, total: number };
}

export interface ICartProduct {
  id: string;
  count: number;
}
