
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
            width: 1300,
            height: 600,
            showAngleIndicator: true,    
            wireframes: false,
            //background: '#FEEEED',
            background : 'C:Users/chikataira-letsnote/Desktop/オンラインセミナー/テックジム講座/オンライン・ハッカソン/hackathon_matterjs-master/js/images/poo.jpg',
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
    ]);

    var stack = Composites.stack(100, 0, 10, 8, 10, 10, function(x, y) {
        return Bodies.circle(x, y, Common.random(15, 30), { restitution: 0.6, friction: 0.1 });
    });
    
    World.add(world, [
        stack,
        Bodies.polygon(200, 460, 3, 60, {
			render: {
				sprite: { //スプライトの設定
                    texture: 'C:Users/chikataira-letsnote/Desktop/オンラインセミナー/テックジム講座/オンライン・ハッカソン/hackathon_matterjs-master/js/images/poo3.png' //スプライトに使うテクスチャ画像を指定
				}
			}
		}),
        Bodies.polygon(400, 460, 5, 60, {
			render: {
				sprite: { //スプライトの設定
                    texture: 'C:Users/chikataira-letsnote/Desktop/オンラインセミナー/テックジム講座/オンライン・ハッカソン/hackathon_matterjs-master/js/images/poo4.png' //スプライトに使うテクスチャ画像を指定
				}
			}
		}),
        Bodies.rectangle(600, 460, 80, 80, {
			render: {
				sprite: { //スプライトの設定
                    texture: 'C:Users/chikataira-letsnote/Desktop/オンラインセミナー/テックジム講座/オンライン・ハッカソン/hackathon_matterjs-master/js/images/poo.png' //スプライトに使うテクスチャ画像を指定
				}
			}
		}),
        Bodies.circle(x, y, 60, {
			render: {
				sprite: { //スプライトの設定
                    texture: 'C:Users/chikataira-letsnote/Desktop/オンラインセミナー/テックジム講座/オンライン・ハッカソン/hackathon_matterjs-master/js/images/poo2.png' //スプライトに使うテクスチャ画像を指定
				}
			}
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

    World.add(world, mouseConstraint);
    
    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // wrapping using matter-wrap plugin
    var allBodies = Composite.allBodies(world);

    for (var i = 0; i < allBodies.length; i += 1) {
        allBodies[i].plugin.wrap = {
            min: { x: render.bounds.min.x - 100, y: render.bounds.min.y },
            max: { x: render.bounds.max.x + 100, y: render.bounds.max.y }
        };
    }

    

