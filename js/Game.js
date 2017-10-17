function Game() {

  // 获取DOM元素
  var gameArea = document.getElementById("gameArea");
  var nextArea = document.getElementById("nextArea");
  var time = document.getElementById("time");
  var score = document.getElementById("score");
  var lines = document.getElementById("lines");
  
  // 创建数据二维矩阵
  var gameData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]; // 20行10列
  var nextData = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]; // 4行4列

  // 存储Divs的二维数组
  var gameDivs = [];
  var nextDivs = [];

  // 创建current和next方块
  var blocksFactory = new BlocksFactory();
  var next = blocksFactory.makeBlock();
  var current = blocksFactory.makeBlock(3);

  // 根据数据二维数组初始化对应的Divs的二维数组
  function initDivs(area, areaData, areaDivs) {
    for (var i = 0; i < areaData.length; i++) {
      var divLine = []; // 用于存储单行的div
      for (var j = 0; j < areaData[0].length; j++) {
        var div = document.createElement("div");
        div.className = "none";
        div.style.top = (i * 30) + "px";
        div.style.left = (j * 30) + "px";
        area.appendChild(div);
        divLine.push(div);
      }
      areaDivs.push(divLine);
    }
  }

  // 根据数据矩阵的改变来改变Divs的样式
  function refreshDivs(areaData, areaDivs) {
    for (var i = 0; i < areaData.length; i++) {
      for (var j = 0; j < areaData[0].length; j++) {
        if (areaData[i][j] === 0) {
          areaDivs[i][j].className = "none";
        } else if (areaData[i][j] === 1) {
          areaDivs[i][j].className = "current";
        } else if (areaData[i][j] === 2) {
          areaDivs[i][j].className = "done";
        }
      }
    }
  }

  // 判断当前点是否合法
  function check(block, x, y) {
    if (block.offset.x + x > gameData.length - 1) {
      return false;
    } else if (block.offset.x + x < 0) {
      return false;
    } else if (block.offset.y + y > gameData[0].length - 1) {
      return false;
    } else if (block.offset.y + y < 0) {
      return false;
    } else if (gameData[block.offset.x + x][block.offset.y + y] === 2) {
      return false;
    } else {
      return true;
    }
  }

  // 判断当前数据是否合法
  function isDataValid(block) {
    for (var i = 0; i < block.data.length; i++) {
      for (var j = 0; j < block.data[0].length; j++) {
        if (block.data[i][j] === 1 && check(block, i, j) === false) {
          return false;
        }
      }
    }
    return true;
  }

  // 消除数据
  function clearData() {
    for (var i = 0; i < current.data.length; i++) {
      for (var j = 0; j < current.data[0].length; j++) {
        if (check(current, i, j)) {
          gameData[current.offset.x + i][current.offset.y + j] = 0;
        }
      }
    }
  }

  // 根据方块数据来改变数据矩阵的数据
  function setData(block, areaData, areaDivs) {
    for (var i = 0; i < block.data.length; i++) {
      for (var j = 0; j < block.data[0].length; j++) {
        if (check(current, i, j)) {
          areaData[block.offset.x + i][block.offset.y + j] = block.data[i][j];
        }
      }
    }
    refreshDivs(areaData, areaDivs);
  }

  // down事件
  function down() {
    if (current.canDown(isDataValid)) {
      clearData();
      current.down();
      setData(current, gameData, gameDivs);
      return true;
    } else {
      return false;
    }
  }

  // left事件
  function left() {
    if (current.canLeft(isDataValid)) {
      clearData();
      current.left();
      setData(current, gameData, gameDivs);
    }
  }

  // right事件
  function right() {
    if (current.canRight(isDataValid)) {
      clearData();
      current.right();
      setData(current, gameData, gameDivs);
    }
  }

  // drop事件
  function drop() {
    while (down());
  }

  // rotate事件
  function rotate() {
    if (current.canRotate(isDataValid)) {
      clearData();
      current.rotate();
      setData(current, gameData, gameDivs);
    }
  }

  // 下落到底部后固定
  function fix() {
    for (var i = 0; i < current.data.length; i++) {
      for (var j = 0; j < current.data[0].length; j++) {
        if (check(current, i, j) && gameData[current.offset.x + i][current.offset.y + j] === 1) {
          gameData[current.offset.x + i][current.offset.y + j] = 2;
        }
      }
    }
    refreshDivs(gameData, gameDivs);
  }

  // 根据next区域的方块生成新的current方块,同时生成一个新的next方块
  function createNewCurrent() {
    current = next;
    current.offset.y = 3;
    next = blocksFactory.makeBlock();
    setData(current, gameData, gameDivs);
    setData(next, nextData, nextDivs);
  }

  // 消行判定与消行
  function clearLine() {
    var line = 0;
    for (var i = gameData.length - 1; i >= 0; i--) {
      if (gameData[i].toString() == "2,2,2,2,2,2,2,2,2,2") {
        line++;
        for (var m = i; m > 0; m--) {
          gameData[m] = gameData[m - 1];
        }
        gameData[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
        i++;
      }      
    }
    return line;
  }

  // 检查游戏是否失败
  function checkGameOver() {
    var flag = false;
    for (var i = 0; i < gameData.length; i++) {
      if(gameData[1][i] === 2) {
        flag = true;
      }
    }
    return flag;
  }

  // 加时间
  function addTime(timeBasis, multiple, timeAdder) {
    timeAdder += multiple * timeBasis / 1000; 
    time.innerHTML = Math.floor(timeAdder) + "s";
    return timeAdder;
  }

  // 加分
  function addScore(scoreBasis, line, scoreAdder) {
    switch (line) {
      case 1:
        scoreAdder += scoreBasis * 1 * 1;
        break;
      case 2:
        scoreAdder += scoreBasis * 2 * 1.5;
        break;
      case 3:
        scoreAdder += scoreBasis * 3 * 2;
        break;
      case 4:
        scoreAdder += scoreBasis * 4 * 3;
        break;
      default:
        break;
    }
    score.innerHTML = scoreAdder;
    return scoreAdder;
  }

  // 加行
  function addLine(line, lineAdder) {
    lineAdder += line;
    lines.innerHTML = lineAdder;
    return lineAdder;  
  }

  function reset() {
    for (var i = 0; i < gameData.length; i++) {
      for (var j = 0; j < gameData[i].length; j++) {
        gameData[i][j] = 0;
      }
    }
    current = blocksFactory.makeBlock(3);
    next = blocksFactory.makeBlock();
    setData(current, gameData, gameDivs);
    setData(next, nextData, nextDivs);
    time.innerHTML = "0s";
    lines.innerHTML = 0;
    score.innerHTML = 0;
  }

  // 初始化游戏
  function initGame() {
    initDivs(gameArea, gameData, gameDivs);
    initDivs(nextArea, nextData, nextDivs);

    setData(current, gameData, gameDivs);
    setData(next, nextData, nextDivs);
  }

  // 导出API
  this.initGame = initGame;
  this.reset = reset;
  this.down = down;
  this.left = left;
  this.right = right;
  this.drop = drop;
  this.rotate = rotate;
  this.fix = fix;
  this.clearLine = clearLine;
  this.checkGameOver = checkGameOver;
  this.createNewCurrent = createNewCurrent;
  this.addScore = addScore;
  this.addTime = addTime;
  this.addLine = addLine;
}