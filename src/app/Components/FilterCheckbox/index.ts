// import router from "../../Router/index";
// import dataStorage from "../../Storage/index";
// import { IFilterItems } from "../../Types/index";

// class FilterCheckbox extends HTMLElement {
//   private seasons: IFilterItems;
//   private wrapper: HTMLDivElement;

//   constructor() {
//     super();
//     this.seasons = dataStorage.getCurrSeasons();
//     this.wrapper = document.createElement('div');
//     const shadowRoot = this.attachShadow({ mode: 'open' });
//     this.render();
//     shadowRoot.appendChild(this.wrapper);
//   }

//   private render() {
//     this.wrapper.innerHTML = '<h2>Seasons</h2>';

//     for (const el in this.seasons) {
//       const itemWrapper = document.createElement('div');
//       const input = document.createElement('input');
//       input.type = 'checkbox';
//       input.id = el;
//       input.value = el;
//       input.name = 'season';
//       if (FilterCheckbox.isChecked(el)) input.checked = true;
//       itemWrapper.appendChild(input);
//       const label = document.createElement('label');
//       label.setAttribute('for', el);
//       label.textContent = el;
//       itemWrapper.appendChild(label);
//       const count = document.createElement('span');
//       count.textContent = `(${this.seasons[el].curr}/${this.seasons[el].total})`;
//       label.appendChild(count);
//       this.wrapper.appendChild(itemWrapper)
//       input.onchange = () => {
//         this.route();
//       }
//     }
//   }

//   private getChecked(): string[] {
//     const selected = this.wrapper.querySelectorAll<HTMLInputElement>('input:checked');
//     return [...selected].map((input) => input.value);
//   }

//   private static isChecked(val: string): boolean {
//     const reqParams = router.getReqParamsAll()['season'];
//     if (!reqParams) return false
//     return reqParams.includes(val);
//   }

//   private route(): void {
//     router.setReqParams('season', this.getChecked().join(','));
//   }
// }



// window.customElements.define('filter-check', FilterCheckbox);

// export default FilterCheckbox;
