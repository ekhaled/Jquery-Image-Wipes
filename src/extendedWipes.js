
  var ns=$.fn.wipeImages,factory=ns.wipeFactory;

  //Diagonal Fade Animations
  function diagonals(){
    var opts={
      cols:8,rows:4
    },wipe;
    function _run(rev1,rev2){
      wipe.isGrouped=true;
      wipe.groups=wipe.groupDiagonally(opts.rows,opts.cols,rev1);
      if(rev2) {wipe.groups.reverse();}
      wipe.run();
    }
    return {
      diagTopLeft:function(el){
        wipe=new factory(el,opts);
        _run();
      },
      diagTopRight:function(el){
        wipe=new factory(el,opts);
        _run(true,true);
      },
      diagBottomRight:function(el){
        wipe=new factory(el,opts);
        _run(false,true);
      },
      diagBottomLeft:function(el){
        wipe=new factory(el,opts);
        _run(true,false);
      }
    };
  }

  //From Center Fade Animations
  function fromCenters(){
    var opts={
      cols:10,rows:1
    },wipe;
    function _run(rev){
      wipe.isGrouped=true;
      wipe.groups=wipe.groupCentrally(opts.rows,opts.cols);
      if(rev) {wipe.groups.reverse();}
      wipe.run();
    }
    return {
      fromCenter:function(el){
        wipe=new factory(el,opts);
        _run();
      },
      toCenter:function(el){
        opts.cols=9;
        wipe=new factory(el,opts);
        _run(true);
      }
    };
  }

  //pyramid animations
  function pyramids(){
    var opts={
      cols:19,rows:1,
      from:{
        height:"0px"
      }
    },wipe;
    function _run(rev){
      wipe.isGrouped=true;
      wipe.groups=wipe.groupCentrally(opts.rows,opts.cols);
      if(rev) {wipe.groups.reverse();}
      wipe.run();
    }
    return {
      pyramidInvertedCollapse:function(el){
        var endHeight=el.height();
        opts.to={height:endHeight + "px"};
        wipe=new factory(el,opts);
        _run();
      },
      pyramidCollapse:function(el){
        var endHeight=el.height();
        opts.to={height:endHeight + "px"};
        wipe=new factory(el,opts);
        _run(true);
      },
      pyramidInvertedGrow:function(el){
        var endHeight=el.height();
        opts=$.extend({
          from:{
            bottom:"0px",
            top:"auto"
          },
          to:{
            height:endHeight + "px"
          }
        },opts);
        wipe=new factory(el,opts);
        _run(true);
      },
      pyramidGrow:function(el){
        var endHeight=el.height();
        opts=$.extend({
          from:{
            bottom:"0px",
            top:"auto"
          },
          to:{
            height:endHeight + "px"
          }
        },opts);
        wipe=new factory(el,opts);
        _run();
      }
    };
  }

  //CSS3 animations - Experimental
  function css3s(){
    //check support first
    var thisBody = document.body || document.documentElement,
    thisStyle = thisBody.style,
    support=false;
    for (var i = ns.prefixes.length - 1; i >= 0; i--){
      var pf=ns.prefixes[i].charAt(0).toUpperCase() + ns.prefixes[i].substr(1);
      if(thisStyle[pf+(pf!=""?"T":"t")+"ransition"]!== undefined ){
        support=true;
        break;
      }
    };
    if(!support) return {};
    //end support
    var opts={
      cols:4,rows:4,
      isCss3:true,
    },wipe;
    function _run(shfl,rev){
      if(rev) {wipe.groups.reverse();}
      if(shfl) {wipe.groups.shuffle();}
      wipe.run();
    }
    return{
      css3_ZoomIn:function(el){
        opts.from=$.extend({"opacity":0},ns.prefixize("transform","scale(0.1)"));
        opts.to=$.extend({"opacity":1},ns.prefixize("transform","scale(1)"));
        wipe=new factory(el,opts);
        _run();
      },
      css3_ZoomOut:function(el){
        opts.from=$.extend({"opacity":0},ns.prefixize("transform","scale(1.5)"));
        opts.to=$.extend({"opacity":1},ns.prefixize("transform","scale(1)"));
        wipe=new factory(el,opts);
        _run();
      },
      css3_rotateIn:function(el){
        opts.from=$.extend({"opacity":0},ns.prefixize("transform","rotate(90deg)"));
        opts.to=$.extend({"opacity":1},ns.prefixize("transform","rotate(0)"));
        opts.cols=6;opts.rows=6;
        wipe=new factory(el,opts);
        _run();
      },
      css3_rotateOut:function(el){
        opts.layerOn=false;
        opts.from=$.extend({"opacity":1},ns.prefixize("transform","rotate(0)"));
        opts.to=$.extend({"opacity":0},ns.prefixize("transform","rotate(90deg)"));
        opts.cols=6;opts.rows=6;
        wipe=new factory(el,opts);
        _run();
      }
    }
  }

  ns.wipes=$.extend(ns.wipes,pyramids(),fromCenters(),diagonals(),css3s());
