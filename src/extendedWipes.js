  var ns=$.fn.wipeImages,factory=ns.wipeFactory;
  $.fn.wipeImages.wipes=$.extend($.fn.wipeImages.wipes,{

    diagTopLeft:function(el){
      var opts={
        cols:8,rows:4
      };
      var wipe=new factory(el,opts);
      wipe.groups=groupDiagonally(opts.rows,opts.cols);
      wipe.isGrouped=true;
      wipe.run();
    },
    diagTopRight:function(el){
      var opts={
        cols:8,rows:4
      };
      var wipe=new factory(el,opts);
      wipe.groups=groupDiagonally(opts.rows,opts.cols,true).reverse();
      wipe.isGrouped=true;
      wipe.run();
    },
    diagBottomRight:function(el){
      var opts={
        cols:8,rows:4
      };
      var wipe=new factory(el,opts);
      wipe.groups=groupDiagonally(opts.rows,opts.cols).reverse();
      wipe.isGrouped=true;
      wipe.run();
    },
    diagBottomLeft:function(el){
      var opts={
        cols:8,rows:4
      };
      var wipe=new factory(el,opts);
      wipe.groups=groupDiagonally(opts.rows,opts.cols,true);
      wipe.isGrouped=true;
      wipe.run();
    },
    fromCenter:function(el){
      var opts={
        cols:10,rows:1
      };
      var wipe=new factory(el,opts);
      wipe.groups=groupCentrally(opts.rows,opts.cols);
      wipe.isGrouped=true;
      wipe.run();
    },
    toCenter:function(el){
      var opts={
        cols:9,rows:1
      };
      var wipe=new factory(el,opts);
      wipe.groups=groupCentrally(opts.rows,opts.cols).reverse();
      wipe.isGrouped=true;
      wipe.run();
    }
  });
