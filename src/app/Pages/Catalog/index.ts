import { IReqParams } from "../../Types/index";
import dataStorage from "../../Storage/index";
import pageHeader from "../../Components/PageHeader/index";
import pageFooter from "../../Components/PageFooter/index";
import sectionFilters from "../../Components/SectionFilters";
import sectionProducts from "../../Components/SectionProducts";
// import template from './template.html';

class CatalogPage {

  render(reqParams: IReqParams): void {
    dataStorage.setFilters(reqParams);
    document.title = `Catalog`;
    // document.body.innerHTML = `
    //   <nav-links></nav-links>
    //   <h1>Catalog Page</h1>
    //   <filter-check></filter-check>
    //   <product-list></product-list>
    // `;
    const main = document.createElement('main');

    main.className = 'main';
    main.appendChild(sectionFilters.getFiltersDOM());
    main.appendChild(sectionProducts.getSectionHTML());
    // main.innerHTML = template;

    document.body.appendChild(pageHeader.getHeaderDOM());
    document.body.appendChild(main);
    document.body.appendChild(pageFooter.getFooterDOM());
  }
}

export default CatalogPage;
