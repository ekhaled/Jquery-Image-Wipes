
  }

  $.fn.wipeImages = function(opts,arg){
    return this.each(function(){
      var _this=$(this),
      ins=_this.data("wipeImages");
      if(ins){
        if(opts in ins){
          if($.isFunction(inc[opts])){ //is it a method call
            ins[opts].apply(ins,Array.prototype.splice.call(arguments,1));
          }else{
            if(typeof arg !== "undefined"){ //is it a call to set a property
              ins[opts]=arg;
            }else{ //get the property
              return ins[opts];
            }
          }
        }
      }else{
        ins=new WipeImages(this,opts);
        _this.data("wipeImages",ins);
      }
    });
  };

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
