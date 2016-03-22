Quintus.BigFishPlayer = function(Q) {
	Q.Sprite.extend("Player", {
    init: function(p){
      this._super(p, {
        sheet: "fisherman",
        sprite:"fisherman",
      });
      this.status = "idle";
      this.p.scale = 1.5;
      this.bait = null;  
      this.line = null;    
      this.add("2d,animation,tween");
      Q.input.on("fire",this,"launch");
      Q.input.on("left",this,"reel");
      Q.input.on("up", this,"pull");
      Q.input.on("right",this,"release");
      Q.input.on("down",this,"hold");
      this.on("launched",this,"launched");
      this.on("pulled",this,"pulled");
      this.damage = Q.state.get("rodDamage");
    },

    step: function(dt){    

      if(this.status === "launch" || this.status === "idle"){          
        if(this.bait !== null && this.line !== null){
          this.line.x2 = this.bait.p.x;
          this.line.y2 = this.bait.p.y;
          this.line.curve = true;
        }
      }else{
        if(Q.state.get("currentFishObj") !== null){
          this.line.x2 = Q.state.get("currentFishObj").p.x;
          this.line.y2 = Q.state.get("currentFishObj").p.y;
          this.line.curve = false;
          //console.log("LINE: "+this.line.x1+" - "+this.line.y1+ " a " + this.line.x2+" - "+this.line.y2+ " ||| FISH: "+ Q.state.get("currentFishObj").p.x+ " - "+ Q.state.get("currentFishObj").p.y);
        }else{
          this.line.x2 = this.bait.p.x;
          this.line.y2 = this.bait.p.y;
        }
      }
    }, 
    damaged: function(amount){      
      Q.state.dec("rodHP",amount);
      console.log("Took "+amount+" damage: "+Q.state.get("rodHP"));
    },
    launch: function(){
      if(this.status==="idle"){
        this.status = "launch";
        this.play("launch");
        Q.audio.play("launch.mp3");               
      }
    },
    launched: function(){
      if(this.status==="launch"){
        this.status="fishing";
        this.play("fishing",1);
        this.bait = Q.stage().insert(new Q.Bait());        
        this.line = Q.stage().insert(new Q.Line());
        //perfecto
        this.line.x1 = this.p.x+this.p.cx-11;
        this.line.y1 = this.p.y-this.p.cy-3;

      }
    },    
    reel: function(){
      if(this.status !== "idle" && this.status !== "launch"){
        this.status = "reel";
        this.play("reel",1);
        Q.state.set("playedSkill","reel");
        this.fight(this.status);
        
        this.line.x1 = this.p.x+this.p.cx+2;
        this.line.y1 = this.p.y-this.p.cy;
        Q.audio.stop("reel.mp3");
        Q.audio.stop("quickreel.mp3");
        Q.audio.play("quickreel.mp3");
      }
    },   
    pull: function(){
      if(this.status !== "idle" && this.status !== "launch"){        
        this.status = "pull";        
        this.play("pull",1);
         Q.state.set("playedSkill","pull");
         var hplost = Q.state.get("rodHP")*0.1;
         this.damaged(hplost);
         this.fight(this.status);
         
        this.line.x1 = this.p.x+this.p.cx;
        this.line.y1 = this.p.y-this.p.cy;
        Q.audio.play("pull.mp3");
      }
    },  
    pulled: function(){
      if(this.status === "pull"){        
        this.status="fishing";
        this.play("fishing",1);

        this.line.x1 = this.p.x+this.p.cx+4;
        this.line.y1 = this.p.y-this.p.cy-3;
      }
    },
    release: function(){
      if(this.status !== "idle" && this.status !== "launch"){
        this.status = "release"; 
        this.play("release",1);
        Q.state.set("playedSkill","release");
        this.fight(this.status);
        //perfecto
        this.line.x1 = this.p.x+24;
        this.line.y1 = this.p.y-4;  
        Q.audio.stop("reel.mp3");
        Q.audio.stop("quickreel.mp3");
        Q.audio.play("reel.mp3");    
      }
    },
    hold: function(){
      if(this.status !== "idle" && this.status !== "launch"){
        this.status = "hold"; 
        this.play("reel",1);
        Q.state.set("playedSkill","hold");
        this.fight(this.status);

        //ok
        this.line.x1 = this.p.x+this.p.cx+2;
        this.line.y1 = this.p.y-this.p.cy;
        Q.audio.stop("reel.mp3");
        Q.audio.stop("quickreel.mp3");
        Q.audio.play("quickreel.mp3");
      }
    },
    fight: function(skill){
      var currentSkill = Q.state.get("currentSkill");
      if(currentSkill !== "none"){
        var skillIndex = FIGHT_SKILLS.indexOf(currentSkill);
        var ok = ROD_SKILLS[skillIndex].indexOf(skill);
        var damage = this.damage;
        if(ok >= 0){
          
          if(skill === "pull")
            damage = damage*2;
          Q.state.dec("fishHP",damage);
          var fish = Q.state.get("currentFishObj");
          fish.gotHit(skill);
          
          console.log("hit!:: " +damage);
                   
          Q.state.set("currentSkill","none");
        }else{          
          Q.state.get("currentFishObj").attack();
          console.log("fail! :: "+Q.state.get("rodHP"));
        }
      }
    }   

  });


  Q.Sprite.extend("Line",{
    init: function(p) {
      this._super(p,{
        x:0,
        y:0,
        w:1,
        h:1
      });
      this.curve = true;
    },
    draw:function(ctx){
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(this.x1,this.y1);
      ctx.strokeStyle = 'white';
      if(!this.curve){      
        ctx.lineTo(this.x2,this.y2);
      }
      else{
        ctx.quadraticCurveTo( (this.x1+this.x2)/2,
                              (this.y2+this.y2)/1.8,
                              this.x2,
                              this.y2);
      }
      //console.log("Curva:"+this.curve+" ::: "+((this.x1+this.x2)/2) + " - " + ((this.y1+this.y2)/2) + " i: "+this.x1+"-"+this.y1);
      ctx.stroke();
    }
  });

	return Q;
};