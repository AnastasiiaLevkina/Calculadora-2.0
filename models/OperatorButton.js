class OperatorButton extends Button{

    constructor(button){
      super(button)
    }
  
    highlightDOMButton(){
      this.button.classList.add("active")
    }
    removeHighlightDOMButton(){
      this.button.classList.remove("active")
    }
  }