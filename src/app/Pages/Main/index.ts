import { IReqParams } from "../../Types/index";
import router from "../../Router/index";

class MainPage {

  render(reqParams: IReqParams): void {
    if (reqParams.length) {
      router.goTo('/');
    }

    document.body.innerHTML = `
      <nav-links></nav-links>
      <h1>Main Page</h1>
    `;
  }
}

export default MainPage;
