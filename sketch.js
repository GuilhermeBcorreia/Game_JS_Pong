//#####Developed GuiCorreia-Sp-Araçatuba#####
//04-12-2021

//var bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;

//var raio
let raio = diametro / 2;

//velocidadeBolinha
let velocidadeXbolinha = 6;
let velocidadeYbolinha = 6;

//raquetes
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//var do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYoponente;

let colidiu = false;

//placar
let meusPontos = 0;
let pontosOponente = 0;

//sons
let raquetadaSom;
let pontoSom;

//chance da maquina errar
let chanceDeErrar = 0;

function preload(){
  raquetadaSom = loadSound("Efeitos/raquetada.mp3");
  pontoSom = loadSound("Efeitos/ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisao();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  colisaoRaquete(xRaquete,yRaquete);                          
  RaqueteOponente(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
 circle(xBolinha, yBolinha, diametro); 
}

function movimentaBolinha(){
  xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYbolinha;
}

function verificaColisao(){
  
    if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXbolinha *= -1;   
  }
  
  if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYbolinha *= -1;
  }
}

function mostraRaquete(){
    rect(xRaquete,yRaquete,
       raqueteComprimento,
       raqueteAltura);
}

function RaqueteOponente(){
    rect(xRaqueteOponente,yRaqueteOponente,
       raqueteComprimento,
       raqueteAltura);
}

function movimentaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function colisaoRaquete() {
    if (xBolinha - raio < xRaquete + raqueteComprimento
        && yBolinha - raio < yRaquete + raqueteAltura
        && yBolinha + raio > yRaquete) {
        velocidadeXbolinha *= -1;
        raquetadaSom.play();
    }
}

function colisaoRaquete(x,y){
 colidiu=collideRectCircle(x,y,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio);
    if(colidiu){
        velocidadeXbolinha *= -1;
        raquetadaSom.play();
    }
}

/*function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
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
}*/

function movimentaRaqueteOponente(){
  velocidadeYoponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYoponente //+ chanceDeErrar
 // calculaChanceDeErrar()
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color (255,140,0));
  rect(200, 10, 40, 20);
  fill(255);
  text(meusPontos, 220, 26);
  fill(color (255,140,0));
  rect(400, 10, 40, 20);
  fill(255);
  text(pontosOponente, 420, 26);
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    pontoSom.play();
  }
  if(xBolinha < 10){
    pontosOponente += 1;
    pontoSom.play();
  }
}