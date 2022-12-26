import router from './Router/index';
import './Components';
import './app.scss';

class App {

  private router;

  constructor() {
    this.router = router;
  }

  start():void {
    this.router.start();
  }
}

export default App;
