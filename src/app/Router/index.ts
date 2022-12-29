import routes from './routes';
import { IReqParams } from '../Types/index';

class Router {

  private routes;
  private reqParams;

  constructor() {
    this.routes = routes;
    this.reqParams = {};
  }

  private loadPage(): void {
    const urlPathname = location.pathname;
    const correctRoutes = routes.filter((route) => route.path === urlPathname);
    const reqParams = this.getReqParamsAll();

    console.log('goTO', location.pathname);
    if (correctRoutes.length < 1) {
      this.goTo('/404');
    } else {
      const currRoute = correctRoutes[0];

      document.body.innerHTML = '';
      currRoute.page.render(reqParams);
    }
  }

  goTo(href: string): void {
    history.pushState('', '', href);
    this.loadPage();
  }

  getReqParamsAll() {
    const newURL = new URL(location.toString());
    return this.convertReqParamsToObj(newURL.searchParams);
  }

  setReqParams(name: string, value: string) {
    const reqParams = new URLSearchParams(this.reqParams);

    if (reqParams.has(name)) {
      reqParams.set(name, value)
    } else {
      reqParams.append(name, value)
    }
    this.reqParams = reqParams;
    const newURL = new URL(location.toString());
    newURL.search = reqParams.toString();
    this.goTo(newURL.toString());
  }

  private convertReqParamsToObj(reqParams: URLSearchParams) {
    const reqParamsObj: IReqParams = {};

    reqParams.forEach((param, i) => {
      if (param.split(',').filter((param) => param).length > 0) {
        reqParamsObj[i] = param.split(',');
        }
    })
    return reqParamsObj;
  }



  start(): void {
    window.addEventListener('popstate', this.loadPage.bind(this));
    window.addEventListener('DOMContentLoaded', this.loadPage.bind(this));
    window.addEventListener('click', (e) => {
      if (!e.target) return;
      const target = e.composedPath()[0]  as HTMLElement;
      const link = target.closest('a');
      if (link?.matches('[data-local-link')) {
        e.preventDefault();
        this.goTo(link.href);
      }
    })
  }
}

const router = new Router();

export default router;
