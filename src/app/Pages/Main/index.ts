import { IReqParams } from "../../Types/index";
import router from "../../Router/index";
import pageHeader from "../../Components/PageHeader/index";
import pageFooter from "../../Components/PageFooter/index";
import template from './template.html';

class MainPage {

  render(reqParams: IReqParams): void {
    if (reqParams.length) {
      router.goTo('/');
    }
    document.title = `Online Store — Главная`;
    // document.body.innerHTML = `
    //   <nav-links></nav-links>
    //   <h1>Main Page</h1>
    // `;
    const main = document.createElement('main');
    main.innerHTML = template;
    document.body.appendChild(pageHeader.getHeaderDOM());
    document.body.appendChild(main);
    document.body.appendChild(pageFooter.getFooterDOM());
  }

  update(reqParams: IReqParams) {
    this.render(reqParams)
  }
}

export default MainPage;
