var ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true }),
rockOptions = { density: 0.004, render: {fillStyle: '#FF0000'} },
rock = Bodies.polygon(170, 450, 20, 20, rockOptions),
anchor = { x: 170, y: 450 },
elastic = Matter.Constraint.create({ 
    pointA: anchor, 
    bodyB: rock, 
    stiffness: 0.05
});
World.add(engine.world, [elastic, rock]);


var wall = Bodies.rectangle(info.width - 30, info.height - 700 , 60, info.height / 8, {
  isStatic: true,
  collisionFilter: {
    group: 0
  }
});

World.add(world, [
  wall
]);
