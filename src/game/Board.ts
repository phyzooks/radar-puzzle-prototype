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
    value:number
  ) {

    const cell = this.cells[row][col];

    cell.textContent = `${value}%`;

    cell.classList.add(
      this.getProbabilityClass(value)
    );
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
  private getProbabilityClass(value:number):string {

    if (value >= 75) {
      return "high";
    }

    if (value >= 40) {
      return "medium";
    }

    return "low";
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


  if(percent >= 70) {
    cell.classList.add("high");
  }
  else if(percent >= 35) {
    cell.classList.add("medium");
  }
  else {
    cell.classList.add("low");
  }

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