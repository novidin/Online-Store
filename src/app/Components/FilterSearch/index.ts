import ButtonCopyURL from "../ButtonCopyURL";
import router from "../../Router";

class FilterSearch {

  private wrapper: HTMLDivElement;
  private updateCallback: <T>(thisObj: T) => void;
  private inputValue: string;

  constructor(updateCallback: <T>(thisObj: T) => void) {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'search__container';
    this.updateCallback = updateCallback;
    this.inputValue = '';
  }

  getHTML(): HTMLDivElement {
    this.wrapper.innerHTML = '';

    const searchInput = document.createElement('input');

    searchInput.className = 'search__input';
    searchInput.type = 'search';
    searchInput.placeholder = 'Поиск';
    searchInput.autocomplete = 'off';
    searchInput.value = FilterSearch.getSearchValue();
    this.wrapper.appendChild(searchInput);

    const buttonsWrapper = document.createElement('div');

    buttonsWrapper.className = 'search__buttons';
    this.wrapper.appendChild(buttonsWrapper);

    const searchButton = document.createElement('button');

    searchButton.className = 'button search__button-search';
    searchButton.textContent = 'Найти';
    searchButton.onclick = () => {
      this.inputValue = searchInput.value.trim();
      this.route();
    }
    buttonsWrapper.appendChild(searchButton);

    const buttonCopyURL = new ButtonCopyURL();

    buttonsWrapper.appendChild(buttonCopyURL.getHTML());

    return this.wrapper;
  }

  private static getSearchValue(): string {
    const reqParams = router.getReqParamsAll()['search'];
    if (reqParams) return reqParams[0];
    return '';
  }

  private route(): void {
    if (this.inputValue.trim()) {
      router.setReqParams('search', this.inputValue);
      this.updateCallback(this);
    }
  }
}

export default FilterSearch;
