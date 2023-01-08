// import template from './template.html';
import FilterSelect from '../FilterSelect';
import FilterSeasons from '../FilterSeason';
import MultiRange from '../MultiRange';
import router from '../../Router';
import FilterSearch from '../FilterSearch';

class SectionFilters {

  private readonly filtersWrapper: HTMLElement;
  private readonly multiRangeCount: MultiRange;
  private readonly multiRangePrice: MultiRange;
  private readonly selectSizes: FilterSelect;
  private readonly selectBrands: FilterSelect
  private readonly filterSeasons: FilterSeasons;
  private filtersObjects: (MultiRange | FilterSelect | FilterSeasons)[];
  private filterSearch: FilterSearch;

  constructor() {
    this.filtersWrapper = document.createElement('div');
    this.filtersWrapper.className = 'filters';

    this.filtersObjects = [];

    const filterSwitcherButton = document.createElement('button');
    filterSwitcherButton.className = 'button button--accent filters__button';
    filterSwitcherButton.innerHTML = 'Фильтры <span class="icon icon--arrow-down"></span>';
    this.filtersWrapper.appendChild(filterSwitcherButton);

    filterSwitcherButton.addEventListener('click', (e: Event): void => {
      e.preventDefault();
      const filtersGridDOM = document.querySelector('.filters__grid') as HTMLDivElement;
      const filtersButtonIconDOM = document.querySelector('.icon--arrow-down') as HTMLElement;

      filtersGridDOM.classList.toggle('filters__grid--open');
      filtersButtonIconDOM.classList.toggle('icon--rotate');
    })

    const filtersGrid = document.createElement('div');
    filtersGrid.className = 'filters__grid';
    this.filtersWrapper.appendChild(filtersGrid);

    const filterSizeWrapper = document.createElement('div');
    filterSizeWrapper.className = 'select filters__cell';
    filterSizeWrapper.innerHTML = '<span class="select__title">Ширина / Профиль / Диаметр</span>';
    this.selectSizes = new FilterSelect('size', 'Выберите размер', this.updateFilters.bind(this));
    filterSizeWrapper.appendChild(this.selectSizes.getFilterDOM());
    this.filtersObjects.push(this.selectSizes);
    filtersGrid.appendChild(filterSizeWrapper);

    const filterBrandWrapper = document.createElement('div');
    filterBrandWrapper.className = 'select filters__cell';
    filterBrandWrapper.innerHTML = '<span class="select__title">Производитель</span>';
    this.selectBrands = new FilterSelect('brand', 'Выберите производителя', this.updateFilters.bind(this));
    filterBrandWrapper.appendChild(this.selectBrands.getFilterDOM());
    this.filtersObjects.push(this.selectBrands);
    filtersGrid.appendChild(filterBrandWrapper);

    const filterSeasonsWrapper = document.createElement('div');
    filterSeasonsWrapper.className = 'season filters__cell filters__cell--v2';
    this.filterSeasons = new FilterSeasons(this.updateFilters.bind(this));
    filterSeasonsWrapper.appendChild(this.filterSeasons.getFilterDOM());
    this.filtersObjects.push(this.filterSeasons);
    filtersGrid.appendChild(filterSeasonsWrapper);

    this.multiRangeCount = new MultiRange('count', 'Кол-во', this.updateFilters.bind(this));
    this.filtersObjects.push(this.multiRangeCount);
    filtersGrid.appendChild(this.multiRangeCount.getHTML());

    this.multiRangePrice = new MultiRange('price', 'Цена', this.updateFilters.bind(this));
    this.filtersObjects.push(this.multiRangePrice);
    filtersGrid.appendChild(this.multiRangePrice.getHTML());

    const filtersResetButton = document.createElement('button');
    filtersResetButton.className = 'filters__cell--button button button--accent';
    filtersResetButton.textContent = 'Сброс';
    filtersResetButton.onclick = () => {
      router.resetReqParams();
    }
    filtersGrid.appendChild(filtersResetButton);

    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'search';
    const searchTitle = document.createElement('span');
    searchTitle.className = 'search__header';
    searchTitle.textContent = 'Поиск';
    searchWrapper.appendChild(searchTitle);
    this.filterSearch = new FilterSearch(this.updateFilters.bind(this));
    searchWrapper.appendChild(this.filterSearch.getHTML());
    filtersGrid.appendChild(searchWrapper);
  }

  getFiltersDOM() {
    return this.filtersWrapper;
  }

  updateFilters<T>(currfilterObj: T): void {
    this.filtersObjects.forEach((filterObj) => {
      if (JSON.stringify(currfilterObj) !== JSON.stringify(filterObj)) {
        //console.log('ok', filterObj)
        filterObj.update();
      }
    })
    // this.multiRangeCount.update();
    // this.multiRangePrice.update();
  }
}

export default SectionFilters;
