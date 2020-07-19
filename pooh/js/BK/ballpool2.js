var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;
        

    // create engine
    var engine = Engine.create(),
        world = engine.world;
        

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1300,// canvas�̃T�C�Y
            height: 600,// canvas�̃T�C�Y
            showAngleIndicator: true,
            background: '#FEEEED',
            wireframeBackground: '#FEEEED',
            wireframes: false,
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    var rnd = parseInt(Math.random() * 10);
    var x = 320 + rnd * 10;
	var y = 0 - rnd * 120;
	
    // add bodies
    World.add(world, [
      Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true }),
      Bodies.circle(x, y, 60, { //�{�[����ǉ�
        density: 0.0005, // ���x: �P�ʖʐς�����̎���
        frictionAir: 0.06, // ��C��R(��C���C)
        restitution: 1, // �e�͐�
        friction: 0.01, // �{�̖̂��C
        render: { //�{�[���̃����_�����O�̐ݒ�
          sprite: { //�X�v���C�g�̐ݒ�
            texture: './poo.jpg' //�X�v���C�g�Ɏg���e�N�X�`���摜���w��
          }
        },
        timeScale: 1.5 //���Ԃ̔{����ݒ�(1��1�{��)
      })  
  ]);
  


    var stack = Composites.stack(100, 0, 10, 8, 10, 10, function(x, y) {
        return Bodies.circle(x, y, Common.random(15, 30), { restitution: 0.6, friction: 0.1 });
    });
    
    World.add(world, [
        stack,
        Bodies.polygon(200, 460, 3, 60),
        Bodies.polygon(400, 460, 5, 60),
        Bodies.rectangle(600, 460, 80, 80),
        Bodies.circle(x, y, 60, { //�{�[����ǉ�
			density: 0.0005, // ���x: �P�ʖʐς�����̎���
			frictionAir: 0.06, // ��C��R(��C���C)
			restitution: 1, // �e�͐�
			friction: 0.01, // �{�̖̂��C
			render: { //�{�[���̃����_�����O�̐ݒ�
				sprite: { //�X�v���C�g�̐ݒ�
					texture: './poo.jpg' //�X�v���C�g�Ɏg���e�N�X�`���摜���w��
				}
			},
			timeScale: 1.5 //���Ԃ̔{����ݒ�(1��1�{��)
		})
    ]);

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
    

        loadImage(
          "./poo.jpg",
          url => {
            console.log("Success");    
      World.add(world, [
        stack,
        Bodies.polygon(200, 460, 3, 60),
        Bodies.polygon(400, 460, 5, 60),
        Bodies.rectangle(600, 460, 80, 80),
        Bodies.circle(x, y, 60, { //�{�[����ǉ�
			density: 0.0005, // ���x: �P�ʖʐς�����̎���
			frictionAir: 0.06, // ��C��R(��C���C)
			restitution: 1, // �e�͐�
			friction: 0.01, // �{�̖̂��C
			render: { //�{�[���̃����_�����O�̐ݒ�
				sprite: { //�X�v���C�g�̐ݒ�
					texture: './poo.jpg' //�X�v���C�g�Ɏg���e�N�X�`���摜���w��
				}
			},
			timeScale: 1.5 //���Ԃ̔{����ݒ�(1��1�{��)
		})
    ]);
  },
  () => {
    console.log("Error  Loading ");
  }
);

const loadImage = (url, onSuccess, onError) => {
  const img = new Image();
  img.onload = () => {
    onSuccess(img.src);
  };
  img.onerror = onError();
  img.src = url;
};

  loadImage(
    "./poo.jpg",
    url => {
      console.log("Success");
      World.add(world, [
        Bodies.circle(340, 340, 100, {
          density: 0.0005,
          frictionAir: 0.06,
          restitution: 0.3,
          friction: 0.01,
          render: {
            sprite: {
              texture: url // set texture here
            }
          }
        })
      ]);
    },
    () => {
      console.log("Error  Loading ");
    }
  );

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 },
    });

    // wrapping using matter-wrap plugin
    var allBodies = Composite.allBodies(world);

    for (var i = 0; i < allBodies.length; i += 1) {
        allBodies[i].plugin.wrap = {
            min: { x: render.bounds.min.x - 100, y: render.bounds.min.y },
            max: { x: render.bounds.max.x + 100, y: render.bounds.max.y }
        };
    }


