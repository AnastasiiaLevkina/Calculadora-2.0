class Display {
  defaultOutput;
  display;

  constructor(display, defaultOutput) {
    this.display = display;
    this.defaultOutput = defaultOutput;
  }

  updateDisplayOutput(output) {
    this.display.textContent = String(output);
  }
  setDefaultDisplayOutput() {
    this.display.textContent = this.defaultOutput;
  }
  showErrorMessage(errorMessage) {
    this.display.textContent = String(errorMessage);
  }
}
