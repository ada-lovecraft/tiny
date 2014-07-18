window.onload = function() {
  var game = new Tiny.Game(window.innerWidth, window.innerHeight,null, {debug: true});
  game.init();
  var block = new Tiny.Block(game, 100,100,100,100, '#ff0000');
  var dot = new Tiny.Dot(game, 300,300,100, '#0000ff');
  block.events.onAddedToWorld.add(helloWorld);
  dot.events.onAddedToWorld.add(helloWorld);
  game.sprites.add(block);
  game.sprites.add(dot);


  function helloWorld(sprite) {
    console.log(sprite.id,'Hello, World!');
  }

};