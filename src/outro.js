    if(config.autoPlay){
      setInterval(function(){
        if(!pausePlaying && !config.animating){
          run();
        }
      },config.delay)
    }

    function run(){
      var wipes=$.fn.wipeImages.wipes,wipeString=[],
      animation=animation||config.animations,
      toUse=animation;
      for(var k in wipes){
        wipeString.push(k);
      };
      if(animation=="random"){
        toUse=wipeString[Math.floor(Math.random()*wipeString.length)];
      }else{
        if($.isArray(animation)){
          var _a=Math.floor(Math.random()*animation.length);
          toUse=animation[_a];
        }else{
          toUse=animation;
        }
      }

      if(wipes[toUse]){
        wipes[toUse](_this);
      }else{
        wipes["default"](_this);
      }

    }

  });

}

$.fn.wipeImages.config={
	animations:"random", // accepts "random" or wipe name as string  e.g "verticalStrips" or wipe names as array eg ["fade","someOtherWipe"]
	autoPlay:true,
	delay:5000,
	duration:400,// duration of animation
	easing:"swing",
	pauseOnHover:false, // pauses the animation when mouse is hovered
	className:"wipebox" // the class name applied to all appended boxes
}

})(jQuery);
