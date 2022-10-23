interface IPoint {
  drawPoint(): void;
  calcArea(data: IPoint): number;
  getX(): number;
  getY(): number;
}

export class Point implements IPoint {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  drawPoint(): void {
    console.log("x, y: ", this.x, this.y);
  }

  calcArea(data: IPoint): number {
    const x = Math.abs(data.getX() - this.x);
    const y = Math.abs(data.getY() - this.y);
    const area = Math.pow(x, 2) + Math.pow(y, 2);
    return +Math.sqrt(area).toFixed(2);
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }
}
