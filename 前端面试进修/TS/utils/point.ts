interface IPoint {
  drawPoint(): void;
  calcArea(data: IPoint): number;
  getX(): number;
  getY(): number;
}

class Point implements IPoint {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  drawPoint(): void {
    console.log("两点坐标 x y: ", this.x, this.y);
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

const p1 = new Point(2, 2);
const p2 = new Point(3, 4);
p1.drawPoint();
const distance = p1.calcArea(p2);
console.log("两点间距: ", distance);
