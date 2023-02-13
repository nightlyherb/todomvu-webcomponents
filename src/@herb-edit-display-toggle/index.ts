import {
  message,
  Message,
  State,
  state,
  update as updateState,
} from "./@model";

export class HerbEditDisplayToggle extends HTMLElement {
  private _state: State;

  private readonly _editTemplate$: HTMLTemplateElement;
  private readonly _displayTemplate$: HTMLTemplateElement;
  private readonly _root$: ShadowRoot;

  constructor({
    editTemplate$,
    displayTemplate$,
  }: {
    editTemplate$: HTMLTemplateElement;
    displayTemplate$: HTMLTemplateElement;
  }) {
    super();

    this._root$ = this.attachShadow({ mode: "open" });
    this._editTemplate$ = editTemplate$;
    this._displayTemplate$ = displayTemplate$;

    this._state = state.edit("");
    this.renderEditState(this._state.value);
  }

  dispatch(message: Message) {
    switch (message.type) {
      case "change to display state": {
        this._state = updateState(message, this._state);
        this.renderDisplayState(this._state.value);
        return;
      }
      case "change to edit state": {
        this._state = updateState(message, this._state);
        this.renderEditState(this._state.value);
      }
      case "update value if current state is edit state": {
        this._state = updateState(message, this._state);
        this.renderEditValue(this._state.value);
      }
    }
  }

  renderEditValue(value: string) {
    const editValue = this._root$.getElementById("value")!!;
    editValue.textContent = value;
  }

  renderEditState(value: string) {
    this._root$.replaceChildren(this._editTemplate$.content.cloneNode(true));

    this.renderEditValue(value);

    const input$ = this._root$.getElementById("value") as HTMLInputElement;
    input$.oninput = () =>
      this.dispatch(message.updateValueOnEditState(input$.value));

    const toDisplay$ = this._root$.getElementById("to-display")!!;
    toDisplay$.onclick = () => this.dispatch(message.toDisplay());
  }

  renderDisplayState(value: string) {
    this._root$.replaceChildren(this._displayTemplate$.content.cloneNode(true));

    const displayValue = this._root$.getElementById("value")!!;
    displayValue.textContent = value;

    const toEdit$ = this._root$.getElementById("to-edit")!!;
    toEdit$.onclick = () => this.dispatch(message.toEdit());
  }
}

export const setup = async () => {
  // Get html document object
  const url = new URL("./index.html", import.meta.url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `response(${response.status} ${response.statusText}) is not okay`
    );
  }
  const htmlString = await response.text();
  const htmlDocument = new DOMParser().parseFromString(htmlString, "text/html");

  const editTemplate$ = htmlDocument.getElementById(
    "edit-template"
  ) as HTMLTemplateElement;
  const displayTemplate$ = htmlDocument.getElementById(
    "display-template"
  ) as HTMLTemplateElement;

  class HerbEditDisplayToggleWithTemplate extends HerbEditDisplayToggle {
    constructor() {
      super({ editTemplate$, displayTemplate$ });
    }
  }
  customElements.define(
    "herb-edit-display-toggle",
    HerbEditDisplayToggleWithTemplate
  );
};
