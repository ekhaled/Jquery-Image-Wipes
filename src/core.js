    return this.each(function(){
      var _this=$(this).css({position:"relative"}),
      imgs=_this.find("img"),srcs=[];

      imgs.each(function(){
        srcs.push($(this).attr("src"));
      });

      wipeImages.srcs=srcs;
      wipeImages.current=0;


      imgs.filter(":gt(0)").hide();

      if(config.pauseOnHover){
        _this
        .bind("mouseenter",function(){
  				pausePlaying=true;
  			})
  			.bind("mouseleave",function(){
  				pausePlaying=false;
  			});
      }

      if(config.autoPlay){
        setInterval(function(){
          if(!pausePlaying && !config.animating){
            run();
          }
        },config.delay)
      }

      function run(){
        var animation=animation||config.animations,
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
