export class ProbeManager {
  private selectedProbes: Set<string>;
  public reset() {
    this.selectedProbes.clear();
  }
  private maxProbes: number;
  private turn: number;
  private maxTurns: number;

  constructor(maxProbes: number = 5, maxTurns: number = 5) {
    this.selectedProbes = new Set();
    this.maxProbes = maxProbes;
    this.turn = 1;
    this.maxTurns = maxTurns;
  }

  public addProbe(row: number, col: number): boolean {
    const key = `${row},${col}`;

    if (this.selectedProbes.has(key)) {
      return false;
    }

    if (this.selectedProbes.size >= this.maxProbes) {
      return false;
    }

    this.selectedProbes.add(key);
    return true;
  }

  public getProbes(): string[] {
    return Array.from(this.selectedProbes);
  }

  public getCount(): number {
    return this.selectedProbes.size;
  }

  public endTurn(): string[] {
    const completedProbes = this.getProbes();

    this.selectedProbes.clear();

    if (this.turn < this.maxTurns) {
      this.turn++;
    }

    return completedProbes;
  }

  public getTurn(): number {
    return this.turn;
  }

  public isGameOver(): boolean {
    return this.turn >= this.maxTurns;
  }
}