(function($){
  $.fn.wipeImages=function(opts){
    return init.apply(this,[opts]);
  }
  
  function init(opts){
    $.fn.wipeImages.config=$.extend($.fn.wipeImages.config,opts);
    $.fn.wipeImages.config.animating=false;// flag to check if animation is running
    $.fn.wipeImages.config.className=$.fn.wipeImages.config.className || "wipebox";// make sure a class name is set
    $.fn.wipeImages.pausePlaying=false;
    $.fn.wipeImages.images=[];
		return start(this);
  }
  
  function start(el){
    var opts=$.fn.wipeImages.config,
    wipes=$.fn.wipeImages.wipes,wipeString=[];
    
    for(var k in wipes){
      wipeString.push(k);
    };
    
    return el.each(function(){
      var _this=$(this).css({position:"relative"}),
      imgs=_this.find("img"),srcs=[];
      
      imgs.each(function(){
        srcs.push($(this).attr("src"));
      });
      
      $.fn.wipeImages.images.srcs=srcs;
      $.fn.wipeImages.images.current=-1;
      
      
      imgs.remove();
      run("default");
      
      if(opts.pauseOnHover){
        _this
        .bind("mouseenter",function(){
  				$.fn.wipeImages.pausePlaying=true;
  			})
  			.bind("mouseleave",function(){
  				$.fn.wipeImages.pausePlaying=false;
  			});
      }
      
      if(opts.autoPlay){
        setInterval(function(){
          if(!$.fn.wipeImages.pausePlaying && !$.fn.wipeImages.config.animating){
            run();
          }
        },opts.delay)
      }
      
      function run(){
        var animation=animation||opts.animations,
        toUse=animation;
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
		pauseOnHover:true, // pauses the animation when mouse is hovered
		className:"wipebox" // the class name applied to all appended boxes
	}
  
})(jQuery);