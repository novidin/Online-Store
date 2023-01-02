import { IReqParams } from "../../Types/index";
import router from "../../Router/index";
import pageHeader from "../../Components/PageHeader/index";
import pageFooter from "../../Components/PageFooter/index";

class Error404Page {

  render(reqParams: IReqParams): void {
    if (reqParams.length) {
      router.goTo('/404');
    }
    document.title = `Page not found`;

    const main = document.createElement('main');

    document.body.appendChild(pageHeader.getHeaderDOM());
    document.body.appendChild(main);
    document.body.appendChild(pageFooter.getFooterDOM());

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


// const renderNotFoundPage = ():void => {
//   addressesDOM.addEventListener('click', ():void => {
//     deleteChildsInMain();

//     const notFoundDOM = document.createElement('div') as HTMLElement;
//     notFoundDOM.classList.add('not-found');
//     notFoundDOM.innerHTML = `<div class="wrapper"><span class="not-found__image"></span><p class="not-found__title">Ой! Что-то пошло не так...</p></div>`;

//     mainDOM.append(notFoundDOM);
//   });
// }
