import { IReqParams } from '../../Types';
import router from '../../Router/index';
import pageHeader from '../../Components/PageHeader';
import pageFooter from '../../Components/PageFooter';

class Error404Page {

  render(reqParams: IReqParams): void {
    if (reqParams.length) {
      router.goTo('/404');
    }
    document.title = `Страница не найдена`;

    const main = document.createElement('main');

    document.body.appendChild(pageHeader.getHTML());
    document.body.appendChild(main);
    document.body.appendChild(pageFooter.getHTML());

    const notFoundDOM = document.createElement('div') as HTMLElement;

    notFoundDOM.classList.add('not-found');
    notFoundDOM.innerHTML = `<div class="wrapper"><span class="not-found__image"></span><p class="not-found__title">Ой! Что-то пошло не так...</p></div>`;
    main.append(notFoundDOM);
  }

  update(reqParams: IReqParams) {
    this.render(reqParams)
  }
}

export default Error404Page;
