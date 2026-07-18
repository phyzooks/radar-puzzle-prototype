export class RadarEngine {

    private mines: Set<string>;


    constructor(mines: string[]) {

        this.mines = new Set(mines);

    }


    public scan(row: number, col: number): number {

        let closestDistance = Infinity;


        for (const mine of this.mines) {

            const [mineRow, mineCol] =
                mine.split(",").map(Number);


            const distance =
                Math.max(
                    Math.abs(row - mineRow),
                    Math.abs(col - mineCol)
                );

                
            if (distance < closestDistance) {

                closestDistance = distance;

            }
            
        }


        return closestDistance;

    }

}