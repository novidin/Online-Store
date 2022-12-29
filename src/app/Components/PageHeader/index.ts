// import logo from '../../../assets/icons/logo.svg';
// "./assets/icons/logo.svg"
import template from './template.html';

class PageHaeader {
  getHeaderDOM() {
    const header = document.createElement('header');
    header.className = 'header';

    header.innerHTML = template;
    return header;
  }
}

const pageHeader = new PageHaeader();
export default pageHeader;
