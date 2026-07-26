import { Puzzle } from './Puzzle';

export class Board {
  private size: number;
  private element: HTMLDivElement;
  private puzzle: Puzzle;
  private cells: HTMLDivElement[][];
  private probeLocations: Set<string> = new Set();

public setPuzzle(
    puzzle: Puzzle
) {

    this.puzzle = puzzle;

}

  private onCellClick: (
    row: number,
    col: number,
    element: HTMLDivElement
  ) => void;

 
public revealMines() {

    for(let row = 0; row < this.size; row++) {

        for(let col = 0; col < this.size; col++) {

            if(this.puzzle.isMine(row,col)) {

                this.cells[row][col]
                    .classList.add("mine");

            }

        }

    }

}

public clearProbeDisplay() {

    this.cells.forEach(row => {

        row.forEach(cell => {

            cell.textContent = "";

            cell.classList.remove(
                "zero",
                "one",
                "two",
                "three",
                "mine",
                "scanned"
            );

        });

    });

    this.probeLocations.clear();

}
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
    this.element.style.gridTemplateColumns =
    `repeat(${this.size}, 1fr)`;

this.element.style.gridTemplateRows =
    `repeat(${this.size}, 1fr)`;
    this.createCells();
  }


  private createCells() {

    for (let row = 0; row < this.size; row++) {

      const rowCells: HTMLDivElement[] = [];

      for (let col = 0; col < this.size; col++) {

        const cell = document.createElement('div');

        cell.className = 'cell';


        //if (this.puzzle.isMine(row, col)) {
          //cell.dataset.mine = "true";
        //}


        cell.addEventListener('click', () => {
          this.onCellClick(row, col, cell);
        });


        this.element.appendChild(cell);

        rowCells.push(cell);
      }

      this.cells.push(rowCells);
    }
  }

public showPlayer(
    row: number,
    col: number
) {

    const cell = this.cells[row][col];

    cell.classList.add("player");

}

public showGoal(
    row: number,
    col: number
) {

    const cell = this.cells[row][col];

    cell.classList.add("goal");

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

  
}
public showDamage(
    row:number,
    col:number,
    amount:number
) {

    const cell = this.cells[row][col];

    cell.textContent =
        `-${amount}`;

    cell.classList.add(
        "damage"
    );
    //console.log(
    //"Showing damage",
    //row,
    //col,
    //amount
//);

}
public markProbe(
    row:number,
    col:number
) {

    this.probeLocations.add(
        `${row},${col}`
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
public movePlayer(
    oldRow: number,
    oldCol: number,
    newRow: number,
    newCol: number
) {

    this.cells[oldRow][oldCol]
        .classList.remove("player");

    this.cells[newRow][newCol]
        .classList.add("player");

}
  
  public clearSelections() {

    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.classList.remove("selected");
      });
    });

  }
  public showRadarRings(
    probeRow: number,
    probeCol: number,
    ringCounts: number[]
) {
    
    console.log("showRadarRings", probeRow, probeCol, ringCounts);
    
    for (let row = 0; row < this.size; row++) {

        for (let col = 0; col < this.size; col++) {

            const distance =
                Math.max(
                    Math.abs(row - probeRow),
                    Math.abs(col - probeCol)
                );
                if (distance > 1) {
                  continue;
                }
                const key = `${row},${col}`;

            if (this.probeLocations.has(key)) {
              continue;
              }
            const count = ringCounts[distance];

            const cell = this.cells[row][col];

            cell.classList.remove(
                "zero",
                "one",
                "two",
                "three",
                "mine"
            );

            if (distance === 0 && count > 0) {

    cell.classList.add("mine");

}
else {

    switch (count) {

        case 0:
            cell.classList.add("zero");
            break;

        case 1:
            cell.classList.add("one");
            break;

        case 2:
            cell.classList.add("two");
            break;

        default:
            cell.classList.add("three");
            break;

    }
    cell.textContent = `${count}`;//adds number of mines in ring as text
}

        }

    }

}
  public render(parent: HTMLElement) {
    parent.appendChild(this.element);
  }
}