import { IReqParams } from "../../Types/index";
import router from "../../Router/index";

class Error404Page {

  render(reqParams: IReqParams): void {
    if (reqParams.length) {
      router.goTo('/404');
    }

    document.body.innerHTML = `
      <h1>Error 404</h1>
      <a href="/" data-local-link="data-local-link">Home</a>
    `;
  }
}

export default Error404Page;
