class MyCarousel extends HTMLElement {

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({"mode": "open"});
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = `
      <link href="my-carousel.css" rel="stylesheet" type="text/css">
      <button id="stop" class="btn btn-stop">STOP</button>
      <button id="start" class="btn btn-start">START</button>
      <div id="slider"></div>
    `;
    this.index = 0;
    this.$slider = this._shadowRoot.querySelector('#slider');
    this.$slides = this.getElementsByClassName('slide');
    for (let i = 0; i < this.$slides.length; i++) {
      let $slide = this.$slides[i].cloneNode(true);
      $slide.style.display = 'none';
      this.$slider.appendChild($slide);
    }

    if (this.$slider.children.length > 0) {
      this.$slider.children[0].style.display = '';

      this.delayValue = this.getAttribute('delay') || 1000;
      this._setInterval(this.delayValue);

      this.$startBtn = this._shadowRoot.getElementById('start');
      this.$stopBtn = this._shadowRoot.getElementById('stop');
      this.$startBtn.addEventListener('click', () => this._setInterval(this.delayValue));
      this.$stopBtn.addEventListener('click', () => this._setInterval(clearInterval(this._interval)));
    }
  }

  disconnectedCallback() {
    clearInterval(this._interval);
  }

  _setInterval(value) {
    if (this._interval !== null) {
      clearInterval(this._interval);
    }
    if (value > 0) this._interval = window.setInterval(this._goToNextSlide.bind(this), value);
  }

  _goToNextSlide() {
    this.$slider.children[this.index].style.display = 'none';
    if (this.index >= this.$slides.length - 1) {
      this.index = 0;
    } else {
      this.index++;
    }
    this.$slider.children[this.index].style.display = '';
  }
}

window.customElements.define('my-carousel', MyCarousel);
