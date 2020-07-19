var Bodies, Body, Composites, Engine, Mouse, MouseConstraint, Render, Runner, World, engine, mouse, mouseConstraint, render, runner, size, stack, world;
var setBlock;

Engine = Matter.Engine;

Render = Matter.Render;

Runner = Matter.Runner;

Body = Matter.Body;

Composites = Matter.Composites;

Common = Matter.Common;
Constraint = Matter.Constraint;

MouseConstraint = Matter.MouseConstraint;

Mouse = Matter.Mouse;

World = Matter.World;

Bodies = Matter.Bodies;

engine = Engine.create();

world = engine.world;


/*
var render = Render.create({
  options: {
    width: info.width,
    height: info.height,
    background: '#FFFFFF',
    wireframes: false
  }
});
 */
/*
block: 23,22
column: 11, 43
floor1: 45, 11
floor2: 90, 10
*/

var canvas = document.getElementById('world');
render = Render.create({
  canvas: canvas,
  element: document.body,
  engine: engine,
  options: {
    width: 1200,
    height: 600,
    background: '#b0c4de',
    wireframes: false
    //,showAngleIndicator: true
  }
});

Render.run(render);

runner = Runner.create();

Runner.run(runner, engine);

size = 25;

stack = Composites.stack(800, 280, 12, 12, 0, 0, function(x, y) {
  var partA, partB;
  partA = Bodies.rectangle(x, y, size, size / 3);
  partB = Bodies.rectangle(x, y, size / 3, size, {
    render: partA.render
  });
  return Body.create({
    parts: [partA, partB]
  });
});


/*
floor1 = Bodies.rectangle(800, 450, 160, 10,{
       render: {
        fillStyle: '#8b4513',
		//strokeStyle: '#8b4513',
		lineWidth:1 
	}
});
floor2 = Bodies.rectangle(1000, 450, 160, 10,{
       render: {
        fillStyle: '#8b4513',
		//strokeStyle: '#8b4513',
		lineWidth:1 
	}
});
World.add(world, [floor1, floor2]);


column1 = Bodies.rectangle(750, 500, 10, 100,{
       render: {
        fillStyle: '#8b4513',
		//strokeStyle: '#8b4513',
		lineWidth:1 
	}
});

column2 = Bodies.rectangle(850, 500, 10, 100,{
       render: {
        fillStyle: '#8b4513',
		//strokeStyle: '#8b4513',
		lineWidth:1 
	}
});

column3 = Bodies.rectangle(950, 500, 10, 100,{
       render: {
        fillStyle: '#8b4513',
		//strokeStyle: '#8b4513',
		lineWidth:1 
	}
});

column4 = Bodies.rectangle(1050, 500, 10, 100,{
       render: {
        fillStyle: '#8b4513',
		//strokeStyle: '#8b4513',
		lineWidth:1 
	}
});


World.add(world, [column1, column2, column3, column4]);
*/
/*
block: 23,22
column: 11, 43
floor1: 45, 11
floor2: 90, 10
*/

square_blocks = []
columns = []
s_floors = []
m_floors = []

for (let i = 0; i < 10; i++) {
  columns.push(Bodies.rectangle(1000 - (i*40), 550, 11, 43, {render: {sprite: {texture: './images/column.png'}}}));
}
columns.push(Bodies.rectangle(650, 550, 11, 43, {render: {sprite: {texture: './images/column.png'}}}));
for (let i = 0; i < 9; i++) {
  s_floors.push(Bodies.rectangle(980 - (i*40), 530, 45, 11, {render: {sprite: {texture: './images/floor_s.png'}}}));
}

for (let i = 0; i < 4; i++) {
  m_floors.push(Bodies.rectangle(960 - (i*90), 510, 90, 10, {render: {sprite: {texture: './images/floor_m.png'}}}));
}


