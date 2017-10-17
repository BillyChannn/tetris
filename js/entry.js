function TetrisGame() {
  // 创建实例
  var game = new Game();

  // 设置按键开关
  var keyEventsSwitch = true;

  // 设置加分器
  var scoreBasis = 100;
  var scoreAdder = 0;

  // 设置计时器
  var multiple = 3;
  var timeBasis = 200;
  var timeAdder = 0;
  var interval = null;

  // 消行总和
  var line = 0;
  var lineAdder = 0;

  // 设置下落后的逻辑判断
  function move() {
    // 加时间  
    timeAdder = game.addTime(timeBasis, multiple, timeAdder);

    if (!game.down()) {
      game.fix(); // 到底部后固定

      // 消行
      line = game.clearLine();

      // 加分 加行
      if (line) {
        scoreAdder = game.addScore(scoreBasis, line, scoreAdder);
        lineAdder = game.addLine(line, lineAdder);
      }

      // 判断是否游戏失败
      if (game.checkGameOver()) {
        gameOver();
      }

      // 生成新的方块同时更新next区域的方块
      game.createNewCurrent();
    }
  }

  // 绑定键盘事件
  function bindKeyEvents() {
    document.onkeydown = function(e) {
      if (keyEventsSwitch) {
        if (e.keyCode === 32) { // space ==> drop
          game.drop();
        } else if (e.keyCode === 37) { // left
          game.left();
        } else if (e.keyCode === 38) { // up ==> rotate
          game.rotate();
        } else if (e.keyCode === 39) { // right
          game.right();
        } else if (e.keyCode === 40) { // down
          game.down();
        }
      }
    };
  }

  function gameOver() {
    clearInterval(interval);
    keyEventsSwitch = false;
    alert("YOU LOSE!");
  }

  function start() {
    bindKeyEvents();
    keyEventsSwitch = true;
    interval = setInterval(move, multiple * timeBasis);
  }

  function pause() {
    keyEventsSwitch = false;
    clearInterval(interval);
  }

  function continute() {
    keyEventsSwitch = true;
    interval = setInterval(move, multiple * timeBasis);    
  }

  function reset() {
    keyEventsSwitch = false;
    clearInterval(interval);
    game.reset();
    timeAdder = 0;
    lineAdder = 0;
    scoreAdder = 0;
  }

  this.init = game.initGame;
  this.start = start;
  this.pause = pause;
  this.continute = continute;
  this.reset = reset;
}

var tetris = new TetrisGame();
var gameState = "ready";

tetris.init();

document.onclick = function(event) {
  var e = event || window.event;
  var target = e.target || e.srcElement;
  
  switch (target.id) {
    case "btnStart":
      if (gameState === "ready") {
        tetris.start();
        gameState = "gaming";
      }
      break;
    
    case "btnPause":
      if (gameState === "gaming") {
        tetris.pause();
        gameState = "pause";
        console.log(gameState);
      } else if (gameState === "pause") {
        tetris.continute();
        gameState = "gameing";
      }
      break;
    
    case "btnReset":
      if (gameState !== "ready") {
        tetris.reset();
        gameState = "ready";
      }
      break;
    
    default:
      break;
  }
};