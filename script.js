let started = false;

let theme = 0;

let colors = [
  [0,255,255],
  [255,0,255],
  [0,255,100],
  [255,180,0]
];

let particles = [];

function setup(){

  createCanvas(windowWidth,windowHeight);

  for(let i=0;i<300;i++){

    particles.push({
      x:random(width),
      y:random(height),
      s:random(1,4),
      speed:random(0.5,2)
    });
  }
}

function draw(){

  if(!started){
    background(0);
    return;
  }

  background(5,10,20,40);

  let c = colors[theme];

  for(let p of particles){

    fill(255,120);
    noStroke();

    circle(
      p.x,
      p.y,
      p.s
    );

    p.y -= p.speed;

    if(p.y < 0){

      p.y = height;
      p.x = random(width);
    }
  }

  push();

  translate(
    width/2,
    height/2
  );

  rotate(frameCount*0.01);

  noFill();

  strokeWeight(3);

  stroke(
    c[0],
    c[1],
    c[2]
  );

  drawingContext.shadowBlur = 30;

  drawingContext.shadowColor =
  `rgb(${c[0]},${c[1]},${c[2]})`;

  beginShape();

  for(
    let a=0;
    a<TWO_PI;
    a+=0.08
  ){

    let n = noise(
      cos(a)+frameCount*0.01,
      sin(a)+frameCount*0.01
    );

    let r =
      180 +
      n*80 +
      map(mouseX,0,width,-40,40);

    let x = cos(a)*r;
    let y = sin(a)*r;

    vertex(x,y);
  }

  endShape(CLOSE);

  ellipse(0,0,450);
  ellipse(0,0,520);

  pop();

  fill(255);

  textSize(18);

  textAlign(CENTER);

  text(
    "SPACE = Change Dream",
    width/2,
    height-40
  );
}

function mousePressed(){

  if(!started) return;

  for(let i=0;i<50;i++){

    particles.push({
      x:mouseX,
      y:mouseY,
      s:random(2,6),
      speed:random(1,4)
    });
  }
}

function keyPressed(){

  if(key === " "){

    theme++;

    theme %= colors.length;
  }
}

window.onload = () => {

  document
  .getElementById("startBtn")
  .addEventListener("click",()=>{

      document
      .getElementById("landing")
      .style.display="none";

      started = true;
  });
};

function windowResized(){

  resizeCanvas(
    windowWidth,
    windowHeight
  );
}