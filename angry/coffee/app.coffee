window.app =
  init: ->
    Bodies = undefined
    Body = undefined
    Composites = undefined
    Engine = undefined
    Mouse = undefined
    MouseConstraint = undefined
    Render = undefined
    Runner = undefined
    World = undefined
    engine = undefined
    mouse = undefined
    mouseConstraint = undefined
    render = undefined
    runner = undefined
    size = undefined
    stack = undefined
    world = undefined
    setBlock = undefined
    Engine = Matter.Engine
    Render = Matter.Render
    Runner = Matter.Runner
    Body = Matter.Body
    Composites = Matter.Composites
    Common = Matter.Common
    Constraint = Matter.Constraint
    MouseConstraint = Matter.MouseConstraint
    Mouse = Matter.Mouse
    World = Matter.World
    Bodies = Matter.Bodies
    engine = Engine.create()
    world = engine.world
  
    ###
    var render = Render.create({
      options: {
        width: info.width,
        height: info.height,
        background: '#FFFFFF',
        wireframes: false
      }
    });
    ###
  
    ###
    block: 23,22
    column: 11, 43
    floor1: 45, 11
    floor2: 90, 10
    ###
  
    canvas = document.getElementById('world')
    render = Render.create(
      canvas: canvas
      element: document.body
      engine: engine
      options:
        width: 1200
        height: 600
        background: '#b0c4de'
        wireframes: false)
    Render.run render
    runner = Runner.create()
    Runner.run runner, engine
    size = 25
    stack = Composites.stack(800, 280, 12, 12, 0, 0, (x, y) ->
      partA = undefined
      partB = undefined
      partA = Bodies.rectangle(x, y, size, size / 3)
      partB = Bodies.rectangle(x, y, size / 3, size, render: partA.render)
      Body.create parts: [
        partA
        partB
      ]
    )
    floor1 = Bodies.rectangle(800, 450, 160, 10, render:
      fillStyle: '#8b4513'
      lineWidth: 1)
    floor2 = Bodies.rectangle(1000, 450, 160, 10, render:
      fillStyle: '#8b4513'
      lineWidth: 1)
    World.add world, [
      floor1
      floor2
    ]
    column1 = Bodies.rectangle(750, 500, 10, 100, render:
      fillStyle: '#8b4513'
      lineWidth: 1)
    column2 = Bodies.rectangle(850, 500, 10, 100, render:
      fillStyle: '#8b4513'
      lineWidth: 1)
    column3 = Bodies.rectangle(950, 500, 10, 100, render:
      fillStyle: '#8b4513'
      lineWidth: 1)
    column4 = Bodies.rectangle(1050, 500, 10, 100, render:
      fillStyle: '#8b4513'
      lineWidth: 1)
    World.add world, [
      column1
      column2
      column3
      column4
    ]
  
    ###
    block: 23,22
    column: 11, 43
    floor1: 45, 11
    floor2: 90, 10
    ###
  
    block = Bodies.rectangle(1050, 400, 23, 22, render: sprite: texture: './images/block.png')
    column = Bodies.rectangle(1000, 400, 11, 43, render: sprite: texture: './images/column.png')
    floor_s = Bodies.rectangle(950, 400, 45, 11, render: sprite: texture: './images/floor_s.png')
    floor_m = Bodies.rectangle(900, 400, 90, 10, render: sprite: texture: './images/floor_m.png')
    blocks = []
    blocks.push block
    blocks.push column
    blocks.push floor_s
    blocks.push floor_m
    #block2 = this.setBlock('block', 800, 500);
    #blocks.push(block2);
    World.add world, blocks
    # add soft global constraint
    body = Bodies.polygon(180, 400, 5, 20, render: sprite: texture: './images/red_bird.png')
    constraint = Constraint.create(
      pointA:
        x: 180
        y: 420
      bodyB: body
      pointB:
        x: 0
        y: 0
      stiffness: 0.02
      render:
        strokeStyle: '#8b4513'
        lineWidth: 1)
    World.add world, [
      body
      constraint
      Bodies.rectangle(1200, 300, 50, 600, isStatic: true)
      Bodies.rectangle(0, 300, 50, 600, isStatic: true)
      Bodies.rectangle(600, 609, 1200, 50, isStatic: true)
    ]
    #setTimeout(World.remove(world, [constraint]), 3000);
    Matter.Events.on engine, 'mouseup', ->
      console.log 'aaa'
      World.remove world, [ constraint ]
      return
    mouse = Mouse.create(render.canvas)
    mouseConstraint = MouseConstraint.create(engine,
      mouse: mouse
      constraint:
        stiffness: 0.2
        render: visible: false)
    World.add world, mouseConstraint
    render.mouse = mouse
    Render.lookAt render,
      min:
        x: 0
        y: 0
      max:
        x: 1200
        y: 600
  
    canvas.addEventListener 'mouseup', ->
      setTimeout ->
          World.remove(world, [constraint])
      , 100

$ ->
  app.init()