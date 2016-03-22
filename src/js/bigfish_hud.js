Quintus.BigFishHUD = function(Q) {
	Q.UI.Text.extend("Time",{
    init: function(p){
      this._super({
        label: "t: 0s",
        color:"yellow",
        x:40,
        y:10
      });      
    },
    time: function(time){
      this.p.label = "t: "+time+"s";
    },
    step: function(){
      this.refreshClock();
    },
    refreshClock: function(){
      // ACTUALIZAR TIEMPO
      var startTime = Q.stage().time;
      var nowTime = Date.now();
      if(startTime > 1000){ // Ya está en funcionamiento
        var t = nowTime-startTime;
        t = Math.floor(t/1000);
        this.time( t );
      }else{
        Q.stage().time = Date.now();
        this.step();
      }
      // --------------------
    },
  });
Q.UI.Text.extend("StatusLabel",{
    init: function(p){
      this._super({
        label: "En espera",
        x:-40,
        y:-80,
        color:"yellow",
        size:16
      });
      Q.state.on("change.status",this,"statusChanged"); 
    },    
    statusChanged: function(s){
      this.p.label = s;      
    } 
  });
Q.UI.Text.extend("WeightLabel",{
    init: function(p){
      this._super({
        label: "Peso: ---",
        x:-40,
        y:-40,
        color:"white",
        size:16
      });
      Q.state.on("change.currentWeight",this,"weightChanged"); 
    },    
    weightChanged: function(s){
      this.p.label = "Peso: "+s+"kg";      
    } 
  });
Q.UI.Text.extend("FishLabel",{
    init: function(p){
      this._super({
        label: "Tipo: ---",
        x:-40,
        y:-60,
        color:"white",
        size:16
      });
      Q.state.on("change.currentFish",this,"fishChanged"); 
    },    
    fishChanged: function(s){
      this.p.label = "Tipo: "+s;      
    } 
  });
Q.Sprite.extend("Rod",{
    init: function(p){      
      this._super(p, {
        asset: "fishing_rod.png",       
        x:580,
        y:140
      });
      this.perc = 100;
      this.add("tween");
      Q.state.on("change.rodHP",this,"hpChanged"); 
    },
    hpChanged: function(hp){
      this.animate({opacity:0.1},0.5)
          .chain({opacity:1},0.3);
    }

});
Q.Sprite.extend("Fish",{
    init: function(p){      
      this._super(p, {
        asset: "clown-fish-icon.png", 
        x:580,
        y:172
      });
      this.perc = 100;
      this.add("tween");
      Q.state.on("change.fishHP",this,"hpChanged"); 
    },
    hpChanged: function(hp){
      this.animate({opacity:0.1},0.5)
          .chain({opacity:1},0.3);
    },
    
    step:function(){

    }

});
Q.Sprite.extend("RodHPBar", {
    init: function(p){      
      this._super(p, {        
        x:655,
        y:140,  
        w:100,
        h:30,
        color:"green"   
      });
      this.perc = 100;
      Q.state.on("change.rodHP",this,"hpChanged"); 
      
    },
    step: function(dt){
    },
    draw:function(ctx){
     
      ctx.fillStyle = this.p.color;
      // Draw a filled rectangle centered at
      // 0,0 (i.e. from -w/2,-h2 to w/2, h/2)
      ctx.fillRect(-this.p.cx,
                   -this.p.cy,
                   Math.floor(this.perc*1.5),
                   this.p.h);
    },
    hpChanged: function(hp){
      var maxHP = Q.state.get("maxRodHP");
      this.perc = hp*100/maxHP;
      console.log(maxHP+" :: "+hp);

      if(this.perc < 75)
        this.p.color = "yellow";      
      if(this.perc < 50)
        this.p.color = "orange";
      if(this.perc < 25)
        this.p.color = "red";

      if(hp <= 0){        
        Q.clearStages();
        Q.stageScene("lostGame");
      }
    }
    
});
Q.Sprite.extend("FishHPBar", {
    init: function(p){      
      this._super(p, {
        x:655,
        y:172,
        h:30,
        w:100,
        color:"green"
      });
      this.perc = 100;
      Q.state.on("change.fishHP",this,"hpChanged"); 
      
    },
    step: function(dt){
      
    },
    draw:function(ctx){      
      ctx.fillStyle = this.p.color;
      
      ctx.fillRect(-this.p.cx,
                   -this.p.cy,
                   this.perc*1.5,
                   this.p.h);
    },
    hpChanged: function(hp){      
      var maxHP = Q.state.get("maxFishHP");
      console.log(hp + " / "+ maxHP);
      this.perc = hp*100/maxHP;

      if(this.perc < 75)
        this.p.color = "yellow";      
      if(this.perc < 50)
        this.p.color = "orange";
      if(this.perc < 25)
        this.p.color = "red";

      if(hp <= 0){        
        Q.clearStages();
        Q.stageScene("medley");
      }
    }
    
  });
Q.Sprite.extend("SkillIcons", {
    init: function(p){      
      this._super(p, {
        sheet: "skillicons",       
        frame: -1,
        x:670,
        y:218
      });      
      Q.state.on("change.currentSkill",this,"skillChanged");      
    },
    
    skillChanged: function(skill){            
      if(skill === "goRight" || skill === "goDown"){
        this.p.frame = 1;
      }else if(skill === "goLeft" || skill === "goUp"){
        this.p.frame = 0;
      }else if(skill === "spin"){
        this.p.frame = 2;
      }else{
        this.p.frame = -1;
      }
    }
    
    });

Q.scene("HUD",function(stage){
var box = stage.insert(new Q.UI.Container({
    x: 0, y: 5,w:1800,h:50, fill: "rgba(70,132,232,0.5)",border:1
  }));
  var time = box.insert(new Q.Time());

  var skills = stage.insert(new Q.UI.Container({
    x: 700, y: 150,w:300,h:200, fill: "rgba(70,132,232,0.7)",border:1
  }));
  stage.insert(new Q.UI.Text({ 
      label: "Estado:",
      color: "white",           
      x: -100,
      y: -100
    }),skills);
  var estado = skills.insert(new Q.StatusLabel());
  var peso = skills.insert(new Q.WeightLabel());
  var pez = skills.insert(new Q.FishLabel());
  var rod = stage.insert(new Q.Rod());
  var rodHpBar = stage.insert(new Q.RodHPBar());
  var fish = stage.insert(new Q.Fish());  
  var fishHpBar = stage.insert(new Q.FishHPBar()); 
  var skillIcons = stage.insert(new Q.SkillIcons()); 

});
	return Q;
};