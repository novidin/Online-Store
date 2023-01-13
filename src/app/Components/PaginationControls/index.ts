import router from '../../Router';
import cartStorage from '../../Storage/Cart';


class PaginationControls {

  private pageCount: string;
  private paginationControlsWrapper: HTMLDivElement;
  private paginationLimitInput: HTMLInputElement;
  private paginationPrevBtn: HTMLButtonElement;
  private paginationPageNumInput: HTMLInputElement;
  private paginationNextBtn: HTMLButtonElement;

  constructor() {
    this.pageCount = cartStorage.getPagesCount().toString();
    this.paginationControlsWrapper = document.createElement('div');
    this.paginationControlsWrapper.className = 'pagination';

    /* Limit */

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
    this.paginationLimitInput.min = '1';
    this.paginationLimitInput.onchange = () => {

      cartStorage.setLimitProducts(+this.paginationLimitInput.value);
      this.goToLastPage();
      this.setButtonsState();
      this.route('limit', this.paginationLimitInput.value);
    }
    paginationLimitWrapper.appendChild(this.paginationLimitInput);

    /* Page */

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

  }

  getHTML() {
    this.pageCount = cartStorage.getPagesCount().toString();
    this.setButtonsState();
    return this.paginationControlsWrapper;
  }

  goToLastPage() {
    this.pageCount = cartStorage.getPagesCount().toString();
    let pageValue = +this.paginationPageNumInput.value;
    if (pageValue > +this.pageCount) {
      pageValue = +this.pageCount;
      this.setPageNum(pageValue);
    }
  }

  goToFirstPage() {
    this.setPageNum(1);
  }

  setValuesFromReqParams(limitVal: number) {
    this.setLimitValue(limitVal.toString())
  }

  setLimitValue(limitVal: string) {
    this.paginationLimitInput.value = limitVal;
    cartStorage.setLimitProducts(+this.paginationLimitInput.value);
    this.setButtonsState();
  }

  setButtonsState() {
    this.pageCount = cartStorage.getPagesCount().toString();
    this.paginationPrevBtn.disabled = (this.paginationPageNumInput.value === '1');
    this.paginationNextBtn.disabled = (this.paginationPageNumInput.value === this.pageCount);
  }

  setPageNum(pageNum: number) {
    this.setButtonsState();
    this.paginationPageNumInput.value = pageNum.toString();
    this.route('page', this.paginationPageNumInput.value);
  }

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

