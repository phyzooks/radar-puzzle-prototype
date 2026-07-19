import { Solution } from './Solution';


export class HypothesisEngine {

    private possibleSolutions: Solution[];

    constructor(
        allSolutions: Solution[]
    ) {
        this.possibleSolutions =
            [...allSolutions];
    }

    public filterByRadar(
        row:number,
        col:number,
        distance:number
    ) {

        this.possibleSolutions =
            this.possibleSolutions.filter(
                solution => {
                    return this.calculateDistance(
                        solution,
                        row,
                        col
                    ) === distance;
                }
            );
    }

    private calculateDistance(
        solution:Solution,
        row:number,
        col:number
    ):number {
        let closestDistance = Infinity;
        for(let r = 0; r < solution.mines.length; r++) {
            const mineCol =
                solution.mines[r];
            const distance =
                Math.max(
                    Math.abs(row-r),
                    Math.abs(col-mineCol)
                );
            if(distance < closestDistance) {
                closestDistance = distance;
            }
        }
        return closestDistance;
    }
    public getSolutionCount():number {
        return this.possibleSolutions.length;
    }
    public getMineProbability(
        row:number,
        col:number
    ):number {
        if(this.possibleSolutions.length === 0) {
            return 0;
        }
        let mineCount = 0;
        for(const solution of this.possibleSolutions) {
            if(solution.containsMine(row,col)) {
                mineCount++;
            }
        }

        return mineCount /
            this.possibleSolutions.length;
    }
}