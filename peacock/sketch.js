let scal = 2;
let cwidth, cheight;
let imgwidth, imgheight;

let wingnoise = 1;

let peacocknoisex=1, peacocknoisey= 2;
let kidnoisex = 3, kidnoisey = 4;

// for sine wave 
let dr = 0;
let strum = 1;

let msXpx,msYpx;

function preload () {
  imgmain = loadImage("peacock.png");
  imgwing = loadImage("wing.png");
  imgkid = loadImage("peacock_kid.png");
  imgfly = loadImage("butterfly.png");
  imgleaf = loadImage("leaf.png");
  imgginm = loadImage("gingkom.png");
  imgginl = loadImage("gingkol.png");
}

function setup() {
  imgwidth = imgmain.width / 4 * scal;
  imgheight = imgmain.height / 4 * scal;
  cwidth = imgwidth;
  cheight =imgheight;
  createCanvas(imgwidth, imgheight);
  background(255);
  image(imgmain, 0,0,imgwidth, imgheight);
  noStroke();
  noFill();
  count = 0;
  frameRate(30);
  
  wingimages = [imgfly,imgfly, imgleaf,imgleaf, imgginm, imgginl];
  
  // decide center of sine wave randomly
  //center = int(random(height/2, height)/scal)*scal;
  center = 115*scal + (height-105*scal)/2;
  
  // カーソルの初期値を設定
  msXpx =0;
  msYpx =0;
}

function draw() {
 // plot rectangles
  rectx = int(random(-15, cwidth)/scal)*scal;// x とy が頂点; 
  recty = int(random(-15, cwidth)/scal)*scal;

  rectr = int(random(2, 15))*2-1;// 奇数で出力
  tr = random(0, 70);
  colorArr = [245,192,84, tr];

  if(recty <= 80*scal){
    makeRhombus (rectx, recty, rectr, colorArr);
  } else {
    if(count%1===0){
      //fill(100,188,148);
      fill(0,149,138);
      if(rectx%3===0 && recty%3===0){
        //makeCircle(rectx, recty, 4);
      }
      fill(245,192,84,tr);
      //makeCircle(rectx,recty,4);
      //image(imgginm, rectx-6*scal, recty-6*scal, imgginm.width/4*scal, imgginm.height/4*scal);
      count=0;
    }
    count++;
  }
  
  
  // plot line
  x0 = 128*scal;
  y0 = 105*scal;
  linelength = 200*scal;
  phi0= PI/16;
  phi = (PI-phi0*2)*random();
  xraw = x0+linelength *cos(phi0 + phi);// non-pixel perfect x 
  yraw = y0+linelength *sin(phi0 + phi);// non-pixel perfect y
  x= int(xraw / scal)*scal;
  y = int(yraw / scal)*scal;
  
  
  fill(255,255,255,50);
  makePixelLine(x0,y0,x,y); // ランダムに白で線を引く;リセット用
  //drawPixelSineWave(center);
  
  
  fill(64,176,167,50);
  if(mouseY > y0+20*scal){// カーソルに合わせて線を引く場合
    //fill(0,228,208,tr)
    //makePixelLine(x0,y0,mouseX, mouseY);// continuous
    makePixelLine(x0,y0, int(mouseX/scal)*scal, int(mouseY/scal)*scal);// pixel perfect
  }
  
  
  fill(1,228,208,100);// パーリンノイズで線を引く
  noiseend = noise(wingnoise);
  wingendopoint = map(noiseend, 0, 1, 0-150, cwidth+150);
  makePixelLine(x0,y0, int(wingendopoint/scal)*scal, cheight);
  wingnoise+=0.05;
  
  
  
  
  // plot images on wings
  imgx0 = cwidth/2;
  imgy0 = 0;
  imgr = int(random(cwidth*2/5)/scal)*scal;
  imgphi = random(PI);
  
  dice = int(random(wingimages.length));
  imgx = imgx0 + int( imgr*cos(imgphi)/scal )*scal;
  imgy = imgy0 + int( imgr*sin(imgphi)/scal )*scal;
  theimage = wingimages[dice];
  
  image(theimage,imgx, imgy, theimage.width/4*scal, theimage.height/4*scal);

  
  // peacock is floating
  peacockx = noise(peacocknoisex)*10;
  peacocky = noise(peacocknoisey)*10;
  //image(imgmain, peacockx - 10, peacocky - 10, imgwidth, imgheight);
  image(imgmain, 0,0, imgwidth, imgheight);
  peacocknoisex +=0.05;
  peacocknoisey += 0.02;
  
  // kid is floating 
  kidx = noise(kidnoisex)*10;
  kidy = noise(kidnoisey)*10;
  //image(imgkid, kidx-10,kidy-10,imgwidth, imgheight);
  image(imgkid, 0,0, imgwidth, imgheight);
  kidnoisex += 0.06;
  kidnoisey += 0.03;
  
  fill("#F4C85E");
  makeCircle(msXpx,msYpx,scal);
  
  
  // WASD
  // keyIsDown()関数を使って複数キーの同時押しに対応
  if (keyIsDown(UP_ARROW) || keyIsDown(67)) { // 67はCのキーコード
    msYpx -= scal;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(68)) { // 68はDのキーコード
    msYpx += scal;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(70)) { // 70はFのキーコード
    msXpx += scal;
  }
  if (keyIsDown(LEFT_ARROW) || keyIsDown(69)) { // 69はEのキーコード
    msXpx -= scal;
  }
  if(keyIsDown(71)) {
    touchStarted();
  }
  
  
}

