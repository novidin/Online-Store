import { IReqParams } from "../../Types/index";
import dataStorage from "../../Storage/index";
import pageHeader from "../../Components/PageHeader/index";
import pageFooter from "../../Components/PageFooter/index";
import SectionProducts from "../../Components/SectionProducts";
import SectionFilters from "../../Components/SectionFilters";

class CatalogPage {

  private sectionProducts: SectionProducts;
  private sectionProductsHTML?: HTMLElement;
  private main: HTMLElement;

  constructor() {
    this.sectionProducts = new SectionProducts();
    this.sectionProductsHTML;
    this.main = document.createElement('main');
    this.main.className = 'main';
  }

  render(reqParams: IReqParams): void {
    dataStorage.setFilters(reqParams);
    document.title = `Online Store — Каталог`;
    if (this.main) this.main.remove();
    this.main = document.createElement('main');
    this.main.className = 'main';

    const sectionFilters = new SectionFilters();

    this.main.appendChild(sectionFilters.getHTML());

    this.sectionProductsHTML?.remove();
    this.sectionProductsHTML = this.sectionProducts.getHTML();
    this.main.appendChild(this.sectionProductsHTML);

    document.body.appendChild(pageHeader.getHTML());
    document.body.appendChild(this.main);
    document.body.appendChild(pageFooter.getHTML());
  }

  update(reqParams: IReqParams): void {
    dataStorage.setFilters(reqParams);
    this.sectionProductsHTML?.remove();
    this.sectionProductsHTML = this.sectionProducts.getHTML();
    this.main.appendChild(this.sectionProductsHTML);
  }
}

export default CatalogPage;
