export const state = {
  value: (v: number) => ({ value: v } as const),
};

export type State = ReturnType<typeof state[keyof typeof state]>;

export const message = {
  increment: (v: number = 1) => ({ type: "increment", value: v } as const),
  decrement: (v: number = 1) => ({ type: "decrement", value: v } as const),
};

export type Message = ReturnType<typeof message[keyof typeof message]>;

export function update(message: Message, oldState: State): State {
  switch (message.type) {
    case "increment":
      return state.value(oldState.value + 1);
    case "decrement":
      return state.value(oldState.value - 1);
  }
}
