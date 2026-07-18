export class Solution {

  public mines:number[];
  public weight:number;


  constructor(
    mines:number[]
  ) {

    this.mines = mines;
    this.weight = 1;

  }


  public containsMine(
    row:number,
    col:number
  ):boolean {

    return this.mines[row] === col;

  }


  public updateWeight(
    likelihood:number
  ) {

    this.weight *= likelihood;

  }


  public resetWeight() {

    this.weight = 1;

  }

}