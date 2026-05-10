let scal = 2;
let cwidth;
let kid1, kid2, sunflower_c, sunflower_p, store, s_s, s_m;

// sin wave
let swidth; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude; // Height of wave
let period = 300.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

let drop_x, drop_y, dropDice;

async function setup() {
  // Load all images using async/await
  kid1 = await loadImage("kid1.png");
  kid2 = await loadImage("kid2.png");
  sunflower_c = await loadImage("sunflower_center.png");
  sunflower_p = await loadImage("sunflower_petals.png");
  store = await loadImage("storefront.png");
  s_s = await loadImage("sweat_s.png");
  s_m = await loadImage("sweat_m.png");
  sweats = await [s_s,s_m];
  
  // Now that images are loaded, set up canvas
  cwidth = store.width / 4 * scal;
  createCanvas(cwidth, cwidth);
  background(255);

  // sin wave
  amplitude = cwidth/10;
  swidth = cwidth+scal;
  dx = -(TWO_PI / period) * scal;// 周期はscal / period 
  yvalues = new Array(floor(swidth / scal));
  
  drop_x = (108 + int(random(40)) )*scal;
  drop_y=cwidth;
  sweatImg=sweats[0];

}

function draw() {
  currentTime = new Date();
  currentMillisec = currentTime.getMilliseconds();
  currentSec = currentTime.getSeconds();
  
  fill(255);
  noStroke();
  dx = -(TWO_PI / period) * scal;
  yvalues = calcWave(yvalues, amplitude*2, dx, 0.001);
  //renderWave( int(cwidth/2/scal + 50)*scal, yvalues);
  
  yvalues = calcWave(yvalues, amplitude*1.5, dx, 0.02);
  //renderWave( int(cwidth/2/scal - 30)*scal, yvalues);
  
  if(300 < currentMillisec && currentMillisec < 500){
  circle_x = int(random(33,220))*scal;
  circle_y = int(random(70,220))*scal;
  circle_r = int(random(10,40));
  makeCircleAvec(circle_x, circle_y,circle_r);
  }
  
  // 上部のサインカーブ
  dx = -(TWO_PI / period*2) * scal;// 周期を変える
  renderWave( int(cwidth/scal - 30)*scal, yvalues);
  if(currentSec%6===0 || currentSec%6===1) {
    fill(0,138,131);
  }
  yvalues = calcWave(yvalues, amplitude/2, dx, 0.00001);
  renderWave(35*scal, yvalues);
  

  
  image(sunflower_c, 0, 0, cwidth, cwidth);
  // Rotate sunflower petals around center
  push();
  translate(cwidth/2, cwidth/2);
  rotate(millis() * 0.0001); // Rotate based on time
  imageMode(CENTER);
  image(sunflower_p, 0, 0, cwidth, cwidth);
  pop();
  image(store, 0, 0, cwidth, cwidth);
  
  if (currentSec % 2 === 0) {
    image(kid1, 0, 0, cwidth, cwidth);
  } else {
    image(kid2, 0, 0, cwidth, cwidth);
  }
  
  //water drop  
  dropDice=int(random(200));
  if(dropDice%199===0 && drop_y >= cwidth-20*scal) {
    dice=int(random(sweats.length));
    sweatImg=sweats[dice];
    drop_x = (108 + int(random(40)) )*scal;
    drop_y=131*scal;
  } else {
    //dropDice=int(random(20));
  }    image(sweatImg,drop_x,drop_y,sweatImg.width/4*scal,sweatImg.height/4*scal);

  if(drop_y<cwidth-20*scal){
    drop_y+=scal;
  }
}

function calcWave(array, h, _dx, velocity) {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += velocity;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < array.length; i++) {
    array[i] = sin(x) * h;
    x += _dx;
  }
  return array;
}

function renderWave(center, array) {
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < array.length; x++) {
    rect(x * scal, center + array[x], scal, scal);
  }
}

function makeCircleAvec (x0,y0,radius) {
  // plot circles
  // with larger scaling
  scal_ord = scal;
  scal = scal;// 一ドットのサイズを変えるときはここの値に掛け算
  for (let theta = 0; theta < 360; theta++) {
    relativex = radius*cos(radians(theta));// 極座標→デカルト座標：x軸
    relativey = radius*sin(radians(theta));// 極座標→デカルト座標：y軸
    x = relativex + x0;
    y = relativey + y0;
    intx = int(x/scal)*scal;
    inty = int(y/scal)*scal;

    for (let k = 0; k < abs(relativey)/scal; k++){
      if(relativey <= 0) { rect(intx, inty + k*scal, scal, scal); }
      else { rect(intx, inty - k*scal, scal, scal); }
    }
  }  
  scal = scal_ord;// reset scal
}


