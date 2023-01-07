import routes from './routes';
import { IReqParams } from '../Types/index';

class Router {

  private routes;
  private reqParams;

  constructor() {
    this.routes = routes;
    this.reqParams = {};
  }

  private loadPage(refresh?: boolean): void {
    const urlPathname = location.pathname;
    const correctRoutes = routes.filter((route) => route.path === urlPathname);
    const reqParams = this.getReqParamsAll();

    console.log('goTO', location.pathname);
    if (correctRoutes.length < 1) {
      this.goTo('/404');
    } else {
      const currRoute = correctRoutes[0];
      if (refresh && Object.keys(reqParams).length) {
        console.log('reqParams', Object.keys(reqParams).length)
        currRoute.page.update(reqParams);
      } else {
        document.body.innerHTML = '';
        currRoute.page.render(reqParams);
      }
    }
  }

  goTo(href: string): void {
    const currPath = location.pathname;
    history.pushState('', '', href);
    const newPath = location.pathname;
    if (newPath !== currPath) {
      this.loadPage();
    } else {
      this.loadPage(true);
    }
  }

  getReqParamsAll() {
    const newURL = new URL(location.toString());
    return this.convertReqParamsToObj(newURL.searchParams);
  }

  setReqParams(name: string, value: string) {
    const reqParams = new URLSearchParams(this.reqParams);

    console.log('rputer', reqParams);
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

  resetReqParams() {
    this.reqParams = {};
    this.goTo(location.pathname);
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
    window.addEventListener('popstate', () => (
      this.loadPage()
    ));
    window.addEventListener('DOMContentLoaded', () => (
      this.loadPage()
    ));

    window.addEventListener('click', (e) => {
      if (!e.target) return;
      const target = e.composedPath()[0] as HTMLElement;
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
