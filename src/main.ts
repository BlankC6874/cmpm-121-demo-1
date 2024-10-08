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

// Step 3: Automatic Clicking (with setInterval)
// setInterval(() => {
  // counter++;
  // counterDiv.innerHTML = `${counter} smiles`;
// }, 1000);

// Step 4: Continuous Growth (with requestAnimationFrame)
// as my understanding of the slides, since this method is enabled, the setInterval method should be disabled I guess?
let lastTime = performance.now();

function updateCounter(currentTime: number) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    const increment = deltaTime / 1000; // 1 unit per second
    counter += increment;
    counterDiv.innerHTML = `${counter.toFixed(2)} smiles`;

    requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter);