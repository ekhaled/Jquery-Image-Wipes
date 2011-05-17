
  var ns=$.fn.wipeImages,factory=ns.wipeFactory;

  //Diagonal Fade Animations
  function diagonals(){
    var opts={
      cols:8,rows:4
    },wipe;
    function _run(wipe,rev1,rev2){
      wipe.isGrouped=true;
      wipe.groups=groupDiagonally(opts.rows,opts.cols,rev1);
      if(rev2) {wipe.groups.reverse();}
      wipe.run();
    }
    return {
      diagTopLeft:function(el){
        wipe=new factory(el,opts);
        _run(wipe);
      },
      diagTopRight:function(el){
        wipe=new factory(el,opts);
        _run(wipe,true,true);
      },
      diagBottomRight:function(el){
        wipe=new factory(el,opts);
        _run(wipe,false,true);
      },
      diagBottomLeft:function(el){
        wipe=new factory(el,opts);
        _run(wipe,true,false);
      }
    };
  }

  ns.wipes=$.extend(ns.wipes,diagonals());

  //From Center Fade Animations
  function fromCenters(){
    var opts={
      cols:10,rows:1
    },wipe;
    function _run(wipe,rev){
      wipe.isGrouped=true;
      wipe.groups=groupCentrally(opts.rows,opts.cols);
      if(rev) {wipe.groups.reverse();}
      wipe.run();
    }
    return {
      fromCenter:function(el){
        wipe=new factory(el,opts);
        _run(wipe);
      },
      toCenter:function(el){
        opts.cols=9;
        wipe=new factory(el,opts);
        _run(wipe,true);
      }
    };
  }

  ns.wipes=$.extend(ns.wipes,fromCenters());

  //pyramid animations
  function pyramids(){
    var opts={
      cols:19,rows:1,
      from:{
        height:"0px"
      }
    },wipe;
    function _run(wipe,rev){
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
        _run(wipe);
      },
      pyramidCollapse:function(el){
        var endHeight=el.height();
        opts.to={height:endHeight + "px"};
        wipe=new factory(el,opts);
        _run(wipe,true);
      },
      pyramidInvertedGrow:function(el){
        var endHeight=el.height();
        opts=$.extend(opts,{
          from:{
            height:"0px",
            bottom:"0px",
            top:"auto"
          },
          to:{
            height:endHeight + "px"
          }
        });
        wipe=new factory(el,opts);
        _run(wipe,true);
      },
      pyramidGrow:function(el){
        var endHeight=el.height();
        opts=$.extend(opts,{
          from:{
            height:"0px",
            bottom:"0px",
            top:"auto"
          },
          to:{
            height:endHeight + "px"
          }
        });
        wipe=new factory(el,opts);
        _run(wipe);
      }
    };
  }

  ns.wipes=$.extend(ns.wipes,pyramids());
