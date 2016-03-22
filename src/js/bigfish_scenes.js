Quintus.BigFishScenes = function(Q) {
  Q.scene("lochness",function(stage) {
    Q.stageTMX("l1.tmx",stage);  
     var fisherman = stage.insert(new Q.Player()); 
     fisherman.p.x = FISHERMAN_START.x;
     fisherman.p.y = FISHERMAN_START.y;
     stage.time = Date.now();
     

    addRandomFishes(RIVER_FISHES,stage,calcFishNumber(Q.state.get("currentWeight")));
     Q.stageScene("HUD",2);
     Q.audio.play("wetlands.mp3",{loop:true});
  });
  Q.scene("sydney",function(stage) {
    Q.stageTMX("sydney.tmx",stage);  
     var fisherman = stage.insert(new Q.Player()); 
     fisherman.p.x = FISHERMAN_START.x;
     fisherman.p.y = FISHERMAN_START.y;
     stage.time = Date.now();
     

    addRandomFishes(SEA_FISHES,stage,calcFishNumber(Q.state.get("currentWeight")));

     Q.stageScene("HUD",2);
     Q.audio.play("olas.mp3",{loop:true});
  });
  Q.scene("gijon",function(stage) {
    Q.stageTMX("gijon.tmx",stage);  
     var fisherman = stage.insert(new Q.Player()); 
     fisherman.p.x = FISHERMAN_START.x;
     fisherman.p.y = FISHERMAN_START.y;
     stage.time = Date.now();
     

    addRandomFishes(SEA_FISHES,stage,calcFishNumber(Q.state.get("currentWeight")));

     Q.stageScene("HUD",2);
  });
    Q.scene("sanfrancisco",function(stage) {
    Q.stageTMX("sanfrancisco.tmx",stage);  
     var fisherman = stage.insert(new Q.Player()); 
     fisherman.p.x = FISHERMAN_START.x;
     fisherman.p.y = FISHERMAN_START.y;
     stage.time = Date.now();
     

    addRandomFishes(SEA_FISHES,stage,calcFishNumber(Q.state.get("currentWeight")));

     Q.stageScene("HUD",2);
     Q.audio.play("olas.mp3",{loop:true});
  });
    Q.scene("huelva",function(stage) {
    Q.stageTMX("huelva.tmx",stage);  
     var fisherman = stage.insert(new Q.Player()); 
     fisherman.p.x = FISHERMAN_START.x;
     fisherman.p.y = FISHERMAN_START.y;
     stage.time = Date.now();

    addRandomFishes(RIVER_FISHES,stage,calcFishNumber(Q.state.get("currentWeight")));

     Q.stageScene("HUD",2);
     Q.audio.play("wetlands.mp3",{loop:true});
  });
    Q.scene("lastres",function(stage) {
    Q.stageTMX("lastres.tmx",stage);  
     var fisherman = stage.insert(new Q.Player()); 
     fisherman.p.x = FISHERMAN_START.x;
     fisherman.p.y = FISHERMAN_START.y;
     stage.time = Date.now();
     

    addRandomFishes(SEA_FISHES,stage,calcFishNumber(Q.state.get("currentWeight")));

     Q.stageScene("HUD",2);
     Q.audio.play("olas.mp3",{loop:true});
  });
    Q.scene("amazonas",function(stage) {
    Q.stageTMX("amazonas.tmx",stage);  
     var fisherman = stage.insert(new Q.Player()); 
     fisherman.p.x = FISHERMAN_START.x;
     fisherman.p.y = FISHERMAN_START.y;
     stage.time = Date.now();
     

    addRandomFishes(RIVER_FISHES,stage,calcFishNumber(Q.state.get("currentWeight")));

     Q.stageScene("HUD",2);
     Q.audio.play("waterfall.mp3",{loop:true});
  });
    Q.scene("hawaii",function(stage) {
    Q.stageTMX("hawaii.tmx",stage);  
     var fisherman = stage.insert(new Q.Player()); 
     fisherman.p.x = FISHERMAN_START.x;
     fisherman.p.y = FISHERMAN_START.y;
     stage.time = Date.now();
     

    addRandomFishes(SEA_FISHES,stage,calcFishNumber(Q.state.get("currentWeight")));

     Q.stageScene("HUD",2);
     Q.audio.play("olas.mp3",{loop:true});
  });
    Q.scene("niagara",function(stage) {
    Q.stageTMX("niagara.tmx",stage);  
     var fisherman = stage.insert(new Q.Player()); 
     fisherman.p.x = FISHERMAN_START.x;
     fisherman.p.y = FISHERMAN_START.y;
     stage.time = Date.now();
     

    addRandomFishes(SEA_FISHES,stage,calcFishNumber(Q.state.get("currentWeight")));

     Q.stageScene("HUD",2);
     Q.audio.play("waterfall.mp3",{loop:true});
  });



return Q;
};