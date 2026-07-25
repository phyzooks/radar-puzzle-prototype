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

                damage += 100;

            }
            else if (distance === 1) {

                damage += 10;

            }
            else if (distance === 2) {

                damage += 2;

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

            damage = 100;

        }
        else if (distance === 1) {

            damage = 10;

        }
        else if (distance === 2) {

            damage = 2;

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