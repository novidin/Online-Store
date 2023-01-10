import router from "../../Router";
import dataStorage from "../../Storage";
import { seasonNames } from "../../Storage/consts";
import { IFilterItems } from "../../Types/index"

class FilterSeason {

  private seasonsVals: IFilterItems;
  private ul: HTMLUListElement;
  private updateCallback: <T>(thisObj: T) => void;

  constructor(updateCallback: <T>(thisObj: T) => void) {
    this.seasonsVals = dataStorage.getValuesByKey('season');
    this.ul = document.createElement('ul');
    this.ul.className = 'season__list';
    this.updateCallback = updateCallback;
  }

  getHTML(): HTMLUListElement {
    this.update();
    return this.ul;
  }

  update(): void {
    this.seasonsVals = dataStorage.getValuesByKey('season');
    this.ul.innerHTML = '';

    for (const seasonKey in this.seasonsVals) {
      const li = document.createElement('li');

      li.className = 'season__item';

      const title = document.createElement('span');

      title.className = 'season__title';
      title.textContent = seasonNames[seasonKey];
      li.appendChild(title);

      const controlWrapper = document.createElement('div');

      controlWrapper.className = 'season__control';
      li.appendChild(controlWrapper);

      const input = document.createElement('input');

      input.type = 'checkbox';
      input.value = seasonKey;
      input.className = 'season__check';
      input.id = seasonKey;
      if (FilterSeason.isChecked(seasonKey)) input.checked = true;
      input.onchange = () => {
        this.route();
      }
      controlWrapper.appendChild(input);

      const label = document.createElement('label');

      label.className = 'season__label';
      label.setAttribute('for', seasonKey);
      controlWrapper.appendChild(label);

      const icon = document.createElement('span');

      icon.className = `icon icon--${seasonKey}`;
      label.appendChild(icon);

      this.ul.appendChild(li)
    }
  }

   private getChecked(): string[] {
    const selected = this.ul.querySelectorAll<HTMLInputElement>('input:checked');

    return [...selected].map((input) => input.value);
  }

  private static isChecked(val: string): boolean {
    const reqParams = router.getReqParamsAll()['season'];

    if (!reqParams) return false;

    return reqParams.includes(val);
  }

  private route(): void {
    router.setReqParams('season', this.getChecked().join(','));
    this.updateCallback(this);
  }
}



export default FilterSeason;
