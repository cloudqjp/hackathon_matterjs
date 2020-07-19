

// add mouse control
//var mouse = Mouse.create(render.canvas),
//    mouseConstraint = MouseConstraint.create(engine, {
//        mouse: mouse,
//        constraint: {
//            stiffness: 0.2,
//            render: {
//                visible: false
//            }
//        }
//    });


var circle_red = Bodies.circle(info.width / 2, 0, 60, {
  render: {
    fillStyle: '#FF0000'
  },
  collisionFilter: {
    group: 0
  }
});
// var circle_blue = Bodies.circle(info.width - 200, 0, 60, {
//   render: {
//     fillStyle: '#0000FF'
//   }
// });
// var floor = Bodies.rectangle(info.width / 2, info.height, info.width, 30, {
//   isStatic: true
// });
var wall = Bodies.rectangle(0, info.height - 300 , 60, info.height, {
  isStatic: true,
  render: {
    fillStyle: '#ff0099'
  },
  collisionFilter: {
    group: 1
  }
});

World.add(world, [
  circle_red,
  wall
]);
