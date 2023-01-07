const buttonContent = {
  ready: '<span class="icon icon--copy"></span>',
  success: '<span class="icon icon--copy-access"></span>',
  error: 'Fail!'
};

class ButtonCopyURL {

  private readonly button: HTMLButtonElement;

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
      this.pauseButton(buttonContent.success);
    }).catch((err: Error) => {
      this.pauseButton(buttonContent.error);
      alert(err);
    })
  }

  private pauseButton(message: string): void {
    this.button.innerHTML = message;
    this.button.disabled = true;
    this.button.classList.add('button--disable');
    setTimeout(() => {
      this.button.ontransitionend = () => {
        this.button.ontransitionend = () => null;
        this.button.classList.remove('button--disable');
        this.enableButton();
      }
    }, 600);
  }

  private enableButton(): void {
    this.button.innerHTML = buttonContent.ready;
    this.button.disabled = false;

  }

  getHTML(): HTMLButtonElement {
    return this.button;
  }
}

export default ButtonCopyURL;
