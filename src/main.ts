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

let counter: number = 0;

const counterDiv = document.createElement("div");
counterDiv.innerHTML = `${counter} smiles`;
app.append(counterDiv);

button.addEventListener("click", () => {
  counter++;
  counterDiv.innerHTML = `${counter} smiles`;
});

let lastTime = performance.now();

let growthRate = 0;

interface Upgrade {
  name: string;
  baseCost: number;
  cost: number;
  rate: number;
  count: number;
  updateButton?: HTMLButtonElement;
  updateCountDiv?: HTMLDivElement;
}

const upgrades: Upgrade[] = [
  { name: "A", baseCost: 10, cost: 10, rate: 0.1, count: 0 },
  { name: "B", baseCost: 100, cost: 100, rate: 2.0, count: 0 },
  { name: "C", baseCost: 1000, cost: 1000, rate: 50, count: 0 },
];

const statusDiv = document.createElement("div");
statusDiv.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} smiles/sec`;
app.append(statusDiv);

upgrades.forEach((upgrade) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `Purchase ${upgrade.name} (${upgrade.cost.toFixed(2)} smiles)`;
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
      upgrade.cost *= 1.15; // Increase the cost by a factor of 1.15
      counterDiv.innerHTML = `${counter.toFixed(2)} smiles`;
      statusDiv.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} smiles/sec`;
      upgradeCountDiv.innerHTML = `${upgrade.name} count: ${upgrade.count}`;
      upgradeButton.innerHTML = `Purchase ${upgrade.name} (${upgrade.cost.toFixed(2)} smiles)`;
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
