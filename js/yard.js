var canvas = new fabric.Canvas('yard_drawing');

var viewportWidth = window.innerWidth;
var viewportheight = window.innerHeight;
canvas.set('width' ,  viewportWidth);

//var imageUrl = "./img/MICT_SOUTH.svg";
//var portImg = new Image();
//portImg.onload = function (img) { 
//};


//var horizontal_count = 20;
//var vertical_count = 6;

var cont_size_w = 10;
var cont_size_h = 4;

var spacing = 0.5;


var arrayOfStacks = [];


//canvas.on('mouse:up', function () {
//  console.log('Event mouse:up Triggered');
//});

//canvas.on('mouse:down', function () {
//  console.log('Event mouse:down Triggered');
//});

canvas.on('object:moving', function (e) {
  // LOCKS THE MOVEMENT OF OBJETC BY STEPS (CONTAINER SIZE)
  
  var pointer = this.getPointer(e);
  var leftMostPoint = (Math.floor(e.target.left / cont_size_w) * cont_size_w);
  var topMostPoint = (Math.floor(e.target.top / cont_size_h) * cont_size_h);

  //console.log(pointer.x, leftMostPoint , leftMostPoint + spacing , pointer.y, topMostPoint, topMostPoint + spacing);

  e.target.set('left', leftMostPoint + spacing);
  e.target.set('top', topMostPoint + spacing);

});


canvas.on('mouse:wheel', function(opt) {
  var delta = opt.e.deltaY;
  var zoom = canvas.getZoom();
  zoom = zoom + delta/200;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.setZoom(zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
})
    


canvas.on('mouse:down', function(opt) {
  var evt = opt.e;
  if (evt.altKey === true) {
    this.isDragging = true;
    this.selection = false;
    this.lastPosX = evt.clientX;
    this.lastPosY = evt.clientY;
  }
});
canvas.on('mouse:move', function(opt) {
  if (this.isDragging) {
    var e = opt.e;
    this.viewportTransform[4] += e.clientX - this.lastPosX;
    this.viewportTransform[5] += e.clientY - this.lastPosY;
    this.requestRenderAll();
    this.lastPosX = e.clientX;
    this.lastPosY = e.clientY;
  }
});
canvas.on('mouse:up', function(opt) {
  this.isDragging = false;
  this.selection = true;
});
    




