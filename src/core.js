(function($){
  $.fn.wipeImages=function(opts){
    return init.apply(this,[opts]);
  }
  var namespace=$.fn.wipeImages;

  function init(opts){
    namespace.config=$.extend(namespace.config,opts);
    namespace.config.animating=false;// flag to check if animation is running
    namespace.config.className=namespace.config.className || "wipebox";// make sure a class name is set
    namespace.pausePlaying=false;
    namespace.images=[];
    return start(this);
  }

  function start(el){
    var opts=namespace.config,
    wipes=namespace.wipes,wipeString=[];

    for(var k in wipes){
      wipeString.push(k);
    };

    return el.each(function(){
      var _this=$(this).css({position:"relative"}),
      imgs=_this.find("img"),srcs=[];

      imgs.each(function(){
        srcs.push($(this).attr("src"));
      });

      namespace.images.srcs=srcs;
      namespace.images.current=0;


      imgs.filter(":gt(0)").hide();

      if(opts.pauseOnHover){
        _this
        .bind("mouseenter",function(){
          namespace.pausePlaying=true;
        })
        .bind("mouseleave",function(){
          namespace.pausePlaying=false;
        });
      }

      if(opts.autoPlay){
        setInterval(function(){
          if(!namespace.pausePlaying && !namespace.config.animating){
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
    pauseOnHover:false, // pauses the animation when mouse is hovered
    className:"wipebox" // the class name applied to all appended boxes
  }

})(jQuery);