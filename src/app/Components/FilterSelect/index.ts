import router from "../../Router";
import dataStorage from "../../Storage";


class FilterSelect {

  private keySearch;
  private title;

  constructor(keySearch: string, title: string) {
    this.keySearch = keySearch;
    this.title = title;
  }

  getFilterDOM() {
    const sizesValues = dataStorage.getValuesByKey(this.keySearch);
    const select = document.createElement('select');
    select.className = 'select__select';
    const defaultOption = document.createElement('option');
    defaultOption.hidden = true;
    defaultOption.textContent = this.title;
    select.appendChild(defaultOption);
    const optionAll = document.createElement('option');
    optionAll.textContent = 'Все';
    optionAll.value = '';
    optionAll.className = 'select__option';
    select.appendChild(optionAll);

    for (const key in sizesValues) {
      const option = document.createElement('option');
      option.textContent = key;
      option.value = key;
      option.className = 'select__option';
      select.appendChild(option);
    }

    let value = '';

    const reqParams =  router.getReqParamsAll();
    if (this.keySearch in reqParams) {
      const routerParams = router.getReqParamsAll();
      if (routerParams) {
        value = routerParams[this.keySearch][0];
      }
      select.value = value
    }

    select.onchange = () => {
      this.route(select.value)
    }

    return select;
  }

  route(param: string): void {
    router.setReqParams(this.keySearch, param)
  }
}

export default FilterSelect;
