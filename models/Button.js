class Button {
  button;

  constructor(button) {
    this.button = button;
  }

  disableDOMButton() {
    this.button.setAttribute("disabled", "");
    this.button.classList.add("blocked");
  }
  enableDOMButton() {
    this.button.removeAttribute("disabled");
    this.button.classList.remove("blocked");
  }
}
