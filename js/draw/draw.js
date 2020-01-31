define((require) => {

  function drawSquare(x1, y1, x2, y2) {
    var square = new THREE.Geometry();
    console.log(square);
    square.vertices.push(new THREE.Vector3(x1, y1, 0));
    square.vertices.push(new THREE.Vector3(x1, y2, 0));
    square.vertices.push(new THREE.Vector3(x2, y1, 0));
    square.vertices.push(new THREE.Vector3(x2, y2, 0));

    square.faces.push(new THREE.Face3(0, 1, 2));
    square.faces.push(new THREE.Face3(1, 2, 3));
    return square;
  }

  return {
    drawSquare,
  };
});

/*

  function createLine(p1, p2) {
    return {
      p1: p1,
      p2: p2
    };
  }


  function getAxis(line) {
    if (line.p1.x === line.p2.x) {
      return X;
    } else {
      return Y;
    }
  }

  function drawLines(x1, y1, x2, y2) {

    var edgeLengthFactor = 2;
    var material = new THREE.LineBasicMaterial({
      color: 0x63CFF2
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3(x1 * edgeLengthFactor, y1 * edgeLengthFactor, 0),
      new THREE.Vector3(x2 * edgeLengthFactor, y2 * edgeLengthFactor, 0)
    );
    console.log(geometry.vertices);
    var threeLine = new THREE.Line(geometry, material);
    scene.add(threeLine);
  }

  function drawCircles() {
    var circleGeo = new THREE.CircleGeometry(0.3, 32);
    var material = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF
    });

    points.forEach(point => {
      var circle = new THREE.Mesh(circleGeo, material);
      circle.position.x = point.x * edgeLengthFactor;
      circle.position.y = point.y * edgeLengthFactor;
      scene.add(circle);
    });
  }
  */