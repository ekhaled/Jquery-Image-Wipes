(function($){
  var ns=$.fn.wipeImages,factory=ns.wipeFactory;
  $.fn.wipeImages.wipes=$.extend($.fn.wipeImages.wipes,{
    
    blindRight:function(el){
      var opts={
        cols:10,rows:1
      };
      var wipe=new factory(el,opts);
      wipe.run();
    },
    blindLeft:function(el){
      var opts={
        cols:10,rows:1
      };
      var wipe=new factory(el,opts);
      wipe.reverse();   
      wipe.run();
    },
    blindTop:function(el){
      var opts={
        cols:1,rows:5
      };
      var wipe=new factory(el,opts);
      wipe.run();
    },
    blindBottom:function(el){
      var opts={
        cols:1,rows:5
      };
      var wipe=new factory(el,opts);
      wipe.reverse();   
      wipe.run();
    },
    rain:function(el){
      var endHeight=el.height(),opts={
        cols:30,rows:1,
        from:{
          height:"0px"
        },
        to:{
          height:endHeight + "px"
        }
      };
      var wipe=new factory(el,opts);     
      wipe.run();
    },
    randomRain:function(el){
      var endHeight=el.height(),opts={
        cols:30,rows:1,
        from:{
          height:"0px"
        },
        to:{
          height:endHeight + "px"
        }
      };
      var wipe=new factory(el,opts);
      wipe.shuffle();   
      wipe.run();
    },
    boxes:function(el){
      var endHeight=el.height(),opts={
        cols:8,rows:4
      };
      var wipe=new factory(el,opts);  
      wipe.run();
    },
    randomBoxes:function(el){
      var endHeight=el.height(),opts={
        cols:8,rows:4
      };
      var wipe=new factory(el,opts);
      wipe.shuffle();  
      wipe.run();
    }    
  });
})(jQuery);