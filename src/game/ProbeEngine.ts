import { Puzzle } from './Puzzle';

export class ProbeEngine {

  private puzzle: Puzzle;

  constructor(puzzle: Puzzle) {
    this.puzzle = puzzle;
  }


  public scan(row: number, col: number): number {

    const mine = this.puzzle.isMine(row, col);

    let reading: number;

    if (mine) {
      reading = 90 + Math.random() * 10;
    } else {
      reading = Math.random() * 10;
    }

    return Math.round(reading);
  }


  public scanMultiple(probes: string[]): Map<string, number> {

    const results = new Map<string, number>();

    for (const probe of probes) {

      const [row, col] = probe
        .split(',')
        .map(Number);

      results.set(
        probe,
        this.scan(row, col)
      );
    }

    return results;
  }
}