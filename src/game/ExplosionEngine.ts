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

}