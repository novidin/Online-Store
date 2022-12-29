import template from './template.html';
import FilterSelect from '../FilterSelect';
import filterSeason from '../FilterSeason';
import router from '../../Router';

class SectionFilters {
  getFiltersDOM() {
    const filtersWrapper = document.createElement('div');
    filtersWrapper.className = 'filters';
    filtersWrapper.innerHTML = template;

    const filterBrands = new FilterSelect('brand', 'Выберите производителя');
    const tplFilterBrand =  filtersWrapper.querySelector('#brandSelect');
    tplFilterBrand?.appendChild(filterBrands.getFilterDOM());

    const filterSizes = new FilterSelect('size', 'Выберите размер');
    const tplFilterSize =  filtersWrapper.querySelector('#sizeSelect');
    tplFilterSize?.appendChild(filterSizes.getFilterDOM());

    const tplFilterSeason = filtersWrapper.querySelector('#seasonList');
    tplFilterSeason?.appendChild(filterSeason.getFilterDOM());

    const tplResetBtn = filtersWrapper.querySelector('#resetButton') as HTMLButtonElement;
    tplResetBtn.onclick = () => {
      router.goTo('/catalog');
    }


    return filtersWrapper;
  }
}

const sectionFilters = new SectionFilters();
export default sectionFilters;
