export interface IReqParams {
  [key: string]: string[]
}

export interface IProduct {
  id: string;
  name?: string;
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

export interface IProducts {
  [key: string]: IProduct
}
