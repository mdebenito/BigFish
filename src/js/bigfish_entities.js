Quintus.BigFishEntities = function(Q) {
	Q.Sprite.extend("BlueFish", {
    init: function(p){
      var posX = Math.floor((Math.random() * (FISH_LIMIT_X[1]-FISH_LIMIT_X[0]))+FISH_LIMIT_X[0]);   
      var posY = Math.floor((Math.random() * (FISH_LIMIT_Y[1]-FISH_LIMIT_Y[0]))+FISH_LIMIT_Y[0]);
      this._super(p, {
        sheet: "bluefish",
        sprite: "bluefish",
        x: posX,
        y: posY
      });
     var minWeight = Q.state.get("minWeight");
      this.weight = Math.floor(minWeight + Math.random()*FISH_GROWING_FACTOR);
      this.vhz = 60;
      this.vvr = 20;
      this.status ="swimming";
      this.add("2d, animation, tween, fishMovement, fishFight, aiBounce");
      
    },
    step: function(dt){
      this.fishMove(dt);

    }   
    
  });
  Q.Sprite.extend("Snake", {
    init: function(p){
      var posX = Math.floor((Math.random() * (FISH_LIMIT_X[1]-FISH_LIMIT_X[0]))+FISH_LIMIT_X[0]);   
      var posY = Math.floor((Math.random() * (FISH_LIMIT_Y[1]-FISH_LIMIT_Y[0]))+FISH_LIMIT_Y[0]);
      this._super(p, {
        sheet: "snake",
        sprite: "snake",
        x: posX,
        y: posY
      });
      var minWeight = Q.state.get("minWeight");
      this.weight = Math.floor(minWeight + Math.random()*FISH_GROWING_FACTOR);
      this.vhz = 20;
      this.vvr = 5;
      this.status ="swimming";
      this.add("2d, animation, tween, fishMovement, fishFight, aiBounce");
      
      
    },
    step: function(dt){
      this.fishMove(dt);

    }   
    
  });
  Q.Sprite.extend("RedFish", {
    init: function(p){
      var posX = Math.floor((Math.random() * (FISH_LIMIT_X[1]-FISH_LIMIT_X[0]))+FISH_LIMIT_X[0]);   
      var posY = Math.floor((Math.random() * (FISH_LIMIT_Y[1]-FISH_LIMIT_Y[0]))+FISH_LIMIT_Y[0]);
      this._super(p, {
        sheet: "redfish",
        sprite: "redfish",
        x: posX,
        y: posY
      });
      var minWeight = Q.state.get("minWeight");
      this.weight = calcFishWeight(minWeight);
      this.vhz = 70;
      this.vvr = 40;
      this.status ="swimming";
      this.add("2d, animation, tween, fishMovement, fishFight, aiBounce");
      
    },
    step: function(dt){
      this.fishMove(dt);

    }
    });
  Q.Sprite.extend("YellowFish", {
    init: function(p){
      var posX = Math.floor((Math.random() * (FISH_LIMIT_X[1]-FISH_LIMIT_X[0]))+FISH_LIMIT_X[0]);   
      var posY = Math.floor((Math.random() * (FISH_LIMIT_Y[1]-FISH_LIMIT_Y[0]))+FISH_LIMIT_Y[0]);
      this._super(p, {
        sheet: "yellowfish",
        sprite: "yellowfish",
        x: posX,
        y: posY
      });
      var minWeight = Q.state.get("minWeight");
      this.weight = calcFishWeight(minWeight);
      this.vhz = 90;
      this.vvr = 60;
      this.status ="swimming";
      this.add("2d, animation, tween, fishMovement, fishFight, aiBounce");
      
    },
    step: function(dt){
      this.fishMove(dt);

    }
    });
  Q.Sprite.extend("GreenFish", {
    init: function(p){
      var posX = Math.floor((Math.random() * (FISH_LIMIT_X[1]-FISH_LIMIT_X[0]))+FISH_LIMIT_X[0]);   
      var posY = Math.floor((Math.random() * (FISH_LIMIT_Y[1]-FISH_LIMIT_Y[0]))+FISH_LIMIT_Y[0]);
      this._super(p, {
        sheet: "greenfish",
        sprite: "greenfish",
        x: posX,
        y: posY
      });
      var minWeight = Q.state.get("minWeight");
      this.weight = calcFishWeight(minWeight);
      this.vhz = 80;
      this.vvr = 50;
      this.status ="swimming";
      this.add("2d, animation, tween, fishMovement, fishFight, aiBounce");
      
    },
    step: function(dt){
      this.fishMove(dt);

    }
    });
  Q.Sprite.extend("Frog", {
    init: function(p){
      var posX = Math.floor((Math.random() * (FISH_LIMIT_X[1]-FISH_LIMIT_X[0]))+FISH_LIMIT_X[0]);   
      var posY = Math.floor((Math.random() * (FISH_LIMIT_Y[1]-FISH_LIMIT_Y[0]))+FISH_LIMIT_Y[0]);
      this._super(p, {
        sheet: "frog",
        sprite: "frog",
        x: posX,
        y: posY
      });
      var minWeight = Q.state.get("minWeight");
      this.weight = calcFishWeight(minWeight);
      this.vhz = 30;
      this.vvr = 10;
      this.status ="swimming";
      this.add("2d, animation, tween, fishMovement, fishFight, aiBounce");
      
    },
    step: function(dt){
      this.fishMove(dt);

    }
    });
  Q.Sprite.extend("Manta", {
    init: function(p){
      var posX = Math.floor((Math.random() * (FISH_LIMIT_X[1]-FISH_LIMIT_X[0]))+FISH_LIMIT_X[0]);   
      var posY = Math.floor((Math.random() * (FISH_LIMIT_Y[1]-FISH_LIMIT_Y[0]))+FISH_LIMIT_Y[0]);
      this._super(p, {
        sheet: "manta",
        sprite: "manta",
        x: posX,
        y: posY
      });
      var minWeight = Q.state.get("minWeight");
      this.weight = calcFishWeight(minWeight);
      this.vhz = 80;
      this.vvr = 10;
      this.status ="swimming";
      this.add("2d, animation, tween, fishMovement, fishFight, aiBounce");
      
    },
    step: function(dt){
      this.fishMove(dt);

    }
    });

  
  Q.Sprite.extend("Bait", {
    init: function(p){
      this.status = "waiting";
      this.posX =  Math.floor((Math.random() * (FISH_LIMIT_X[1]-FISH_LIMIT_X[0]))+FISH_LIMIT_X[0]);      
      this.posY = WATER_LEVEL-20;
      this._super(p, {
        sheet: "bait",
        sprite: "bait",
        x: FISHERMAN_START.x+20,
        y: FISHERMAN_START.y-10,
        gravity: 0
      });
      this.add("2d, animation, tween");
      this.play("bait_float");
    },
    step: function(dt){
      if(this.p.y < this.posY && this.status === "waiting"){
        this.p.gravity = 0.05;
        this.p.vx = 150;
        
      }else if(this.p.y < this.posY && this.status === "inwater"){
        this.p.gravity = 0.1;
        this.p.vy = 0;
        this.p.vx = 5;

      }else if(this.p.y > this.posY){
        this.p.gravity = -0.1;
        this.p.vx = 5;
        if(this.status !== "inwater"){
          this.status = "inwater";
          Q.audio.play("splash.mp3",{debounce : true});
        }
      }else{
        this.p.gravity = 0;
        this.p.vx = 0;        
      }

      if(this.p.x >= this.posX && this.status === "inwater"){
        this.p.vx = -5;
      }else if(this.p.x < this.posX && this.status === "inwater"){
        this.p.vx = 5;
      }

      if(this.status === "inwater"){
        Q.stage().bait = this;         
      }
      

    },
    eaten: function(){      
      Q.stage().bait = null; 
      this.status = "eaten";
      
      this.destroy();     
    }
    });
	return Q;
};