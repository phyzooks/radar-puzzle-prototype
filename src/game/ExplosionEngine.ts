export interface ExplosionResult {

    row: number;
    col: number;
    damage: number;

}
export class ExplosionEngine {

    private mines: string[];

    constructor(
        mines: string[]
    ) {

        this.mines = mines;

    }

    private oneMine = 10;
    private twoMine = 3;
    private threeMine = 1;
    private onMine = 50;

    public calculateDamage(
        row:number,
        col:number
    ):number {

        let damage = 0;


        for (const mine of this.mines) {

            const [mineRow, mineCol] =
                mine.split(",").map(Number);


            const distance =
                Math.max(
                    Math.abs(row - mineRow),
                    Math.abs(col - mineCol)
                );


            if (distance === 0) {

                damage += this.onMine;

            }
            else if (distance === 1) {

                damage += this.oneMine;

            }
            else if (distance === 2) {

                damage += this.twoMine;

            }
            else if (distance === 3) {

                damage += this.threeMine;

            }

        }


        return damage;

    }
    public getExplosionResults(
    row:number,
    col:number
): ExplosionResult[] {

    const results: ExplosionResult[] = [];


    for (const mine of this.mines) {

        const [mineRow, mineCol] =
            mine.split(",").map(Number);


        const distance =
            Math.max(
                Math.abs(row - mineRow),
                Math.abs(col - mineCol)
            );


        let damage = 0;


        if (distance === 0) {

                damage += this.onMine;

            }
            else if (distance === 1) {

                damage += this.oneMine;

            }
            else if (distance === 2) {

                damage += this.twoMine;

            }
            else if (distance === 3) {

                damage += this.threeMine;

            }


        if (damage > 0) {

            results.push({

                row: mineRow,
                col: mineCol,
                damage: damage

            });

        }

    }


    return results;

}

}