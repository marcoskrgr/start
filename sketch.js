//variáveis da bolinha
let xBola = 250;
let yBola = 150;
let dBola = 19;
let raio = dBola / 2;

//variaveis da raquete
let xRaquete = 8;
let yRaquete = 105;
let wRaquete = 7;
let hRaquete = 90;

//variaveis da raquete rival
let xRaqueteRival = 484;
let yRaqueteRival = 105;
let velocidadeYRival;
let chanceDeErrar = 0;

//velocidade da bolinha
let speedxBola = 40;
let speedyBola = 40;

//placar de pontos
let meusPontos = 0;
let pontosDoRival = 0;

//sons
let raquetada;
let ponto;
let trilha;


let colidiu = false;

function preload(){
  trilha = loadSound("trilha.mp3")
  raquetada = loadSound("raquetada.mp3")
  ponto = loadSound("ponto.mp3")
}

function setup() {
  createCanvas(500, 300);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBola();
  movimentaBola();
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaqueteBiblioteca(xRaquete,yRaquete);
  mostraRaquete(xRaqueteRival, yRaqueteRival);
  movimentaRaqueteRival();
  verificaColisaoRaqueteBiblioteca(xRaqueteRival,yRaqueteRival);
  mostraPlacar();
  marcaPonto();
  //movimentaRaqueteWS();
  bolinhaNaoFicaPresa();
}

function mostraBola(){
  circle(xBola,yBola,dBola);
}

function movimentaBola(){
  xBola += speedxBola; 
  yBola += speedyBola;
}


function verificaColisaoBorda(){
  if (xBola + raio > width || xBola - raio < 0){
    speedxBola *= -1;
    }
  if (yBola + raio > height || yBola - raio < 0){
    speedyBola *= -1;
    }
}

function mostraRaquete(x,y){
  rect(x, y, wRaquete, hRaquete)
}

function mostraRaqueteRival(){
  rect(xRaqueteRival, yRaqueteRival, wRaquete, hRaquete)
}


function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBola - raio < xRaquete + wRaquete && yBola - raio < yRaquete + hRaquete && yBola + raio > yRaquete){
    speedxBola *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaqueteBiblioteca(x, y){
  colidiu =
      collideRectCircle(x, y, wRaquete, yRaquete, xBola, yBola, raio);
  if (colidiu){speedxBola *= -1;
      raquetada.play();
  }
} 

//caso queria jogar sozinho, comente a função no draw

function movimentaRaqueteRival(){
  velocidadeYRival = yBola - yRaqueteRival - wRaquete / 2 -30;
  yRaqueteRival += velocidadeYRival + chanceDeErrar;
  calculaChanceDeErrar();
}

function calculaChanceDeErrar(){
    if (pontosDoRival >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function movimentaRaqueteWS(){
  if (keyIsDown(87)){
    yRaqueteRival -= 10;
  }
  if (keyIsDown(83)){
    yRaqueteRival += 10;
  }
}

function mostraPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  fill(255, 140, 0);
  rect(185, 10, 30, 20);
  fill(255);
  text(meusPontos, 200, 25); 
  fill(255, 140, 0);
  rect(285, 10, 30, 20);
  fill(255);
  text(pontosDoRival, 300, 25);
  
}


function bolinhaNaoFicaPresa(){
    if (xBola - raio < 0){
    xBola = 23
    }
}


function marcaPonto(){
  if (xBola > 492){
    meusPontos += 1;
    ponto.play();
  }
  if (xBola < 8){
      pontosDoRival += 1;
      ponto.play();
      }
}