var info = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  
  // 必要なオブジェクトの作成
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    World = Matter.World,
    Bodies = Matter.Bodies,
    MouseConstraint = Matter.MouseConstraint;
  
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

  // 衝突イベント
  Matter.Events.on(engine, "collisionStart", 
  function() {
    element = document.getElementById('you_did_it')
    element.classList.remove('d-none');
  }
);

// マウス操作
var mousedrag = MouseConstraint.create(engine);
World.add(engine.world, mousedrag);