function mouseMoved() {
  msXpx = int(mouseX/scal)*scal;
  msYpx = int(mouseY/scal)*scal;
}

function touchStarted() {
  mouseClicked();
  return false;
}

function makeRhombus (x, y, r, color) {
  for (i = 0; i < r; i++) {
      ii = i*2+1;
      j = (r - ii)/2;
      l = r - j*2;
      noStroke();
      fill(color[0],color[1],color[2], color[3]);
      for (k = 0; k<l; k++) {
          rect(x+j*scal+k*scal, y+i*scal, scal, scal);
          if(i!=r-1){
              rect(x+j*scal+k*scal, y+2*rectr*scal-i*scal-scal*2, scal, scal);
          }
      }
    }
}



function makePixelLine (x0, y0, x1, y1) {
  slope = (y1-y0)/(x1-x0);// 直線の式は y = slope*(x-x0) + y0
  if(x0 < x1){
    for (let i = 0; i < x1-x0; i+=scal) {
      //
      // //not pixel perfect //
      //a = x0 + i;
      //b = slope*(a - x0)+y0;
      //
      // pixel perfect
      a = int( (x0 + i)/scal)*scal;
      b = int( (slope*(a - x0)+y0)/scal)*scal;
      rect(a, b, scal, scal);
    }
  } else {
    for(let i = 0; i < x0-x1; i += scal){
      //
      // //not pixel perfect//
      //a = x1 +i;
      //b = slope*(a -x0) +y0;
      //
      // //pixel perfect//
      a = int((x1 +i)/scal)*scal;
      b = int( (slope*(a -x0) +y0)/scal)*scal;
      rect(a, b, scal,scal);
    }
  }  
}

function makeCircle (x0,y0,radius) {
  // plot circles 
  canvasWidth = width;
  canvasHeight = height;
  
  // x0, y0 が円の中心
  //let x0 = int(random(-16, canvasWidth)/scal)*scal;
  //let y0 = int(random(-16, canvasWidth)/scal)*scal;
    
  r = random(1, radius)*scal;
  
  for (let theta = 0; theta < 360; theta++) {
    relativex = r*cos(radians(theta));// 極座標→デカルト座標：x軸
    relativey = r*sin(radians(theta));// 極座標→デカルト座標：y軸
    x = relativex + x0;
    y = relativey + y0;
    intx = int(x/scal)*scal;
    inty = int(y/scal)*scal;
    //noStroke();
    //fill(255,255,255,tr);
    for (let k = 0; k < abs(relativey)/scal; k++){
      if(relativey <= 0) { rect(intx, inty + k*scal, scal, scal); }
      else { rect(intx, inty - k*scal, scal, scal); }
    }
  }  
}

function plotWings () {
  let x = int(random(0,cwidth/scal))*scal;
  let y = int(random(113,cheight/scal))*scal
  image(imgwing, x, y, imgwing.width/4*scal, imgwing.height/4*scal);
}

function mouseClicked () {
  fill(4,165,224);
  x = int(mouseX/scal)*scal;
  y = int(mouseY/scal)*scal;
  makeCircle(x, y, 8);
  x = int(mouseX/scal)*scal;
  y = int(mouseY/scal)*scal;
  fill("#F4C85E");
  makeCircle(x, y, 5);
  fill(0,149,138);
  if(mouseY > 113*scal){
    //makeCircle(x,y,6);
    fill(0,228,208);
    //makePixelLine(x0,y0, int(mouseX/scal)*scal, int(mouseY/scal)*scal);
  }
}

function drawPixelSineWave (center) {
  for(let x =  0; x < width; x+=scal/10) {
    let angle = dr + x/50;
    let y = map(sin(angle), -strum, strum, -(height-105*scal)/2, (height-105*scal)/2);
    rect(int(x/scal)*scal, int(y/scal)*scal+center, scal,scal);
  }
  dr += 0.1;
}
