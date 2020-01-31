import { Point } from './Point.js';
import * as THREE from '../../build/three.module.js';

export class Square {

  constructor(startPoint, endPoint, width, height, rule, direction) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.width = width;
    this.height = height;
    this.direction = direction;
    this.rule = rule;
    this.name = rule.name;
    this.color = rule.color;
    this.center = new Point(
      (this.startPoint.x + this.endPoint.x) / 2,
      (this.startPoint.y + this.endPoint.y) / 2);
    this.material = new THREE.MeshBasicMaterial({
      color: this.color || options.defaultColor,
      side: THREE.DoubleSide,
      //wireframe: true,
    });
    this.geometry = this.createGeometry();
  }

  createGeometry() {
    var square = new THREE.Geometry();
    square.vertices.push(new THREE.Vector3(this.startPoint.x, this.startPoint.y, 0));
    square.vertices.push(new THREE.Vector3(this.startPoint.x, this.endPoint.y, 0));
    square.vertices.push(new THREE.Vector3(this.endPoint.x, this.startPoint.y, 0));
    square.vertices.push(new THREE.Vector3(this.endPoint.x, this.endPoint.y, 0));

    square.faces.push(new THREE.Face3(0, 1, 2));
    square.faces.push(new THREE.Face3(1, 2, 3));
    return square;
  }

  updateSquare() {
    this.direction = -1;
    this.geometry = this.createGeometry();
  }
}