// 2段目
for (let i = 0; i < 9; i++) {
  columns.push(Bodies.rectangle(980 - (i*40), 490, 11, 43, {render: {sprite: {texture: './images/column.png'}}}));
}
columns.push(Bodies.rectangle(1000, 490, 11, 43, {render: {sprite: {texture: './images/column.png'}}}));
for (let i = 0; i < 8; i++) {
  s_floors.push(Bodies.rectangle(960 - (i*40), 460, 45, 11, {render: {sprite: {texture: './images/floor_s.png'}}}));
}

for (let i = 0; i < 4; i++) {
  m_floors.push(Bodies.rectangle(960 - (i*90), 440, 90, 10, {render: {sprite: {texture: './images/floor_m.png'}}}));
}

// 3段目
for (let i = 0; i < 5; i++) {
  square_blocks.push(Bodies.rectangle(980 - (i*75), 430, 23, 22, {render: {sprite: {texture: './images/block.png'}}}));
}
for (let i = 0; i < 5; i++) {
  square_blocks.push(Bodies.rectangle(980 - (i*75), 405, 23, 22, {render: {sprite: {texture: './images/block.png'}}}));
}
for (let i = 0; i < 5; i++) {
  square_blocks.push(Bodies.rectangle(980 - (i*75), 380, 23, 22, {render: {sprite: {texture: './images/block.png'}}}));
}

for (let i = 0; i < 4; i++) {
  m_floors.push(Bodies.rectangle(970 - (i*90), 370, 90, 10, {render: {sprite: {texture: './images/floor_m.png'}}}));
}





//m_floors.push(Bodies.rectangle(900, 400, 90, 10, {render: {sprite: {texture: './images/floor_m.png'}}}));



blocks = [];
blocks = blocks.concat(square_blocks);
blocks = blocks.concat(columns);
blocks = blocks.concat(s_floors);
blocks = blocks.concat(m_floors);
World.add(world, blocks);





// add soft global constraint
var body = Bodies.polygon(180, 400, 5, 20,
    {
        render: {
            sprite: { //スプライトの設定
                texture: './images/red_bird.png' //スプライトに使うテクスチャ画像を指定
            }
        }
    }
);

var constraint = Constraint.create({
    pointA: { x: 180, y: 420 },
    bodyB: body,
    pointB: { x: 0, y: 0 },
    stiffness: 0.02,

    render: {
		strokeStyle: '#8b4513',
		lineWidth:1 
	}
});

World.add(world, [
  //stack, 
  body,constraint,  
//  Bodies.rectangle(600, 400, 30, 400, {
//    isStatic: true
//  }), 
  Bodies.rectangle(1200, 300, 50, 600, {
    isStatic: true
  }), 
  Bodies.rectangle(0, 300, 50, 600, {
    isStatic: true
  }), 
  Bodies.rectangle(600, 609, 1200, 50, {
    isStatic: true
  })
]);




//setTimeout(World.remove(world, [constraint]), 3000);

Matter.Events.on(engine, 'mouseup',

function() {
  console.log('aaa');
  World.remove(world, [constraint])
}
);



mouse = Mouse.create(render.canvas);

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

render.mouse = mouse;

Render.lookAt(render, {
  min: {
    x: 0,
    y: 0
  },
  max: {
    x: 1200,
    y: 600
  }
});


canvas.addEventListener('mouseup', e => {
  console.log('bbb');
  setTimeout(
    function(){
      World.remove(world, [constraint]);
    }  
  , 100);
});





window.app = setBlock = function(type, x, y) {
    var height, width;
    switch (type) {
      case 'block':
        width = 23;
        height = 22;
        break;
      case 'column':
        width = 11;
        height = 43;
        break;
      case 'floor_s':
        width = 45;
        height = 11;
        break;
      case 'floor_m':
        width = 90;
        height = 10;
    }
    return Bodies.rectangle(x, y, width, height, {
      render: {
        sprite: {
          texture: "./images/" + type + ".png"
        }
      }
    });
  };