import './style.css';
import { Board } from './game/Board';
import { Puzzle } from './game/Puzzle';
import { ProbeManager } from './game/ProbeManager';
import { ProbeEngine } from './game/ProbeEngine';
import { ProbabilityEngine } from './game/ProbabilityEngine';


const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Could not find app element');
}


const puzzle = new Puzzle(5);
const probabilityEngine =
  new ProbabilityEngine(
    puzzle.getAllSolutions()
  );
const probeEngine = new ProbeEngine(puzzle);
const probes = new ProbeManager();


const turnDisplay = document.createElement('p');
turnDisplay.textContent = "Turn: 1 / 5";

const probeDisplay = document.createElement('p');
probeDisplay.textContent = "Probes: 0 / 5";


const board = new Board(
  5,
  puzzle,
  (row, col, cell) => {

    const changed = probes.addProbe(row, col);

    if (changed) {
      cell.classList.toggle('selected');
    }

    probeDisplay.textContent =
      `Probes: ${probes.getCount()} / 5`;
  }
);


board.render(app);

app.appendChild(turnDisplay);
app.appendChild(probeDisplay);


const endButton = document.createElement('button');

endButton.textContent = "End Turn";

endButton.onclick = () => {

  const usedProbes = probes.endTurn();

  const results = probeEngine.scanMultiple(usedProbes);


results.forEach(
  (value, location) => {

    const [row,col] =
      location.split(',').map(Number);


    // Update the probability model
    probabilityEngine.update(
      row,
      col,
      value
    );

  }
);

// Show the new probability map
board.showProbabilities(
  probabilityEngine
);

  console.log(
    "Completed turn probes:",
    usedProbes
  );

  turnDisplay.textContent =
    `Turn: ${probes.getTurn()} / 5`;

  probeDisplay.textContent =
    "Probes: 0 / 5";

  board.clearSelections();

  if (probes.isGameOver()) {
    endButton.disabled = true;
    endButton.textContent = "Game Complete";
  }
};

console.log(
  "Possible solutions:",
  puzzle.getAllSolutions().length
);
console.log(
  "Probability",
  probabilityEngine.getProbability(0,0)
);
app.appendChild(endButton);