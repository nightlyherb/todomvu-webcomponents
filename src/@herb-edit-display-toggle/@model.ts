export const state = {
  edit(value: string) {
    return { type: "edit", value } as const;
  },
  display(value: string) {
    return { type: "display", value } as const;
  },
};

export type State = ReturnType<typeof state[keyof typeof state]>;

export const message = {
  toEdit() {
    return { type: "change to edit state" } as const;
  },
  toDisplay() {
    return { type: "change to display state" } as const;
  },
  updateValueOnEditState(value: string) {
    return {
      type: "update value if current state is edit state",
      value,
    } as const;
  },
};

export type Message = ReturnType<typeof message[keyof typeof message]>;

export const update = (message: Message, lastState: State): State => {
  switch (message.type) {
    case "change to display state":
      return state.display(lastState.value);
    case "change to edit state":
      return state.display(lastState.value);
    case "update value if current state is edit state":
      return lastState.type === "edit" ? state.edit(message.value) : lastState;
  }
};
