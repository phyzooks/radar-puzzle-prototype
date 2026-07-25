export class Player {

    private row: number;
    private col: number;
    private health: number;

    constructor() {

        this.row = 0;
        this.col = 0;
        this.health = 100;

    }

    public getRow(): number {
        return this.row;
    }

    public getCol(): number {
        return this.col;
    }

    public getHealth(): number {
        return this.health;
    }

    public moveTo(
        row: number,
        col: number
    ) {

        this.row = row;
        this.col = col;

    }
   /* public canMoveTo(
    row: number,
    col: number
): boolean {

    const rowDistance =
        Math.abs(row - this.row);

    const colDistance =
        Math.abs(col - this.col);

    return (
        rowDistance + colDistance === 1
    );

}*/
//This is 8-direction movement. May use for easy mode.
public canMoveTo(
    row: number,
    col: number
): boolean {

    const rowDistance =
        Math.abs(row - this.row);

    const colDistance =
        Math.abs(col - this.col);

    return (
        rowDistance <= 1 &&
        colDistance <= 1 &&
        !(rowDistance === 0 && colDistance === 0)
    );

}

    public move(
        row: number,
        col: number
    ) {

        this.row = row;
        this.col = col;

    }

    public takeDamage(
        amount: number
    ) {

        this.health =
            Math.max(
                0,
                this.health - amount
            );

    }

    public isAlive(): boolean {

        return this.health > 0;

    }

}