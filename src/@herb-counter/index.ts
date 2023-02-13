export class HerbCounter extends HTMLElement {
  root$: ShadowRoot;
  decrement$: HTMLElement;
  increment$: HTMLElement;
  value$: HTMLElement;
  private _value: number;

  constructor(template$: HTMLTemplateElement) {
    super();

    this.root$ = this.attachShadow({ mode: "open" });
    this.root$.appendChild(template$.content.cloneNode(true));

    this.decrement$ = this.root$.getElementById("decrement")!!;
    this.increment$ = this.root$.getElementById("increment")!!;
    this.value$ = this.root$.getElementById("value")!!;

    this._value = 0;
    this.increment$.addEventListener("click", () => this.increment());
    this.decrement$.addEventListener("click", () => this.decrement());
  }

  increment() {
    this._value += 1;
    this.renderValue$();
  }

  decrement() {
    this._value -= 1;
    this.renderValue$();
  }

  renderValue$() {
    this.value$.textContent = String(this._value);
  }
}

export const setup = async () => {
  const response = await fetch(new URL("./index.html", import.meta.url));
  const htmlString = await response.text();
  const htmlDocument = new DOMParser().parseFromString(htmlString, "text/html");
  const template$ = htmlDocument.querySelector("template")!!;
  class HerbCounterWithTemplate extends HerbCounter {
    constructor() {
      super(template$);
    }
  }
  customElements.define("herb-counter", HerbCounterWithTemplate);
};
