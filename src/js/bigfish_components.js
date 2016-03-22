Quintus.BigFishComponents = function(Q) {
Q.component("fishMovement",{
  added:function(){    
    this.entity.lastMoveSwap = 0;
  },
  extend:{
    animateFish: function(){
      var anim = this.p.sprite+"_right";
      if(this.p.vx > 0){
        anim = this.p.sprite+"_right";        
      }else if(this.p.vx < 0){
        anim = this.p.sprite+"_left";        
      }else{
        if(this.p.vy <0){
          anim = this.p.sprite+"_up";   
        }else if(this.p.vy > 0){
          anim = this.p.sprite+"_down";   
        }else{
          anim = this.p.sprite+"_right";   
        }
      }

      return anim;
    },
    fishMove: function(dt){ 
      this.p.gravity = 0; 
      var status = this.status;
      if(this.status !== "fighting"){ 
        var bait = Q.stage().bait;            
        if(Q.stage().bait === null){
          this.moveFreely(dt);        
        }else{
          if(!Q.stage().bait.isDestroyed)
            this.pursueBait();
          else
            this.moveFreely(dt);
        }
      }else{
        this.fight(dt);
      }
      this.play(this.animateFish());

    },
    moveFreely: function(dt){
      this.lastMoveSwap+=dt;
      if(this.p.vx > 0){ //va hacia la derecha
        if (this.p.x >= FISH_LIMIT_X[1]){
          this.p.vx = -this.vhz;          
        }
      }else if(this.p.vx < 0){
        if(this.p.x <= FISH_LIMIT_X[0]){
          this.p.vx = this.vhz;          
        }
      }else{
        this.p.vx = this.vhz;
      }     

      if(this.p.y <= FISH_LIMIT_Y[0]+30){
        this.p.vy = this.vvr;
      }else if(this.p.y > FISH_LIMIT_Y[1]-30){
        this.p.vy = -this.vvr;
      }else{       
        if(this.lastMoveSwap > 3){
          if(this.p.vy >= 0){
            this.p.vy = -this.vvr;  
          }else{
            this.p.vy = this.vvr;
          }
          this.lastMoveSwap = 0;                  
        }
      }
      
    },
    pursueBait: function(){
      var bait = Q.stage().bait;
      var baitX = bait.p.x;
      var baitY = bait.p.y;

      if(this.p.x < baitX){
        this.p.vx = this.vhz;
      }else if(this.p.x > baitX+8){
        this.p.vx = -this.vhz;
      }else{
        this.p.vx = -1;
      }

      if(this.p.y < baitY){
        this.p.vy = this.vvr;
      }else if(this.p.y > baitY+8){
        this.p.vy = -this.vvr;
      }else{
        this.p.vy = -1;
      }
    },
    limitMovement: function(){
       if (this.p.x >= FISH_LIMIT_X[1] ||
                this.p.x <= FISH_LIMIT_X[0] )
              this.p.vx = 0;
            if( this.p.y <= FISH_LIMIT_Y[0]+30 ||
                this.p.y >= FISH_LIMIT_Y[1]+30
              )
              this.p.vy = 0;
          }

  }
});
Q.component("fishFight",{
  added:function(){    
    this.entity.on("hit",this.entity,"collision");
    this.entity.lastSkillUsed = 0;
    this.entity.lastAttack = 0;
    this.entity.hp = calcFishHP(this.entity.weight);
    this.entity.p.scale = calcFishScale(this.entity.weight);    
    this.entity.damage = calcFishDamage(this.entity.weight);
    
  },
  extend:{
    attack: function(){
      Q.state.dec("rodHP",this.damage);
    },
    gotHit: function(skill){
      if(skill == "reel")
        this.p.vx = -this.vhz*0.5;
      if(skill == "pull")  {
        this.animate({ x: FISH_LIMIT_X[0]+30, y: FISH_LIMIT_Y[0]+30},0.5);
      }
      if(skill == "hold")
        this.p.vx = 0;
      if(skill == "release")
        this.p.vx = this.vhz;


     this.limitMovement();
      
    },
    fight: function(dt){      
      this.lastSkillUsed += dt;   
      this.lastAttack += dt;     
      var skillTime = calcSkillTime(this.weight);
      if(this.lastSkillUsed >= skillTime){

        if(Q.state.get("currentSkill")!== "none"){
          this.attack();
          this.lastAttack = 0;
        }        
        this.useRandomSkill();        
        this.lastSkillUsed = 0;
        this.lastAttack = 0;
      }else if(this.lastAttack >= NO_SKILL_TIME){
        if(Q.state.get("currentSkill")!== "none"){
          this.attack();          
        }
        this.lastAttack = 0;
      }
      this.limitMovement();
    },
    useRandomSkill: function(){
      var skillIndex = Math.floor(Math.random()*FIGHT_SKILLS.length);
      var skill = FIGHT_SKILLS[skillIndex];
      
      var func = "this."+skill+"(\""+skill+"\")";      
      eval(func);      
    },
    goDown: function(skill){
      if(this.p.y < FISH_LIMIT_Y[1] -40){
        this.chain({ angle: 270 },0.5 );
          
        this.p.vy = this.vvr/2;
        this.p.vx = 0;
        console.log(skill);
        Q.state.set("currentSkill",skill);
      }else{
        console.log("changing skill...");
        this.useRandomSkill();

      }
    },
    goUp: function(skill){
      if(this.p.y > FISH_LIMIT_Y[0]+40){
        this.p.vy = -(this.vvr/2);
        this.p.vx = 0;
        console.log(skill);
        Q.state.set("currentSkill",skill);
      }else{
        console.log("changing skill...");
        this.useRandomSkill();
      }
    },
    goRight: function(skill){
      if(this.p.x < FISH_LIMIT_X[1]-40){
        this.p.vy = 2;
        this.p.vx = this.vhz/2;
        console.log(skill);
        Q.state.set("currentSkill",skill);
      }else{
        console.log("changing skill...");
        this.useRandomSkill();
      }
    },
    goLeft: function(skill){
      if(this.p.x > FISH_LIMIT_X[0]){
        this.p.vy = -2;
        this.p.vx = -(this.vhz/2);
        console.log(skill);
        Q.state.set("currentSkill",skill);
      }else{
        console.log("changing skill...");
        this.useRandomSkill();
      }
    },
    spin: function(skill){      
        this.animate();
        console.log(skill);
        Q.state.set("currentSkill",skill);
        this.chain({ angle: 360 },0.5 ) 
          .chain({ angle:   0 }, 1); 
    },
    collision: function(col){
      if(col.obj.isA("Bait") && this.status !== "fighting" && Q.stage().bait !== null){
        this.status = "fighting";        
        this.p.vx =0;
        this.p.vy =0;
        Q.state.set("status","¡Han picado!");
        Q.state.set("currentWeight",this.weight);
        Q.state.set("currentFish",this.p.sprite);
        Q.state.set("currentFishObj",this);
        Q.state.set("maxFishHP",this.hp);
        Q.state.set("fishHP",this.hp);        
        col.obj.eaten();
        this.useRandomSkill();
      }
    }
  }
});
	return Q;
};