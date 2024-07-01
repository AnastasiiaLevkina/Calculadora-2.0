class OperatorButton extends Button {
  constructor(button) {
    super(button)
  }

  highlightDOMButton() {
    this.button.classList.add('highlightedButton')
  }
  removeHighlightDOMButton() {
    this.button.classList.remove('highlightedButton')
  }
}
