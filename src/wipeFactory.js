(function($){
  //Helper Functions
  function _slicesToArray(r,c){
    var arr=[],b=0;
    for(var i = 0; i < r; i++) {
      arr[i] = new Array(c);
      for(var j = 0; j < c; j++) {
          arr[i][j] = b;
          b++;
      }
    }
    return arr;
  }

  //End Helper Functions

  var namespace=$.fn.wipeImages,
  wipeFactory=function(el,opts){
    var _this=this;
    _this.el=el;
    _this.config=namespace.config;
    _this.images=namespace.images.srcs;
    _this.isGrouped=false;
    _this.prefixes=["ms","moz","webkit","o"];

    _this.setUpVars=$.extend({
      cols:1,
      rows:1,
      duration:this.config.duration,
      easing:this.config.easing,
      isCss3:false,
      from:{
        opacity:0
      },
      to:{
        opacity:1
      }
    },opts);

    var len=_this.images.length,
    current=namespace.images.current;
    current++;
    if(current > (len-1)){
      current=0;
    }
    _this.setUpVars.img=_this.images[current];
    namespace.images.current=current;

    _this._createSlices();

    _this.slices=_this.el.find("." + this.config.className);
    namespace.config.animating=true;
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
     _animate:function(slice,index,total,buffer,callback){
       var _this=this,
       to=_this.setUpVars.to,
       duration=_this.setUpVars.duration,
       easing=_this.setUpVars.easing;
      (function(slice,index,total,buffer,callback){
        setTimeout(function(){
          if(_this.setUpVars.isCss3){
            _temp={};
            for(var i=0;i<_this.prefixes.length;i++){
              _temp["-"+_this.prefixes[i]+"-transition-property"]="all";
              _temp["-"+_this.prefixes[i]+"-transition-duration"]=duration/1000 + "s";
            }
            if(index==(total-1)){
              setTimeout(callback,duration);
            }
            slice.css(_temp);
            slice.css(to);
          }else{
            slice.animate(to,duration,easing,function(){
              if(index==(total-1)){
                callback();
              }
            })
          }
        },buffer);
      })(slice,index,total,buffer,callback);
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
          _this._animate(slice,
            i,l,buffer,
            function(){_this.cleanup();});
        }
      }else{
        _this.slices.each(function(idx){
          var slice=$(this);
          buffer +=increment;
          _this._animate(slice,
            idx,_this.slices.length,buffer,
            function(){_this.cleanup();});
        });
      }

    },
    run:function(){
      this.setup();
      this.play();
    },

    reverse:function(){
      this.slices=[].reverse.apply(this.slices);
    },
    shuffle:function(){
      var arr=this.slices;
      for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
      this.slices=arr;
    },
    groupCentrally:function(r,c){
      var grouped=[],arr=_slicesToArray(r,c),columnLength,
      isEven=(((columnLength = arr[0].length) % 2) == 0);

      var middle=Math.floor((columnLength-1)/2);
      var group=[];
      for(var i=0;i<r;i++){
        var box=middle + (columnLength*i);
        group.push(box);
        if(isEven){
          group.push(box+1);
        }
      }
      grouped.push(group);
      var numTimes=group[0],k=0;
      for(var j=numTimes-1;j>-1;j--){
        var gr=[];
        k=k+2;
        for(var i=0;i<r;i++){
          gr.push(j+(i*columnLength),j+(i*columnLength)+k+(isEven ? 1 : 0));
        }
        grouped.push(gr);
      }
      return grouped;
    },
    groupDiagonally:function(r,c,rev){
      var grouped=[],arr=_slicesToArray(r,c);

      if(rev){
        for (var i = 1 - r; i < c; i++) {
          var group = [];
          for (var j = 0; j < r; j++) {
            if ((i + j) >= 0 && (i + j) < c) {
              group.push(arr[j][i + j]);
            }
          }
          grouped.push(group);
        }
      }else{
        for (var i = 0; i < r + c - 1; i++) {
          var z1 = (i < c) ? 0 : i - c + 1;
          var z2 = (i < r) ? 0 : i - r + 1;
          var group=[];
          for (var j = i - z2; j >= z1; j--) {
            group.push(arr[j][i - j]);
          }
          grouped.push(group);
        }
      }
      return grouped;
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

})(jQuery);
