import App from './app/App';
import './styles/main.scss';

const app = new App();
app.start();


/* ===================================================== */

window.onload = ():void => {
  const addressesDOM = document.getElementById('addresses') as HTMLElement;
  const mainDOM = document.querySelector('.main') as HTMLElement;
  const tiresDOM = document.getElementById('tires') as HTMLElement;

  const renderNotFoundPage = ():void => {
    addressesDOM.addEventListener('click', ():void => {
      deleteChildsInMain();

      const notFoundDOM = document.createElement('div') as HTMLElement;
      notFoundDOM.classList.add('not-found');
      notFoundDOM.innerHTML = `<div class="wrapper"><span class="not-found__image"></span><p class="not-found__title">Ой! Что-то пошло не так...</p></div>`;

      mainDOM.append(notFoundDOM);
    });
  }

  const renderTiresPage = ():void => {
    tiresDOM.addEventListener('click', ():void => {
      deleteChildsInMain();

      const filtersTemplateDOM = document.getElementById('filters') as HTMLTemplateElement;

      const filters = filtersTemplateDOM.content.cloneNode(true) as DocumentFragment;
      mainDOM.append(filters);
    })
  }

  const deleteChildsInMain = ():void => {
    while (mainDOM.firstChild) {
      mainDOM.removeChild(mainDOM.firstChild);
    }
  };

  renderNotFoundPage();
  renderTiresPage();
}
