export class RadarEngine {

    private mines: Set<string>;


    constructor(mines: string[]) {

        this.mines = new Set(mines);

    }


    public scan(
    row: number,
    col: number
): number[] {

    // Index = distance
    // Value = number of mines at that distance
    const ringCounts = [0, 0, 0, 0, 0];

    for (const mine of this.mines) {

        const [mineRow, mineCol] =
            mine.split(",").map(Number);

        const distance =
            Math.max(
                Math.abs(row - mineRow),
                Math.abs(col - mineCol)
            );

        ringCounts[distance]++;

    }

    return ringCounts;

}

}