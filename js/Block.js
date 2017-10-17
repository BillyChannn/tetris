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