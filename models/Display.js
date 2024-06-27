class Display {
  display;

  constructor(display) {
    this.display = display;
  }

  updateDisplayOutput(output) {
    this.display.textContent = String(output);
  }
  showErrorMessage(errorMessage) {
    this.display.textContent = String(errorMessage);
  }
}
