import "./style.css";
import { setup as setupHerbCounter } from "./@herb-counter";
import { setup as setupEditDisplayToggle } from "./@herb-edit-display-toggle";

const app = document.querySelector<HTMLDivElement>("#app")!!;

await setupHerbCounter();
const counter$ = document.createElement("herb-counter");

await setupEditDisplayToggle();
const editBlah$ = document.createElement("herb-edit-display-toggle");

app.replaceChildren(counter$, editBlah$);
