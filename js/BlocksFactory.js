function BlocksFactory() {

  function Block() {

    // 方向
    this.dir = 0;

    // 设置数据
    this.data = [];

    // 设置偏移
    this.offset = {};
  }

  Block.prototype.canDown = function(isDataValid) {
    var test = new Block();
    test.data = this.data;
    test.offset.x = this.offset.x + 1;
    test.offset.y = this.offset.y;
    return isDataValid(test);
  };
  Block.prototype.down = function() {
    this.offset.x++;
  };


  Block.prototype.canLeft = function(isDataValid) {
    var test = new Block();
    test.data = this.data;
    test.offset.x = this.offset.x;
    test.offset.y = this.offset.y - 1;
    return isDataValid(test);
  };
  Block.prototype.left = function() {
    this.offset.y--;
  };


  Block.prototype.canRight = function(isDataValid) {
    var test = new Block();
    test.data = this.data;
    test.offset.x = this.offset.x;
    test.offset.y = this.offset.y + 1;
    return isDataValid(test);
  };
  Block.prototype.right = function() {
    this.offset.y++;
  };


  Block.prototype.canRotate = function(isDataValid) {
    var test = new Block();
    test.offset = this.offset;
    test.data = this.rotates[(this.dir + 1) % 4];
    return isDataValid(test);
  };
  Block.prototype.rotate = function() {
    this.dir = (this.dir + 1) % 4;
    this.data = this.rotates[this.dir];
  };

  // 长条
  function Block1() {
    // 继承Block中的属性
    Block.call(this);
    // 旋转数组
    this.rotates = [
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
    ];
  }
  Block1.prototype = Block.prototype;
  // 正方形
  function Block2() {
    // 复用公有的属性
    Block.call(this);
    // 旋转数组
    this.rotates = [
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
    ];
  }
  Block4.prototype = Block.prototype;

  // L
  function Block3() {
    // 复用公有的属性
    Block.call(this);
    // 旋转数组
    this.rotates = [
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]
      ],
    ];
  }
  Block2.prototype = Block.prototype;

  // 反7字
  function Block4() {
    // 复用公有的属性
    Block.call(this);
    // 旋转数组
    this.rotates = [
      [
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0]
      ],
    ];
  }
  Block3.prototype = Block.prototype;

  // T型
  function Block5() {
    // 复用公有的属性
    Block.call(this);
    // 旋转数组
    this.rotates = [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ],
    ];
  }
  Block5.prototype = Block.prototype;

  // 2字形
  function Block6() {
    // 复用公有的属性
    Block.call(this);
    // 旋转数组
    this.rotates = [
      [
        [0, 1, 1, 0],
        [0, 0, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 1, 0],
        [0, 0, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ],
    ];
  }
  Block6.prototype = Block.prototype;

  // 5字型
  function Block7() {
    // 复用公有的属性
    Block.call(this);
    // 旋转数组
    this.rotates = [
      [
        [0, 0, 1, 1],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 1, 1],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0]
      ],
    ];
  }
  Block7.prototype = Block.prototype;

  this.makeBlock = function(offestY) {
    var b;
    var index = Math.ceil(Math.random() * 7);
    switch (index) {
      case 1:
        b = new Block1();
        break;
      case 2:
        b = new Block2();
        break;
      case 3:
        b = new Block3();
        break;
      case 4:
        b = new Block4();
        break;
      case 5:
        b = new Block5();
        break;
      case 6:
        b = new Block6();
        break;
      case 7:
        b = new Block7();
        break;
      default:
        break;
    }
    b.offset.x = 0;
    b.offset.y = offestY || 0;
    b.dir = Math.round(Math.random() * 3);
    b.data = b.rotates[b.dir];
    return b;
  };
}