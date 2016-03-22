LEVELS = ["lochness","sydney","gijon","huelva","sanfrancisco","lastres","amazonas","hawaii","niagara"];//lista de niveles

SEA_FISHES = ["RedFish","BlueFish","YellowFish","Manta"];
RIVER_FISHES = ["RedFish","Snake","Frog","GreenFish"];

ROD_HP_START = 10;//hp de la caña en la primera ronda
ROD_DMG_START = 1;//daño de la caña en la primera ronda

FISHERMAN_START = {"x":110,"y":200};//posición del pescador

WATER_LEVEL = 280;//nivel del agua
FISH_LIMIT_Y = [WATER_LEVEL,420];//límites verticales del agua
FISH_LIMIT_X = [210,720];//límites horizontales del agua
FISH_GROWING_FACTOR = 2;//factor de crecimiento entre niveles de los peces

FIGHT_SKILLS  = ["goRight","goLeft","goUp","goDown","spin"];//habilidades de los peces
ROD_SKILLS    = [["release"],["reel","pull"],["reel","pull"],["release"],["hold"]];//habilidades de la caña de pescar

FIGHT_SKILL_TIME = 3; //tiempo para realizar un ataque en la primera ronda

FISH_START_WEIGHT = 5; //peso mín del primer pez
FISH_MAX_WEIGHT = 170; //peso máximo de un pez

NO_SKILL_TIME = 1; //cada cuanto baja la vida si no se ha ejecutado una habilidad con éxito

// 1. Wait for the onload even
window.addEventListener("load",function() {
  // Set up a basic Quintus object
  // with the necessary modules and controls
  var Q = window.Q = Quintus({ development: true })
      .include("Sprites, Scenes, Input, 2D, UI, Touch, Anim, TMX, Audio, BigFishScenes, BigFishMenus, BigFishEntities, BigFishAnimations, BigFishPlayer, BigFishHUD, BigFishComponents")
      .setup({  width: 800, height: 480 })
      .controls().touch().enableSound();
  Q.input.keyboardControls();

/************************************

** CARGA DE DATOS

*************************************/

  Q.loadTMX("l1.tmx, sydney.tmx, huelva.tmx, sanfrancisco.tmx, gijon.tmx, lastres.tmx, amazonas.tmx, hawaii.tmx, niagara.tmx", function() {    
    Q.load("inicio.png, fisherman.png, fisherman.json, fishes_01.png, fishes.json, bait.png, bait.json, clown-fish-icon.png, fishing_rod.png, skillicons.png, skillicons.json, capture5.jpg, continuar.png, menubg.png, boton-jugar.png, boton-instrucciones.png, boton-creditos.png, boton-volver.png, runningfish.jpg, instr.png,creds.png",
      function() { 
        Q.load("wetlands.mp3, splash.mp3, reel.mp3, rainforest.mp3, quickreel.mp3, pull.mp3, olas.mp3, launch.mp3, inicio.mp3, yeah.mp3, oh.mp3, tada.mp3,waterfall.mp3",function(){
          Q.compileSheets("fisherman.png","fisherman.json");  
          Q.compileSheets("fishes_01.png","fishes.json");
          Q.compileSheets("bait.png","bait.json");
          Q.compileSheets("rodhpbar.png","rodhpbar.json");
          Q.compileSheets("fishhpbar.png","fishhpbar.json");
          Q.compileSheets("skillicons.png","skillicons.json");
          Q.stageScene("startGame");
        });
      });
    });
  });

/************************************

** AUXILIARES

*************************************/
function stageNextScene(){
  var rodHP = Q.state.get("rodHP");
  var lastFishWeight =Q.state.get("currentWeight");
  var rodHp = calcRodHP(rodHP,lastFishWeight);
  Q.state.set("rodHP",rodHp);
  Q.state.set("maxRodHP",rodHp);
  Q.state.set("minWeight",calcMinFishWeight(lastFishWeight));
  Q.state.set("currentFish","");
  Q.state.set("currentFishObj",null);

  var sceneIndex = Math.floor(Math.random()*LEVELS.length );
   Q.stageScene(LEVELS[sceneIndex]);
}
function addRandomFishes(fish_array, stage, n){
  for(var i = 0; i < n; i++){
    var index = Math.floor(Math.random()*fish_array.length);
    var fishClass = fish_array[index];

    eval("stage.insert(new Q."+fishClass+"())");

    //stage.insert(new Q.BlueFish());
  }
}
/************************************

** BALANCEO

*************************************/
function calcMinFishWeight(weight){
  return weight+1+Math.floor(Math.random()*3);
}
function calcRodHP(hp,weight){
  return Math.floor(hp+weight/1.3);
}
function calcFishWeight(minWeight){
  var grow = FISH_GROWING_FACTOR+Math.log(minWeight);
  return Math.floor(minWeight + Math.random()*grow);
}
function calcFishHP(weight){
  return Math.floor(weight+(Math.log(weight)));
}
function calcFishScale(weight){
  var value = 0.6+ weight/30;
  if (value > 3){
    value = 3+(Math.floor(Math.log(value)/2)); 
  }
  return value;
}
function calcFishDamage(weight){
  var value = Math.floor(weight/6+Math.log(weight));
  return weight/5;
}
function calcSkillTime(weight){
  return FIGHT_SKILL_TIME-(weight/120);
}
function calcFishNumber(lastWeight){
  var start = 7;
  if(lastWeight > 20)
    start--;
  if(lastWeight >50)
    start--;
  if(lastWeight > 75)
    start--;
  if(lastWeight > 100)
    start--;
  if(lastWeight > 125)
    start--;
  return start;
  
  
}

/*  TODO
-Gaviotas ??
  · Posible habilidad de agacharse para esquivar gaviotas ??
  · Gaviotas atacan a peces si están en determinada zona ??
-Mejorar sprites del pescador ??



*/