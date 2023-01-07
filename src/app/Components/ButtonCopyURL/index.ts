const buttonContent = {
  ready: '<span class="icon icon--copy"></span>',
  success: 'Link Copied!',
  error: 'Copy Failed!'
};

class ButtonCopyURL {

  private button: HTMLButtonElement;

  constructor() {
    this.button = document.createElement('button');
    this.button.className = 'button search__button-copy';
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
    this.button.textContent = message;
    this.button.classList.add('search__button-copy_active');
    this.button.classList.add('search__button-copy_enlarged');
    this.button.disabled = true;
    setTimeout(() => {
      this.button.classList.remove('search__button-copy_enlarged');
      this.button.ontransitionend = () => {
        this.button.classList.remove('search__button-copy_active');
        this.button.ontransitionend = () => null;
        this.enableButton();
      }
    }, 3000);
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
