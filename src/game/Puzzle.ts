import { Solution } from './Solution';


export class Puzzle {

  private size:number;
  private actualSolution:number[];


  constructor(size:number) {

    this.size = size;
    this.actualSolution = this.generateRandomSolution();

  }


  private generateRandomSolution():number[] {

    const columns:number[] = [];

    for(let i=0;i<this.size;i++) {
      columns.push(i);
    }


    for(let i=this.size-1;i>0;i--) {

      const j = Math.floor(Math.random()*(i+1));

      const temp = columns[i];
      columns[i] = columns[j];
      columns[j] = temp;

    }


    return columns;

  }


  public isMine(
    row:number,
    col:number
  ):boolean {

    return this.actualSolution[row] === col;

  }


  public getActualSolution():number[] {

    return this.actualSolution;

  }


  public getAllSolutions():Solution[] {

    const solutions:Solution[] = [];


    const generate = (
      current:number[],
      remaining:number[]
    ) => {


      if(remaining.length === 0) {

        solutions.push(
          new Solution([...current])
        );

        return;

      }


      for(let i=0;i<remaining.length;i++) {

        const next = remaining[i];

        generate(
          [...current,next],
          [
            ...remaining.slice(0,i),
            ...remaining.slice(i+1)
          ]
        );

      }

    };


    const columns:number[] = [];

    for(let i=0;i<this.size;i++) {
      columns.push(i);
    }


    generate([], columns);


    return solutions;

  }
public getMineLocations(): string[] {

    const locations:string[] = [];

    for(let row = 0; row < this.size; row++) {

        const col = this.actualSolution[row];

        locations.push(
            `${row},${col}`
        );

    }

    return locations;

}
}