(function($){
  var wipeFactory=function(el,opts){
    this.el=el;
    this.config=$.fn.wipeImages.config;
    this.images=$.fn.wipeImages.images.srcs;
    this.isGrouped=false;
    
    this.setUpVars=$.extend({
      cols:1,
      rows:1,
      duration:this.config.duration,
      easing:this.config.easing,
      from:{
        opacity:0
      },
      to:{
        opacity:1
      }
    },opts);
    
    var len=this.images.length,
    current=$.fn.wipeImages.images.current;
    current++;
    if(current > (len-1)){
      current=0;
    }
    this.setUpVars.img=this.images[current];
    $.fn.wipeImages.images.current=current;
    
    this._createSlices();
    
    this.slices=this.el.find("." + this.config.className);
    $.fn.wipeImages.config.animating=true;
  }
  wipeFactory.prototype={
    _createSlices:function(){
      var _this=this,el=_this.el,
      className=_this.config.className,
      e_wd=el.width(),e_ht=el.height(),
      setUpVars=_this.setUpVars,
		  wd=Math.round(e_wd/setUpVars.cols),
		  ht=Math.round(e_ht/setUpVars.rows),from={};
		    
		  for(var r = 0; r < setUpVars.rows; r++){
		    for(var c= 0; c < setUpVars.cols; c++){
		      if(c==setUpVars.cols-1){
		        from=$.extend({
		          left:(wd*c) + "px",
              top: (ht*r) + "px",
              width: (e_wd - (wd*c)) + "px",
              height: (ht) + "px",
		        },setUpVars.from);
	        }else{
	          from=$.extend({
		          left:(wd*c) + "px",
              top: (ht*r) + "px",
              width: (wd) + "px",
              height: (ht) + "px",
		        },setUpVars.from);
	        } 
	        el.append(
	          $("<div>",{
	            "class":className,
	            css:{
	              position: "absolute",
	              background: 'url("'+ setUpVars.img +'") no-repeat -'+ ((wd + (c * wd)) - wd) +'px -'+ ((ht + (r * ht)) - ht) +'px'
	            }
	          }).css(from)
	        );
		      
		    }
		  }
    },
    cleanup:function(){
      var _this=this;
      $.fn.wipeImages.config.animating=false;
      _this.el.append("<img src='"+_this.setUpVars.img+"'>");
      _this.slices.remove();
      _this.el.find(":not(:last-child)").remove();
    },
    reverse:function(){
      this.slices=[].reverse.apply(this.slices);
    },
    shuffle:function(){
      var arr=this.slices;
      for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
      this.slices=arr;
    },
    to2D:function(){
      var _this=this,slices=_this.slices,
      r=_this.setUpVars.rows,c=_this.setUpVars.cols,
      grouped=[],arr=[],b=0;
      
      for(var i = 0; i < r; i++) {
        arr[i] = new Array(c);
        for(var j = 0; j < c; j++) {
            arr[i][j] = b;
            b++;
        }
      }
      
      for (var i = 0; i < r + c - 1; i++) {
        var z1 = (i < c) ? 0 : i - c + 1;
        var z2 = (i < r) ? 0 : i - r + 1;
        var group=[];
        for (var j = i - z2; j >= z1; j--) {
          group.push(slices.eq(arr[j][i - j]));
        }
        grouped.push(group);
      }
      
      this.slices=grouped;
      this.isGrouped=true;
      
    },
    setup:function(){
      
    },
    play:function(){
      var _this=this,done=0,buffer=0,increment=_this.setUpVars.duration/_this.slices.length;
      if(_this.isGrouped){
        var i,l=_this.slices.length;
        for(i=0;i<l;i++){
          var slice=$(_this.slices[i]);
          console.log(slice);
          buffer +=increment;
          _this._animate(slice,_this.setUpVars.to,
            _this.setUpVars.duration,_this.setUpVars.easing,
            i,l,buffer,
            function(){_this.cleanup();});
        }
      }else{
        _this.slices.each(function(idx){
          var slice=$(this);
          buffer +=increment;
          _this._animate(slice,_this.setUpVars.to,
            _this.setUpVars.duration,_this.setUpVars.easing,
            idx,_this.slices.length,buffer,
            function(){_this.cleanup();});
        });
      }
      
    },
    _animate:function(slice,to,duration,easing,index,total,buffer,callback){
      (function(slice,to,duration,easing,index,total,buffer,callback){
        setTimeout(function(){
          slice.animate(to,duration,easing,function(){
            if(index==(total-1)){
              callback();
            }
          })
        },buffer);
      })(slice,to,duration,easing,index,total,buffer,callback);
    },
    run:function(){
      this.setup();
      this.play();
    }
  }
  
  $.fn.wipeImages.wipeFactory=wipeFactory;
  
  $.fn.wipeImages.wipes={
    "default":function(el){
      var wipe=new $.fn.wipeImages.wipeFactory(el);
      wipe.run();
    },
    fadeIn:function(el){
      var wipe=new $.fn.wipeImages.wipeFactory(el,{
        cols:10,
        rows:20
      });
      wipe.reverse();      
      wipe.run();
    }
  };
  
})(jQuery);