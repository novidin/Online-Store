import MainPage from "../Pages/Main/index";
import CatalogPage from "../Pages/Catalog/index";
import CartPage from "../Pages/Cart/index";
import ProductPage from "../Pages/Product/index";
import Error404Page from "../Pages/404/index";

const routes = [
  {path: '/', title: 'Home', addToMenu: true, page: new MainPage()},
  {path: '/catalog', title: 'Catalog', addToMenu: true, page: new CatalogPage()},
  {path: '/cart', title: 'Cart', addToMenu: true, page: new CartPage()},
  {path: '/product', title: 'Product', addToMenu: false, page: new ProductPage()},
  {path: '/404', title: 'Error 404', addToMenu: false, page: new Error404Page()},
]

export default routes;
