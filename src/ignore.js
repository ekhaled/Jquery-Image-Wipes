(function($){

  function wipeImages(el,opts){
    this.el=el;this.opts=opts;
    console.log("wipeImages Initiated");
    this.wipeFactory=new wipeFactory(this);
    
  }
  
  function wipeFactory(cons){
    console.log("initiated1");
    var _this=this
    this.tada="hello";
    return function(el,opts){
      console.log("initiated2");
      
      return {
        run:function(){
          console.log("run",el,opts);
        },
        shuffle:function(){
          console.log("shuffle",el,opts);
        },
        reverse:function(){
          console.log(_this.tada,"reverse",el,opts);
        }
      }
    }
  }
  
  var foo = new wipeImages();
  var factory = foo.wipeFactory("a","b");
  factory.reverse();
  
  
  
  
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
        ins=new wipeImages(this,opts);
        _this.data("wipeImages",ins);
      }
    });
  };
  
  $.fn.wipeImages.wipeFactory=wipeFactory
  
})(jQuery);

(function($){
  var factory=$.fn.wipeImages.wipeFactory;
  (function(f){
    var el="1",opts="2";
    var cons = new f(el,opts);
    console.log(cons.run());
  })(factory)
})(jQuery)