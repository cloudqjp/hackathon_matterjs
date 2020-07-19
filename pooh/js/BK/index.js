var info = {
  width: window.innerWidth,
  height: window.innerHeight
}

// 必要なオブジェクトの作成
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  World = Matter.World,
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
    wireframes: false
  }
});

// 描画開始
Render.run(render);

// 物理エンジン起動
var runner = Runner.create();
Runner.run(runner, engine);

var circle = Bodies.circle(info.width / 2, 0, 60);
var floor = Bodies.rectangle(info.width / 2, info.height - 400, 400, 30, {
  isStatic: true
});

World.add(world, [
  circle,
  floor
]);