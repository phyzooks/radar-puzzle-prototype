import { Board } from './Board';
import { Puzzle } from './Puzzle';
import { ProbeManager } from './ProbeManager';
import { Player } from './Player';
import { RadarEngine } from './RadarEngine';
import { ExplosionEngine } from './ExplosionEngine';

export class Game {

    private turn:number = 1;
    private turnDisplay!:HTMLDivElement;
    private endButton!:HTMLButtonElement;
    private board: Board;
    private puzzle!: Puzzle;
    private probeManager: ProbeManager;
    private player!: Player;
    private radarEngine!: RadarEngine;
    private scannedTiles: Set<string>;
    private app: HTMLElement;
    private readonly boardSize = 5;
    private readonly goalRow = this.boardSize - 1;
    private readonly goalCol = this.boardSize - 1;
    private waitingForMove: boolean = false;
    private waitingForNextTurn: boolean = false;
    private explosionEngine!: ExplosionEngine;

    private createMineField() {

    this.puzzle = new Puzzle(
        this.boardSize,
        this.player.getRow(),
        this.player.getCol()
    );


    this.radarEngine =
        new RadarEngine(
            this.puzzle.getMineLocations()
        );


    this.explosionEngine =
        new ExplosionEngine(
            this.puzzle.getMineLocations()
        );
        
        this.board.setPuzzle(
            this.puzzle
        );


    console.log(
        "New mine locations:",
        this.puzzle.getMineLocations()
    );
    
    

}

    constructor(app: HTMLElement) {

        this.app = app;
        this.player = new Player();

    
    this.board = new Board(
        this.boardSize,
        this.puzzle,
        this.handleCellClick.bind(this)
    );
        this.createMineField();
    this.probeManager = new ProbeManager(2,5);

        
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
    this.board.showGoal(
        this.goalRow,
        this.goalCol
        );
    this.createControls();

    }

    private endTurn() {

    console.log(
        "Choose movement location"
    );

    this.waitingForMove = true;

}
private startNextTurn() {

    console.log(
        "Starting next turn"
    );

    this.createMineField();

    this.probeManager.reset();

    this.board.clearTurnDisplay();

    this.waitingForNextTurn = false;

    this.endButton.textContent =
        "End Turn";

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
    () => {

        if (this.waitingForNextTurn) {

            this.startNextTurn();

        }
        else {

            this.endTurn();

        }

    };


    this.app.appendChild(
        this.turnDisplay
    );

    this.app.appendChild(
        this.endButton
    );

}
    private tryMovePlayer(
    row: number,
    col: number
) {

    const oldRow = this.player.getRow();
    const oldCol = this.player.getCol();

    if (!this.player.canMoveTo(row, col)) {

    console.log(
        "Invalid move"
    );

    return;

}

    this.player.move(
        row,
        col
    );
    console.log(
    "Player moved to:",
    row,
    col
);
    this.board.movePlayer(
        oldRow,
        oldCol,
        row,
        col
    );
    const damage =
        this.explosionEngine.calculateDamage(
            row,
            col
        );
    const explosions =
    this.explosionEngine.getExplosionResults(
        row,
        col
    );

for (const explosion of explosions) {

    this.board.showDamage(
        explosion.row,
        explosion.col,
        explosion.damage
    );

}

    console.log(
        "Explosion damage:",
        damage
        );

    this.player.takeDamage(
            damage
        );
    
    console.log(
    "----- Turn Summary -----"
);

console.log(
    "Turn:",
    this.turn
);

console.log(
    "Moved to:",
    row,
    col
);

console.log(
    "Explosion damage:",
    damage
);

console.log(
    "Health:",
    this.player.getHealth(),
    "/ 100"
);

console.log(
    "------------------------"
);
    this.board.revealMines();

       
    console.log(
        "Health:",
        this.player.getHealth()
        );

        
    this.waitingForMove = false;

    this.waitingForNextTurn = true;

    this.endButton.textContent =
        "Next Turn";
    
    this.turn++;

    this.turnDisplay.textContent =
        `Turn ${this.turn}/5`;
}

    private handleCellClick(
    row: number,
    col: number,
    element: HTMLDivElement
    ) {
    if (this.waitingForMove) {

    this.tryMovePlayer(row, col);

    return;

}
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

}

}
