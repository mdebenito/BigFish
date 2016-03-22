Quintus.BigFishMenus = function(Q) {

  Q.scene('startGame',function(stage) {  
    Q.state.set("status","En espera");
    Q.state.set("currentWeight",0);
    Q.state.set("currentFish","---");
    Q.state.set("currentFishObj",null);

    Q.state.set("rodHP",ROD_HP_START);
    Q.state.set("maxRodHP",ROD_HP_START);

    Q.state.set("fishHP",0);
    Q.state.set("maxFishHP",FISH_MAX_WEIGHT);

    Q.state.set("currentSkill","none");
    Q.state.set("playedSkill","none");

    Q.state.set("rodDamage",ROD_DMG_START);    


    var container = stage.insert(
        new Q.UI.Container({
          x:280, y:0, w:800, h:480, fill:"rgba(0,0,0,0.0)"
        }));

    var button = container.insert(
        new Q.UI.Button({
          x:150, y:250, asset: "inicio.png"
        }));
    
    button.on("click",function(){
      Q.clearStages();      
      Q.stageScene("menu");     
  });
    Q.audio.play("inicio.mp3",{loop:true});
});

Q.scene('medley',function(stage) {   
    Q.audio.stop();     
    var fishType = Q.state.get("currentFish");
    var fishWeight = Q.state.get("currentWeight");
    var container = stage.insert(
          new Q.UI.Container({
            x:400, y:240, w:800, h:480, fill:"rgba(255,255,255,1)"
      }));
    var continuar = container.insert(new Q.UI.Button({ x: 200, y: 200,
                                              asset: "continuar.png"}
                                             ));

    var captura;
    if(fishWeight < FISH_MAX_WEIGHT){
      
      var imagen = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                             asset: "capture5.jpg" }));
      captura = container.insert(new Q.UI.Text({x:-180, y: -200 ,
                                          label: "¡¡Enhorabuena!!\nHas capturado un " + fishType + " de " + fishWeight + "kg", color: "#0068FF", size:20  }));
      
      continuar.on("click",function(){
        stageNextScene();
      });
      Q.audio.play("yeah.mp3");
    }else{ //JUEGO TERMINADO
      captura = container.insert(new Q.UI.Text({x:-180, y: -200 ,
                                          label: "¡¡Enhorabuena!!\nHas capturado un "+fishType+" de "+fishWeight+"kg,\n¡Es el pez más grande del juego!", color: "#0068FF", size:20  }));
       var cartel = container.insert(new Q.UI.Text({x:-150, y: -150 , 
                                          label: "Si quieres volver a empezar, pulsa en continuar.", color: "yellow", size:14  }));
       continuar.on("click",function(){
        Q.clearStages();
        Q.stageScene("creditos");
      });
       Q.audio.play("yeah.mp3");
       Q.audio.play("tada.mp3");

    }
    
   
});
Q.scene('lostGame',function(stage) {    
    var fishType = Q.state.get("currentFish");
    var fishWeight = Q.state.get("currentWeight");
    
    var container = stage.insert(
        new Q.UI.Container({
          x:400, y:240, w:800, h:480, fill:"rgba(0,0,0,1)"
    }));
    var imagen = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                           asset: "runningfish.jpg" }));
    var captura = container.insert(new Q.UI.Text({x:-180, y: -200 , 
                                        label: "¡¡Vaya!! Has perdido ...", color: "yellow", size:20  }));
    var continuar = container.insert(new Q.UI.Button({ x: 200, y: 200,
                                            asset: "continuar.png"}
                                           ));
    continuar.on("click",function(){
      Q.stageScene("startGame");
    });
   Q.audio.stop();
   Q.audio.play("oh.mp3");
});
Q.scene('menu',function(stage) {    
    var imagen = stage.insert(new Q.Menubg());
    var container = stage.insert(
        new Q.UI.Container({
          x:400, y:240, w:800, h:480, fill:"rgba(0,0,0,0)"
    }));
    
    
    var jugar = container.insert(new Q.UI.Button({ x: 0, y: -120,
                                           asset: "boton-jugar.png" }));

    var instr = container.insert(new Q.UI.Button({ x: 0, y: 0,
                                           asset: "boton-instrucciones.png" }));
    var creditos = container.insert(new Q.UI.Button({ x: 0, y: 120,
                                           asset: "boton-creditos.png" }));

    jugar.on("click",function(){
      Q.clearStages();
      stageNextScene();
    });
     instr.on("click",function(){
      Q.clearStages();
      Q.stageScene("instrucciones");
    });
    creditos.on("click",function(){
      Q.clearStages();
      Q.stageScene("creditos");
    });
    Q.audio.stop();
   
});
Q.Sprite.extend("Menubg", {
    init: function(p){      
      this._super(p, {
        asset: "menubg.png",               
        x:400,
        y:241
      });
    },
    step: function(dt){
    }
    
});
Q.Sprite.extend("Volver", {
    init: function(p){      
      this._super(p, {
        asset: "boton-volver.png",               
        x:690,
        y:440
      });
    },
    step: function(dt){
    }
    
});
Q.scene('instrucciones',function(stage) {  

    var imagen = stage.insert(new Q.Menubg());
    var container = stage.insert(
        new Q.UI.Container({
          x:400, y:240, w:800, h:480, fill:"rgba(0,0,0,0)"
    }));
    

    var instr = container.insert(new Q.UI.Button({ x: 0, y: 0,
                                           asset: "instr.png" }));
    var volver = container.insert(new Q.UI.Button({ x: 300, y: 200,
                                           asset: "boton-volver.png" }));

    volver.on("click",function(){
      Q.clearStages();
      Q.stageScene("menu");
    });
    instr.on("click",function(){
      Q.clearStages();
      Q.stageScene("menu");
    });
});
Q.scene('creditos',function(stage) { 
  Q.load("rabbits.mp3",function(){
    Q.audio.play("rabbits.mp3");     
    var imagen = stage.insert(new Q.Menubg());
    var container = stage.insert(
        new Q.UI.Container({
          x:400, y:240, w:800, h:480, fill:"rgba(0,0,0,0)"
    }));
    var creds = container.insert(new Q.UI.Button({ x: 0, y: 0,
                                           asset: "creds.png" }));
    var volver = container.insert(new Q.UI.Button({ x: 300, y: 200,
                                           asset: "boton-volver.png" }));
    volver.on("click",function(){
      Q.audio.stop("rabbits.mp3");
      Q.clearStages();      
      Q.stageScene("menu");
    });
    creds.on("click",function(){
      Q.audio.stop("rabbits.mp3");
      Q.clearStages();      
      Q.stageScene("menu");
    });
  });
});


return Q;
};