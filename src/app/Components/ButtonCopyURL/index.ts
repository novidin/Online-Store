import { buttonCopyURLContent } from '../../Storage/consts';

class ButtonCopyURL {

  private button: HTMLButtonElement;

  constructor() {
    this.button = document.createElement('button');
    this.button.className = 'button search__button-copy';
    this.button.title = 'Copy URL';
    this.button.onclick = () => {
      this.clickHandler();
    }
    this.enableButton();
  }

  private clickHandler(): void {
    const currURL: string = location.toString()
    navigator.clipboard.writeText(currURL).then(() => {
      this.pauseButton(buttonCopyURLContent.success);
    }).catch((err: Error) => {
      this.pauseButton(buttonCopyURLContent.error);
      alert(err);
    })
  }

  private pauseButton(message: string): void {
    this.button.innerHTML = message;
    this.button.disabled = true;
    this.button.classList.add('button--disable');
    setTimeout(() => {
      this.button.classList.remove('button--disable');
      this.enableButton();
    }, 2000);
  }

  private enableButton(): void {
    this.button.innerHTML = buttonCopyURLContent.ready;
    this.button.disabled = false;
  }

  getHTML(): HTMLButtonElement {
    return this.button;
  }
}

export default ButtonCopyURL;
