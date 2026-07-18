import { Puzzle } from './Puzzle';
import { HypothesisEngine } from './HypothesisEngine';

export class Board {
  private size: number;
  private element: HTMLDivElement;
  private puzzle: Puzzle;
  private cells: HTMLDivElement[][];

  private onCellClick: (
    row: number,
    col: number,
    element: HTMLDivElement
  ) => void;


  constructor(
    size: number,
    puzzle: Puzzle,
    onCellClick: (
      row: number,
      col: number,
      element: HTMLDivElement
    ) => void
  ) {

    this.size = size;
    this.puzzle = puzzle;
    this.onCellClick = onCellClick;

    this.cells = [];

    this.element = document.createElement('div');
    this.element.className = 'board';

    this.createCells();
  }


  private createCells() {

    for (let row = 0; row < this.size; row++) {

      const rowCells: HTMLDivElement[] = [];

      for (let col = 0; col < this.size; col++) {

        const cell = document.createElement('div');

        cell.className = 'cell';


        if (this.puzzle.isMine(row, col)) {
          cell.dataset.mine = "true";
        }


        cell.addEventListener('click', () => {
          this.onCellClick(row, col, cell);
        });


        this.element.appendChild(cell);

        rowCells.push(cell);
      }

      this.cells.push(rowCells);
    }
  }


  public showProbeResult(
  row:number,
  col:number,
  radarValue:number,
  probability:number
) {

  const cell = this.cells[row][col];

  const percent =
    Math.round(probability * 100);

  cell.textContent =
    `${percent}%\nR:${radarValue}`;

  cell.classList.add(
    this.getProbabilityClass(percent)
  );
}
public showRadarResult(
  row: number,
  col: number,
  value: number
) {

  const cell = this.cells[row][col];

  const currentText = cell.textContent;

  cell.textContent =
    `${currentText}\nR:${value}`;

}
public showScanned(
    row:number,
    col:number
) {

    const cell = this.cells[row][col];

    cell.classList.add(
        "scanned"
    );

}
  private getProbabilityClass(
    percent:number
):string {

    if (percent === 0) {
        return "safe";
    }

    if (percent <= 20) {
        return "very-low";
    }

    if (percent <= 40) {
        return "low";
    }

    if (percent <= 60) {
        return "medium";
    }

    if (percent <= 80) {
        return "high";
    }

    if (percent < 100) {
        return "very-high";
    }

    return "certain";
}


  public clearSelections() {

    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.classList.remove("selected");
      });
    });

  }
  public showProbability(
  row: number,
  col: number,
  probability: number
) {

  const cell = this.cells[row][col];

  const percent = Math.round(probability * 100);

  cell.textContent = `${percent}%`;

  cell.classList.remove(
    "low",
    "medium",
    "high"
  );


  cell.classList.remove(
    "safe",
    "very-low",
    "low",
    "medium",
    "high",
    "very-high",
    "certain"
);

cell.classList.add(
    this.getProbabilityClass(percent)
);

}
    public showProbabilities(
  hypothesisEngine: HypothesisEngine
) {

  for(let row=0; row<this.size; row++) {

    for(let col=0; col<this.size; col++) {

      const probability =
  hypothesisEngine.getMineProbability(
    row,
    col
  );

      this.showProbability(
        row,
        col,
        probability
      );

    }

  }

}
  public render(parent: HTMLElement) {
    parent.appendChild(this.element);
  }
}