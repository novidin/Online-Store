import routes from "../../Router/routes";

class Nav extends HTMLElement {

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const ul = document.createElement('ul');

    routes.forEach((route) => {
      if (route.isMenuItem) {
        const li = document.createElement('li');
        const link = document.createElement('a');

        link.href = route.path;
        link.textContent = route.title;
        link.setAttribute('data-local-link', 'data-local-link');
        li.appendChild(link);
        ul.appendChild(li);
      }
    })

    shadowRoot.appendChild(ul);
  }
}

window.customElements.define('nav-links', Nav);

export default Nav;
