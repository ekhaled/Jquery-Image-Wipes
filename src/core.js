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
