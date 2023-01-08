import router from "../../Router";

/**
*  TODO: bug in automatic swithing to last page when limit changed
*/

class PaginationControls {

  private readonly pageCount: string;
  private readonly paginationControlsWrapper: HTMLDivElement;
  private readonly paginationLimitInput: HTMLInputElement;
  private readonly paginationPrevBtn: HTMLButtonElement;
  private readonly paginationPageNumInput: HTMLInputElement;
  private readonly paginationNextBtn: HTMLButtonElement;

  constructor(pageCount: number) {
    this.pageCount = pageCount.toString()
    this.paginationControlsWrapper = document.createElement('div');
    this.paginationControlsWrapper.className = 'pagination';

    /**
     *  Limit
     */

    const paginationLimitWrapper = document.createElement('div');
    paginationLimitWrapper.className = 'pagination__column';
    this.paginationControlsWrapper.appendChild(paginationLimitWrapper);

    const paginationLimitTitle = document.createElement('span');
    paginationLimitTitle.className = 'pagination__title';
    paginationLimitTitle.textContent = 'Лимит';
    paginationLimitWrapper.appendChild(paginationLimitTitle);

    this.paginationLimitInput = document.createElement('input');
    this.paginationLimitInput.className = 'pagination__input';
    this.paginationLimitInput.type = 'number';
    this.paginationLimitInput.value = '3';
    this.paginationLimitInput.onchange = () => {
      // router.goTo(`/cart?limit=${this.paginationLimitInput.value}&page=1`)
      this.route('limit', this.paginationLimitInput.value);
    } //this.route('limit', this.paginationLimitInput.value);
    paginationLimitWrapper.appendChild(this.paginationLimitInput);

    /**
     *  Page
     */

    const paginationPageWrapper = document.createElement('div');
    paginationPageWrapper.className = 'pagination__column pagination__column--end';
    this.paginationControlsWrapper.appendChild(paginationPageWrapper);

    const paginationPageTitle = document.createElement('span');
    paginationPageTitle.className = 'pagination__title';
    paginationPageTitle.textContent = 'Страница';
    paginationPageWrapper.appendChild(paginationPageTitle);

    const paginationCounterWrapper = document.createElement('div');
    paginationCounterWrapper.className = 'pagination__container';
    paginationPageWrapper.appendChild(paginationCounterWrapper);


    this.paginationPrevBtn = document.createElement('button');
    this.paginationPrevBtn.className = 'pagination__button button button--accent';
    this.paginationPrevBtn.textContent = '<';

    // this.paginationPrevBtn.disabled = true;
    this.paginationPrevBtn.onclick = () => this.decrPageNum();
    paginationCounterWrapper.appendChild(this.paginationPrevBtn);

    this.paginationPageNumInput = document.createElement('input');
    this.paginationPageNumInput.className = 'pagination__page';
    this.paginationPageNumInput.value = '1';
    this.paginationPageNumInput.disabled = true;
    paginationCounterWrapper.appendChild(this.paginationPageNumInput);

    this.paginationNextBtn = document.createElement('button');
    this.paginationNextBtn.className = 'pagination__button button button--accent';
    this.paginationNextBtn.textContent = '>';
    this.paginationNextBtn.onclick = () => this.incrPageNum()
    paginationCounterWrapper.appendChild(this.paginationNextBtn);
    // console.log('pageCountCtrl', pageCount)
    this.setLimitValue();
    this.setPageValue();
  }

  // update() {
  //   this.pageCount = cartStorage.getPagesCount.toString();
  // }

  getHTML() {
    return this.paginationControlsWrapper;
  }

  // setLimitParam() {
  //   cartStorage.
  //   this.paginationLimitInput.value;
  // }

  setPageValue() {
    const pageParam = router.getReqParamsAll()['page'];
    if (!pageParam) return false;
    this.paginationPageNumInput.value = pageParam[0]
    // if (this.paginationPageNumInput.value !== pageParam[0]) {
    //   this.paginationPageNumInput.value = pageParam[0]
    // }
    if (+pageParam[0] > +this.pageCount) {
      console.log('ssssss', +pageParam[0], this.pageCount)
      // const limitParam = router.getReqParamsAll()['limit'][0];
      // router.goTo(`/cart?limit=${limitParam}&page=1`);
      this.route('page', '1');
    }
    if (this.paginationPageNumInput.value === '1') {
      this.paginationPrevBtn.disabled = true;
    }

    if (this.paginationPageNumInput.value === this.pageCount) {
      this.paginationNextBtn.disabled = true;
    }
  }

  setLimitValue() {
    const limitParam = router.getReqParamsAll()['limit'];
    if (!limitParam) return false;
    this.paginationLimitInput.value = limitParam[0];
    // if (this.paginationLimitInput.value !== limitParam[0]) {
    //   this.paginationLimitInput.value = limitParam[0];
    // }
  }

  // inputHandler(e: Event) {
  //   const targetInput = e.target;
  //   const pageValue = +this.paginationPageNumInput.value
  // }

  decrPageNum() {
    let pageValue = +this.paginationPageNumInput.value;
    if (pageValue > 1) {
      pageValue -= 1;
      if (pageValue === 1) this.paginationPrevBtn.disabled = true;
    }
    if (pageValue < +this.pageCount) {
      this.paginationNextBtn.disabled = false;
    }
    this.paginationPageNumInput.value = pageValue.toString();
    this.route('page', this.paginationPageNumInput.value);
  }

  incrPageNum() {
    let pageValue = +this.paginationPageNumInput.value;
    if (pageValue < +this.pageCount) {
      pageValue += 1;
      if (pageValue === +this.pageCount) this.paginationNextBtn.disabled = true;
    }
    if (pageValue > 1) {
      this.paginationPrevBtn.disabled = false;
    }
    this.paginationPageNumInput.value = pageValue.toString();
    this.route('page', this.paginationPageNumInput.value);
  }



  private route(key: string, value: string): void {
    router.setReqParams(key, value);
  }
}

export default PaginationControls;

