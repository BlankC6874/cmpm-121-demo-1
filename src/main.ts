import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My beautiful game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Step 1: A button you can click
const button = document.createElement("button");
button.innerHTML = "Click Me 😊";
app.append(button);

// Step 2: Clicking increases a counter
let counter: number = 0;

const counterDiv = document.createElement("div");
counterDiv.innerHTML = `${counter} smiles`;
app.append(counterDiv);

button.addEventListener("click", () => {
  counter++;
  counterDiv.innerHTML = `${counter} smiles`;
});

// Step 3: Automatic Clicking
setInterval(() => {
    counter++;
    counterDiv.innerHTML = `${counter} smiles`;
}, 1000);