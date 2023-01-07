import { ICartProduct } from '../Types';

class Paginator {

  private items: ICartProduct[];
  private limit: number;
  private paginatedItems: Array<ICartProduct[]>;

  constructor(items?: ICartProduct[], limit?: number) {
    this.items = items || [];
    this.limit = limit || 3;
    this.paginatedItems = this.getPaginatedItems();
  }

  getPagesCount() {
    return Math.ceil(this.items.length / this.limit);
  }

  getPaginatedItems() {
    const paginatedItems = [];
    const pagesCount = this.getPagesCount();
    const items = this.items;
    const lastItemIdx = items.length;
    const limit = this.limit;

    for(let i = 1; i <= pagesCount; i += 1) {
      const startIdx: number = (i - 1) * limit;
      const templastIdx = ((i - 1) * limit) + limit - 1;
      const lastIdx: number = templastIdx >= lastItemIdx ? lastItemIdx : templastIdx;
      paginatedItems.push(this.items.slice(startIdx, lastIdx + 1));
    }

    return paginatedItems;
  }

  getPageItems(pageNum: number) {
    console.log('PAGGGGG', pageNum, this.paginatedItems[+pageNum - 1])
    return this.paginatedItems[+pageNum - 1];
  }


  setItems(items: ICartProduct[]) {
    this.items = items;
    this.paginatedItems = this.getPaginatedItems();
  }

  setLimit(limit: number) {
    this.limit = limit;
    this.paginatedItems = this.getPaginatedItems();
  }

}

export default Paginator;
