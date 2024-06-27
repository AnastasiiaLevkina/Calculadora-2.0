class OperatorButton extends Button {
  constructor(button) {
    super(button);
  }

  highlightDOMButton() {
    this.button.classList.add("highlighted");
  }
  removeHighlightDOMButton() {
    this.button.classList.remove("highlighted");
  }
}
