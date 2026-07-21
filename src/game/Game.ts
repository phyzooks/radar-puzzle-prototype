import { Board } from './Board';
import { Puzzle } from './Puzzle';
import { ProbeManager } from './ProbeManager';
import { Player } from './Player';
import { RadarEngine } from './RadarEngine';


export class Game {

    private turn:number = 1;
    private turnDisplay:HTMLDivElement;
    private endButton:HTMLButtonElement;
    private board: Board;
    private puzzle: Puzzle;
    private probeManager: ProbeManager;
    private player: Player;
    private radarEngine: RadarEngine;
    
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
        this.player = new Player();
        
        this.probeManager = new ProbeManager(2,5);

        
        this.radarEngine =
            new RadarEngine(
                this.puzzle.getMineLocations()
            );
        
        this.scannedTiles = new Set();
        console.log(
            "Player starts at:",
            this.player.getRow(),
            this.player.getCol()
            );

        console.log(
            "Health:",
            this.player.getHealth()
            );
    }


    public start() {

    this.board.render(this.app);
    this.board.showPlayer(
        this.player.getRow(),
        this.player.getCol()
        );
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
this.board.markProbe(
    row,
    col
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

} 
/*else {

    element.classList.remove("selected");

}*/

console.log(
    "Current probes:",
    this.probeManager.getProbes()
);
}

}
