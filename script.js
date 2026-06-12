let started = false;

let particles = [];
let orbs = [];

let theme = 0;
let blackHole = false;
let shake = 0;

let names = [
  "Cyber Forest",
  "Neon Ocean",
  "Crystal Galaxy",
  "Lost Dimension",
  "Infinite Aurora"
];

let currentDream = "";

let colors = [
  [0,255,255],
  [255,0,255],
  [0,255,120],
  [255,180,0]
];

function setup(){
  createCanvas(windowWidth, windowHeight);

  for(let i=0;i<400;i++){
    particles.push({
      x:random(width),
      y:random(height),
      s:random(1,3),
      sp:random(0.5,2)
    });
  }

  currentDream = random(names);
}

function draw(){

  if(!started){
    background(0);
    return;
  }

  let c = colors[theme];

  background(5,10,20,25);

  shake *= 0.9;

  translate(random(-shake,shake), random(-shake,shake));

  // 🌟 particles
  for(let p of particles){

    fill(255,120);
    noStroke();

    circle(p.x,p.y,p.s);

    if(blackHole){
      let dx = width/2 - p.x;
      let dy = height/2 - p.y;
      p.x += dx * 0.01;
      p.y += dy * 0.01;
    }

    p.y -= p.sp;

    if(p.y < 0){
      p.y = height;
      p.x = random(width);
    }
  }

  // 💫 mouse orbs
  for(let i=orbs.length-1;i>=0;i--){

    fill(0,255,255,orbs[i].life);
    noStroke();
    circle(orbs[i].x,orbs[i].y,20);

    orbs[i].life -= 5;

    if(orbs[i].life < 0){
      orbs.splice(i,1);
    }
  }

  // 🌀 portal
  drawPortal(c);

  // ✨ UI text
  fill(255);
  textAlign(CENTER);

  textSize(20);
  text(currentDream, width/2, 60);

  textSize(14);
  text("Space: Theme | B: Black Hole | Click: Rift", width/2, height-40);
}

function drawPortal(c){

  push();
  translate(width/2, height/2);

  drawingContext.shadowBlur = 40;
  drawingContext.shadowColor = `rgb(${c[0]},${c[1]},${c[2]})`;

  stroke(c[0],c[1],c[2]);
  strokeWeight(2);
  noFill();

  rotate(frameCount * 0.01);

  // 🌌 multi rings
  for(let i=0;i<4;i++){
    ellipse(0,0,200+i*60);
  }

  beginShape();
  for(let a=0;a<TWO_PI;a+=0.06){

    let n = noise(
      cos(a)+frameCount*0.01,
      sin(a)+frameCount*0.01
    );

    let r = 180 + n*90 + map(mouseX,0,width,-30,30);

    vertex(cos(a)*r, sin(a)*r);
  }
  endShape(CLOSE);

  pop();
}

// 👆 click rift
function mousePressed(){
  if(!started) return;

  orbs.push({
    x:mouseX,
    y:mouseY,
    life:255
  });

  shake = 15;
}

// ⌨ controls
function keyPressed(){

  if(key === " "){
    theme = (theme + 1) % colors.length;
    currentDream = random(names);
  }

  if(key === "b"){
    blackHole = !blackHole;
  }
}

// 🚀 start
window.onload = () => {
  document.getElementById("startBtn").onclick = () => {
    document.getElementById("landing").style.display = "none";
    started = true;
  };
};

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
