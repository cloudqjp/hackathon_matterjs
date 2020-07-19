var info = {
  width: window.innerWidth,
  height: window.innerHeight
}

// 必要なオブジェクトの作成
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Events = Matter.Events,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Common = Matter.Common,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  World = Matter.World,
  Vector = Matter.Vector,
  Vertices = Matter.Vertices,
  Bounds = Matter.Bounds,
  Body = Matter.Body,
  Bodies = Matter.Bodies;

var engine = Engine.create(),
  world = engine.world;

// canvasの作成
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: info.width,
    height: info.height,
    background: '#FFFFFF',
    hasBounds: true,
    showAngleIndicator: true,
    showCollisions: true,
    wireframes: false
  }
});

// 描画開始
Render.run(render);

// 物理エンジン起動
var runner = Runner.create();
Runner.run(runner, engine);

// add mouse control
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });
World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;
var walls = [
  // walls
  Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
  Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
  Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
  Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
  Bodies.rectangle(200, 150, 400, 20, { isStatic: true, angle: -Math.PI * 0.06 }),
  Bodies.rectangle(500, 350, 650, 20, { isStatic: true, angle: Math.PI * 0.06 }),
  Bodies.rectangle(300, 560, 600, 20, { isStatic: true, angle: -Math.PI * 0.04 })
];
World.add(world, walls);
var scale = 0.9;
World.add(world, Composites.car(150, 100, 150 * scale, 30 * scale, 30 * scale));

/*
World.add(world, [
  Bodies.rectangle(200, 150, 400, 20, { isStatic: true, angle: Math.PI * 0.06 }),
  Bodies.rectangle(500, 350, 650, 20, { isStatic: true, angle: -Math.PI * 0.06 }),
  Bodies.rectangle(300, 560, 600, 20, { isStatic: true, angle: Math.PI * 0.04 })
]);
*/

// add mouse control
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;


// fit the render viewport to the scene
Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: 800, y: 600 }
});

// get the centre of the viewport
var viewportCentre = {
  x: render.options.width * 0.5,
  y: render.options.height * 0.5
};


// keep track of current bounds scale (view zoom)
var boundsScaleTarget = 1,
  boundsScale = {
  x: 1,
  y: 1
};


// use the engine tick event to control our view
Events.on(engine, 'beforeTick', function (event) {

  var world = engine.world,
    mouse = mouseConstraint.mouse,
    translate;

  // mouse wheel controls zoom
  var scaleFactor = mouse.wheelDelta * -0.1;
  if (scaleFactor !== 0) {
    if ((scaleFactor < 0 && boundsScale.x >= 0.6) || (scaleFactor > 0 && boundsScale.x <= 1.4)) {
      boundsScaleTarget += scaleFactor;
    }
  }

  // if scale has changed
  if (Math.abs(boundsScale.x - boundsScaleTarget) > 0.01) {
    // smoothly tween scale factor
    scaleFactor = (boundsScaleTarget - boundsScale.x) * 0.2;
    boundsScale.x += scaleFactor;
    boundsScale.y += scaleFactor;

    // scale the render bounds
    render.bounds.max.x = render.bounds.min.x + render.options.width * boundsScale.x;
    render.bounds.max.y = render.bounds.min.y + render.options.height * boundsScale.y;

    // translate so zoom is from centre of view
    translate = {
      x: render.options.width * scaleFactor * -0.5,
      y: render.options.height * scaleFactor * -0.5
    };

    Bounds.translate(render.bounds, translate);

    // update mouse
    Mouse.setScale(mouse, boundsScale);
    Mouse.setOffset(mouse, render.bounds.min);
  }

  // get vector from mouse relative to centre of viewport
  var deltaCentre = Vector.sub(mouse.absolute, viewportCentre),
    //centreDist = Vector.magnitude(deltaCentre);
    centreDist = Vector.angle(mouse.absolute, viewportCentre);
  // translate the view if mouse has moved over 50px from the centre of viewport

    // create a vector to translate the view, allowing the user to control view speed
    var direction = Vector.normalise(deltaCentre),
      speed = centreDist * 0.005;

    translate = Vector.mult(direction, speed);
    walls.map(wall => {
      Body.rotate(wall, speed, {
        x: render.options.width / 2,
        y: render.options.height / 2,
      });
    })
    // move the view
    Bounds.translate(render.bounds, translate);

    // we must update the mouse too
    Mouse.setOffset(mouse, render.bounds.min);

});
