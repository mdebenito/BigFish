Quintus.BigFishAnimations = function(Q) {
	Q.animations("fisherman",{
	  idle:{frames:[0],rate:1/1},
	  launch:{frames:[1,2],rate:1/5,loop:false,trigger:"launched"},
	  pull:{frames:[3,4,5],rate:1/5,loop:false,trigger:"pulled"},
	  reel:{frames:[4,5], rate:1/10},
	  release:{frames:[6],rate:1/5,loop:false,trigger:"released"},
	  fishing:{frames:[2],rate:1/100}
	});
	Q.animations("bluefish",{  
	  bluefish_down:{frames:[0,1,2],rate:1/5},
	  bluefish_left:{frames:[3,4,5],rate:1/5},  
	  bluefish_right:{frames:[6,7,8],rate:1/5},
	  bluefish_up:{frames:[9,10,11],rate:1/5},
	});
	Q.animations("redfish",{  
	  redfish_down:{frames:[0,1,2],rate:1/5},
	  redfish_left:{frames:[3,4,5],rate:1/5},  
	  redfish_right:{frames:[6,7,8],rate:1/5},
	  redfish_up:{frames:[9,10,11],rate:1/5},
	});
	Q.animations("snake",{  
	  snake_down:{frames:[0,1,2],rate:1/5},
	  snake_left:{frames:[3,4,5],rate:1/5},  
	  snake_right:{frames:[6,7,8],rate:1/5},
	  snake_up:{frames:[9,10,11],rate:1/5},
	});
	Q.animations("yellowfish",{  
	  yellowfish_down:{frames:[0,1,2],rate:1/5},
	  yellowfish_left:{frames:[3,4,5],rate:1/5},  
	  yellowfish_right:{frames:[6,7,8],rate:1/5},
	  yellowfish_up:{frames:[9,10,11],rate:1/5},
	});
	Q.animations("greenfish",{  
	  greenfish_down:{frames:[0,1,2],rate:1/5},
	  greenfish_left:{frames:[3,4,5],rate:1/5},  
	  greenfish_right:{frames:[6,7,8],rate:1/5},
	  greenfish_up:{frames:[9,10,11],rate:1/5},
	});
	Q.animations("frog",{  
	  frog_down:{frames:[0,1,2],rate:1/5},
	  frog_left:{frames:[3,4,5],rate:1/5},  
	  frog_right:{frames:[6,7,8],rate:1/5},
	  frog_up:{frames:[9,10,11],rate:1/5},
	});
	Q.animations("manta",{  
	  manta_down:{frames:[0,1,2],rate:1/5},
	  manta_left:{frames:[3,4,5],rate:1/5},  
	  manta_right:{frames:[6,7,8],rate:1/5},
	  manta_up:{frames:[9,10,11],rate:1/5},
	});
	Q.animations("bait",{  
	  bait_float:{frames:[0,1,2],rate:1/2}  
	});
	return Q;
};