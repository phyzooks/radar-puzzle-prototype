import { Solution } from './Solution';


export class ProbabilityEngine {

  private solutions:Solution[];


  constructor(
  solutions: Solution[]
) {

  this.solutions = solutions;

  this.normalize();

}



  public update(
    row:number,
    col:number,
    reading:number
  ) {


    for(const solution of this.solutions) {


      const hasMine =
        solution.containsMine(row,col);


      let likelihood:number;


      if(hasMine) {

        likelihood =
          reading / 100;

      } else {

        likelihood =
          1 - (reading / 100);

      }


      solution.updateWeight(
        likelihood
      );

    }


    this.normalize();

  }




  private normalize() {


    let total = 0;


    for(const solution of this.solutions) {

      total += solution.weight;

    }


    for(const solution of this.solutions) {

      solution.weight /= total;

    }

  }




  public getProbability(
    row:number,
    col:number
  ):number {


    let probability = 0;


    for(const solution of this.solutions) {


      if(solution.containsMine(row,col)) {

        probability += solution.weight;

      }

    }


    return probability;

  }

}