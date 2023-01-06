import router from "../../Router";
// import cartStorage from "../../Storage/Cart";

class PaginationControls {

  private pageCount: string;
  private paginationControlsWrapper: HTMLDivElement;
  private paginationLimitInput: HTMLInputElement;
  private paginationPrevBtn: HTMLButtonElement;
  private paginationPageNumInput: HTMLInputElement;
  private paginationNextBtn: HTMLButtonElement;

  constructor(pageCount: number) {
    this.pageCount = pageCount.toString()
    this.paginationControlsWrapper = document.createElement('div');

    this.paginationLimitInput = document.createElement('input');
    this.paginationLimitInput.type = 'number';
    this.paginationLimitInput.value = '3';
    this.paginationLimitInput.onchange = () => {
      router.goTo(`/cart?limit=${this.paginationLimitInput.value}&page=1`)
    } //this.route('limit', this.paginationLimitInput.value);
    this.paginationControlsWrapper.appendChild(this.paginationLimitInput);

    this.paginationPrevBtn = document.createElement('button');
    this.paginationPrevBtn.textContent = '<';
    // this.paginationPrevBtn.disabled = true;
    this.paginationPrevBtn.onclick = () => this.decrPageNum();
    this.paginationControlsWrapper.appendChild(this.paginationPrevBtn);

    this.paginationPageNumInput = document.createElement('input');
    this.paginationPageNumInput.type = 'number';
    this.paginationPageNumInput.value = '1';
    this.paginationPageNumInput.disabled = true;
    this.paginationControlsWrapper.appendChild(this.paginationPageNumInput);

    this.paginationNextBtn = document.createElement('button');
    this.paginationNextBtn.textContent = '>';
    this.paginationNextBtn.onclick = () => this.incrPageNum()
    this.paginationControlsWrapper.appendChild(this.paginationNextBtn);
    console.log('pageCountCtrl', pageCount)
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
    // if (+pageParam[0] > +this.pageCount) {
    //   console.log('ssssss', +pageParam[0], this.pageCount)
    //   router.goTo(`/cart?limit=6&page=1`)
    // }
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

