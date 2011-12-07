(function($){
  $.fn.wipeImages=function(opts){
    var ns=$.fn.wipeImages,
    opts=$.extend(ns.config,opts),
    animating=false,// flag to check if animation is running
    className=ns.config.className||"wipebox",
    pausePlaying=false,
    wipes={},
    images=[];

    ns.addWipe=function(name,fn){
      if(!fn && typeof name=="object"){
        $.extend(wipes,name);
        return;
      }
      wipes["name"]=fn;
    }

    return this.each(function(){
      var _this=$(this).css({position:"relative"}),
      imgs=_this.find("img"),srcs=[],current=0;

      imgs.each(function(){
        srcs.push($(this).attr("src"));
      }).filter(":gt(0)").hide(0);

      if(opts.pauseOnHover){
        _this
        .bind("mouseenter",function(){
          pausePlaying=true;
        })
        .bind("mouseleave",function(){
          pausePlaying=false;
        });
      }

      if(opts.autoPlay){
        setInterval(function(){
          if(!pausePlaying && !animating){
            run();
          }
        },opts.delay)
      }

      function run(){
        var animation=animation||opts.animations,
        toUse=animation,wipeString=[];
        if(animation=="random"){
          for(var k in wipes){
            wipeString.push(k);
          };
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
})(jQuery)
