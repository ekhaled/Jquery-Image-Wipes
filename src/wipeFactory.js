var wipeFactory=function(el,opts){
    var _this=this;
    _this.el=el;
    _this.config=config;
    _this.images=wipeImages.srcs;
    _this.isGrouped=false;

    _this.setUpVars=$.extend({
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

    var len=wipeImages.length,
    current=wipeImages.current;
    current++;
    if(current > (len-1)){
      current=0;
    }
    _this.setUpVars.img=_this.images[current];
    wipeImages.current=current;

    _this._createSlices();

    _this.slices=_this.el.find("." + this.config.className);
    config.animating=true;
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
		      from=$.extend({
	          left:(wd*c) + "px",
            top: (ht*r) + "px",
            height: (ht) + "px",
	        },setUpVars.from);
		      if(c==setUpVars.cols-1){
		        from=$.extend({
              width: (e_wd - (wd*c)) + "px"
		        },from);
	        }else{
	          from=$.extend({
              width: (wd) + "px"
		        },from);
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
    cleanup:function(){
      var _this=this;
      namespace.config.animating=false;
      _this.el.append("<img src='"+_this.setUpVars.img+"'>");
      if(_this.isGrouped){
        var i,j,l=_this.slices.length;
        for(i=0;i<l;i++){
          var sl=_this.slices[i].length;
          for(j=0;j<sl;j++){
            $(_this.slices[i][j]).remove();
          }
        }
      }else{
        _this.slices.remove();
      }

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
    setup:function(){},
    play:function(){
      var _this=this,done=0,buffer=0,increment=_this.setUpVars.duration/_this.slices.length,slice;
      if(_this.isGrouped){
        var i,l=_this.groups.length;
        increment=_this.setUpVars.duration/_this.groups.length;
        for(i=0;i<l;i++){
          var grp=_this.groups[i];
          slice=_this.slices.eq(grp.shift());
          while(grp.length > 0){
            slice=slice.add(_this.slices.eq(grp.shift()));
          }
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
    run:function(){
      this.setup();
      this.play();
    }
  }

  namespace.wipeFactory=wipeFactory;

  namespace.wipes={
    "default":function(el){
      var wipe=new namespace.wipeFactory(el);
      wipe.run();
    },
    fadeIn:function(el){
      var wipe=new namespace.wipeFactory(el,{
        cols:10,
        rows:20
      });
      wipe.reverse();
      wipe.run();
    }
  };
