import { IReqParams } from '../../Types';
import router from '../../Router';
import pageHeader from '../../Components/PageHeader';
import pageFooter from '../../Components/PageFooter';
import template from './template.html';

class MainPage {

  render(reqParams: IReqParams): void {
    if (reqParams.length) {
      router.goTo('/');
    }
    document.title = `Online Store — Главная`;
    const main = document.createElement('main');
    main.innerHTML = template;
    document.body.appendChild(pageHeader.getHTML());
    document.body.appendChild(main);
    document.body.appendChild(pageFooter.getHTML());
  }

  update(reqParams: IReqParams) {
    this.render(reqParams)
  }
}

export default MainPage;
