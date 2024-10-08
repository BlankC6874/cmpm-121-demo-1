import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My beautiful game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "Click Me 😊";
app.append(button);
