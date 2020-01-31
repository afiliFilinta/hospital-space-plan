
import { settings } from './settings.js';

export default class {

  static getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  static getDirections(index) {
    if (index === undefined)
      index = this.getRandomInt(0, settings.directions.length);
    return settings.directions[index];
  }

  static getEdgeLength(rule) {
    let height = 0;
    let width = 0;
    let area = 0;
    while (rule.edge.min > height || height > rule.edge.max) {
      width = this.getRandomArbitrary(rule.edge.min, rule.edge.max);
      area = this.getRandomArbitrary(rule.area.min, rule.area.max);
      height = area / width;
    }
    return {
      width,
      height
    }
  }

  static isCollisionBetweenTwoSquare(squareA, squareB) {
    if (squareA.direction.id === squareB.direction.id) {
      return true;
    }
    return false;
  }

  static print(rule) {
    console.log("*************************");
    console.log(rule.name);
    console.log("*************************");
  }

  static addNewSquare(a1, a2, width, height, direction) {

    console.log(`Point a1: ${JSON.stringify(a1)}`);
    console.log(`Point a2: ${JSON.stringify(a2)}`);
    console.log(`Width: ${width}`);
    console.log(`height: ${height}`);
    console.log(`direction: ${JSON.stringify(direction)}`);

    let startPoint = {
      x: 0,
      y: 0
    };
    let endPoint = {
      x: 0,
      y: 0
    }
    // startPoint.x = _util.getRandomArbitrary(a1.x, a2.x);
    // startPoint.y = _util.getRandomArbitrary(a1.y, a2.y);

    let rondomPoint = a1;
    let otherPoint = a2;
    if (_util.getRandomInt(0, 2) === 0) {
      rondomPoint = a2;
      otherPoint = a1;
    }

    startPoint.x = rondomPoint.x;
    startPoint.y = rondomPoint.y;

    if (direction.name === 'left') {
      startPoint.x = a1.x > a2.x ? a1.x : a2.x;
      endPoint.x = startPoint.x + width;
      endPoint.y = startPoint.y > otherPoint.y ? startPoint.y - height : startPoint.y + height;
    }
    if (direction.name === 'right') {
      startPoint.x = a1.x > a2.x ? a2.x : a1.x;
      endPoint.x = startPoint.x - width;
      endPoint.y = startPoint.y > otherPoint.y ? startPoint.y - height : startPoint.y + height;
    }
    if (direction.name === 'top') {
      startPoint.y = a1.y > a2.y ? a1.y : a2.y;
      endPoint.y = startPoint.y + height;
      endPoint.x = startPoint.x > otherPoint.x ? startPoint.x - width : startPoint.x + width;
    }
    if (direction.name === 'bottom') {
      startPoint.y = a1.y > a2.y ? a2.y : a1.y;
      endPoint.y = startPoint.y - height;
      endPoint.x = startPoint.x > otherPoint.x ? startPoint.x - width : startPoint.x + width;
    }

    console.log(`Start Point: ${JSON.stringify(startPoint)}`);
    console.log(`End Point: ${JSON.stringify(endPoint)}`);

    return {
      startPoint,
      endPoint
    }
  }
}