import "./style.css";

const COST_MULTIPLIER = 1.15;

const app: HTMLDivElement = document.querySelector("#app")!;

// Add this block to change the background color and add font and animations
const style = document.createElement("style");
style.innerHTML = `
  body {
    background-color: lightblue; /* Change this to your desired color */
  }
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');
  h1 {
    font-family: 'Orbitron', sans-serif;
    font-size: 3em;
    animation: float 3s ease-in-out infinite;
  }
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
`;
document.head.appendChild(style);

const gameName = "My Stellar Game"; // Game Title
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// create a "Collect Stars" button
const button = document.createElement("button");
button.innerHTML = "Collect Stars ✨";
app.append(button);

// initialize a counter
let counter: number = 0;

// create a div to display the counter
const counterDiv = document.createElement("div");
counterDiv.innerHTML = `${counter} stars`;
app.append(counterDiv);

// when the button is clicked, increment the counter by 1
button.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
});

let lastTime = performance.now();

let growthRate = 0;

// define an upgrade interface
interface Upgrade {
  name: string;
  baseCost: number;
  cost: number;
  rate: number;
  count: number;
  description: string;
  updateButton?: HTMLButtonElement;
  updateCountDiv?: HTMLDivElement;
}

// create an array of upgrades
const upgrades: Upgrade[] = [
  {
    name: "Star Collector",
    baseCost: 10,
    cost: 10,
    rate: 0.1,
    count: 0,
    description: "Collects stars automatically.",
  },
  {
    name: "Galaxy Gatherer",
    baseCost: 100,
    cost: 100,
    rate: 2.0,
    count: 0,
    description: "Gathers galaxies for more stars.",
  },
  {
    name: "Universe Unifier",
    baseCost: 1000,
    cost: 1000,
    rate: 50,
    count: 0,
    description: "Unifies universes to produce stars exponentially.",
  },
  {
    name: "Nebula Navigator",
    baseCost: 5000,
    cost: 5000,
    rate: 200,
    count: 0,
    description: "Navigates nebulas to find hidden stars.",
  },
  {
    name: "Quasar Quester",
    baseCost: 20000,
    cost: 20000,
    rate: 1000,
    count: 0,
    description: "Quests through quasars to gather immense star power.",
  },
];

// create a div to display the growth rate
const statusDiv = document.createElement("div");
statusDiv.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} stars/sec`;
app.append(statusDiv);

function updateCounterDisplay() {
  counterDiv.innerHTML = `${counter.toFixed(2)} stars`;
}

function updateGrowthRateDisplay() {
  statusDiv.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} stars/sec`;
}

function updateUpgradeDisplay(upgrade: Upgrade) {
  if (upgrade.updateCountDiv) {
    upgrade.updateCountDiv.innerHTML = `${upgrade.name} count: ${upgrade.count}`;
  }
  if (upgrade.updateButton) {
    upgrade.updateButton.innerHTML = `Purchase ${upgrade.name} (${upgrade.cost.toFixed(2)} stars) - ${upgrade.description}`;
    upgrade.updateButton.disabled = counter < upgrade.cost;
  }
}

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

  updateCounterDisplay();
  updateUpgradeButtons();
  requestAnimationFrame(updateCounter);
}

upgrades.forEach((upgrade) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `Purchase ${upgrade.name} (${upgrade.cost.toFixed(2)} stars) - ${upgrade.description}`;
  upgradeButton.disabled = true;
  app.append(upgradeButton);

  const upgradeCountDiv = document.createElement("div");
  upgradeCountDiv.innerHTML = `${upgrade.name} count: ${upgrade.count}`;
  app.append(upgradeCountDiv);

  upgradeButton.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      upgrade.cost *= COST_MULTIPLIER; // Increase the cost by a factor of 1.15
      upgrade.count++;
      growthRate += upgrade.rate; // Update the growth rate
      updateCounterDisplay();
      updateGrowthRateDisplay();
      updateUpgradeDisplay(upgrade);
    }
  });

  upgrade.updateButton = upgradeButton;
  upgrade.updateCountDiv = upgradeCountDiv;
});

requestAnimationFrame(updateCounter);
