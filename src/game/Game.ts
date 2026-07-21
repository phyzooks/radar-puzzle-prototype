import { Board } from './Board';
import { Puzzle } from './Puzzle';
import { ProbeManager } from './ProbeManager';
import { ProbeEngine } from './ProbeEngine';
import { ProbabilityEngine } from './ProbabilityEngine';
import { RadarEngine } from './RadarEngine';
import { HypothesisEngine } from './HypothesisEngine';



export class Game {

    private turn:number = 1;
    private turnDisplay:HTMLDivElement;
    private endButton:HTMLButtonElement;
    private board: Board;
    private puzzle: Puzzle;
    private probeManager: ProbeManager;
    private probeEngine: ProbeEngine;
    private probabilityEngine: ProbabilityEngine;
    private radarEngine: RadarEngine;
    private hypothesisEngine: HypothesisEngine;
    private scannedTiles: Set<string>;
    

    private app: HTMLElement;


    constructor(app: HTMLElement) {

        this.app = app;

        this.puzzle = new Puzzle(5);

        this.board = new Board(
            5,
            this.puzzle,
            this.handleCellClick.bind(this)
        );

        
        this.probeManager = new ProbeManager();

        this.probeEngine =
            new ProbeEngine(this.puzzle);


        this.probabilityEngine =
            new ProbabilityEngine(
                this.puzzle.getAllSolutions()
            );
        this.radarEngine =
            new RadarEngine(
                this.puzzle.getMineLocations()
            );
        
        this.scannedTiles = new Set();
    }


    public start() {

    this.board.render(this.app);

    this.createControls();

    }
    private endTurn() {

    console.log(
        "Ending turn:",
        this.turn
    );


    this.turn++;

    this.turnDisplay.textContent =
        `Turn ${this.turn}/5`;

    }
    private createControls() {

    this.turnDisplay =
        document.createElement('div');

    this.turnDisplay.textContent =
        `Turn ${this.turn}/5`;


    this.endButton =
        document.createElement('button');

    this.endButton.textContent =
        "End Turn";


    this.endButton.onclick =
        () => this.endTurn();


    this.app.appendChild(
        this.turnDisplay
    );

    this.app.appendChild(
        this.endButton
    );

}

    private handleCellClick(
    row: number,
    col: number,
    element: HTMLDivElement
    ) {

    const added =
        this.probeManager.addProbe(row, col);


    if (!added) {

        console.log(
            "Maximum probes reached"
        );

        return;

    }
    const signal =
    this.radarEngine.scan(row,col);

    console.log(
    "Radar signal:",
    signal
);
this.board.showRadarRings(
    row,
    col,
    signal
);


this.scannedTiles.add(
    `${row},${col}`
);

this.board.showScanned(
    row,
    col
);

if (
    this.probeManager.getProbes()
        .includes(`${row},${col}`)
) {

    element.classList.add("selected");

} else {

    element.classList.remove("selected");

}

console.log(
    "Current probes:",
    this.probeManager.getProbes()
);
}

}
