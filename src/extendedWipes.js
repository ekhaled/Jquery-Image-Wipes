
  var ns=$.fn.wipeImages,factory=ns.wipeFactory;

  //Diagonal Fade Animations
  function diagonals(){
    var opts={
      cols:8,rows:4
    },wipe;
    function _run(rev1,rev2){
      wipe.isGrouped=true;
      wipe.groups=groupDiagonally(opts.rows,opts.cols,rev1);
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
      wipe.groups=groupCentrally(opts.rows,opts.cols);
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
      wipe.groups=groupCentrally(opts.rows,opts.cols);
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

  ns.wipes=$.extend(ns.wipes,pyramids(),fromCenters(),diagonals());
