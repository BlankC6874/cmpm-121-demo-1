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

// function updateCounter(currentTime: number) {
// const deltaTime = currentTime - lastTime;
// lastTime = currentTime;

// const increment = deltaTime / 1000; // 1 unit per second
// counter += increment;
// counterDiv.innerHTML = `${counter.toFixed(2)} smiles`;

// requestAnimationFrame(updateCounter);
// }

// requestAnimationFrame(updateCounter);

// Step 5: Purchasing an upgrade
let growthRate = 0;

// const upgradeButton = document.createElement("button");
// upgradeButton.innerHTML = "Purchase Upgrade (10 smiles)";
// upgradeButton.disabled = true;
// app.append(upgradeButton);

// upgradeButton.addEventListener("click", () => {
// if (counter >= 10) {
// counter -= 10;
// growthRate += 1;
// counterDiv.innerHTML = `${counter.toFixed(2)} smiles`;
// upgradeButton.disabled = counter < 10;
// }
// });

// function updateCounter(currentTime: number) {
// const deltaTime = currentTime - lastTime;
// lastTime = currentTime;

// const increment = (deltaTime / 1000) * growthRate; // growth rate units per second
// counter += increment;
// counterDiv.innerHTML = `${counter.toFixed(2)} smiles`;

// upgradeButton.disabled = counter < 10;

// requestAnimationFrame(updateCounter);
// }

// requestAnimationFrame(updateCounter);

// Step 6: Multiple upgrades and status display
interface Upgrade {
  name: string;
  cost: number;
  rate: number;
  count: number;
  updateButton?: HTMLButtonElement;
  updateCountDiv?: HTMLDivElement;
}

const upgrades: Upgrade[] = [
  { name: "A", cost: 10, rate: 0.1, count: 0 },
  { name: "B", cost: 100, rate: 2.0, count: 0 },
  { name: "C", cost: 1000, rate: 50, count: 0 },
];

const statusDiv = document.createElement("div");
statusDiv.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} smiles/sec`;
app.append(statusDiv);

upgrades.forEach((upgrade) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `Purchase ${upgrade.name} (${upgrade.cost} smiles)`;
  upgradeButton.disabled = true;
  app.append(upgradeButton);

  const upgradeCountDiv = document.createElement("div");
  upgradeCountDiv.innerHTML = `${upgrade.name} count: ${upgrade.count}`;
  app.append(upgradeCountDiv);

  upgradeButton.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      growthRate += upgrade.rate;
      upgrade.count++;
      counterDiv.innerHTML = `${counter.toFixed(2)} smiles`;
      statusDiv.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} smiles/sec`;
      upgradeCountDiv.innerHTML = `${upgrade.name} count: ${upgrade.count}`;
      upgradeButton.disabled = counter < upgrade.cost;
    }
  });

  upgrade.updateButton = upgradeButton;
  upgrade.updateCountDiv = upgradeCountDiv;
});

function updateUpgradeButtons() {
  upgrades.forEach((upgrade) => {
    if (upgrade.updateButton) {
      upgrade.updateButton.disabled = counter < upgrade.cost;
    }
  });
}

function updateCounter(currentTime: number) {
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  const increment = (deltaTime / 1000) * growthRate; // growth rate units per second
  counter += increment;
  counterDiv.innerHTML = `${counter.toFixed(2)} smiles`;

  updateUpgradeButtons();

  requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter);
