"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.drawPoint = function () {
        console.log("x, y: ", this.x, this.y);
    };
    Point.prototype.calcArea = function (data) {
        var x = Math.abs(data.getX() - this.x);
        var y = Math.abs(data.getY() - this.y);
        var area = Math.pow(x, 2) + Math.pow(y, 2);
        return +Math.sqrt(area).toFixed(2);
    };
    Point.prototype.getX = function () {
        return this.x;
    };
    Point.prototype.getY = function () {
        return this.y;
    };
    return Point;
}());
exports.Point = Point;
