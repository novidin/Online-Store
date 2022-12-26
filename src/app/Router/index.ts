import routes from './routes';

class Router {

  private routes;
  private reqParams;

  constructor() {
    this.routes = routes;
    this.reqParams = {};
  }

  loadPage() {
    const urlPathname = location.pathname;
    const correctRoutes = routes.filter((route) => route.path === urlPathname);//[0];
    console.log('goTO', location.pathname);
    if (correctRoutes.length < 1) {
      this.goTo('/404');
    } else {
      const currRoute = correctRoutes[0];
      document.body.innerHTML = '';
      currRoute.page.render();
    }
  }

  goTo(href: string) {
    history.pushState('', '', href);
    this.loadPage();
  }

  start() {
    window.addEventListener('popstate', this.loadPage.bind(this));
    window.addEventListener('DOMContentLoaded', this.loadPage.bind(this));
    window.addEventListener('click', (e) => {
      if (!e.target) return;
      const target = e.composedPath()[0] as HTMLAnchorElement;
      if (target.matches('[data-local-link')) {
        e.preventDefault();
        this.goTo(target.href);
      }
    })
    console.log('router started');
  }

}

const router = new Router();

export default router;
