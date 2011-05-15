(function($){
   function box2D(r,c,rev){
      var grouped=[],arr=[],b=0;
      
      for(var i = 0; i < r; i++) {
        arr[i] = new Array(c);
        for(var j = 0; j < c; j++) {
            arr[i][j] = b;
            b++;
        }
      }
      
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


  var ns=$.fn.wipeImages,factory=ns.wipeFactory;
  $.fn.wipeImages.wipes=$.extend($.fn.wipeImages.wipes,{
    
    diagTopLeft:function(el){
      var opts={
        cols:8,rows:4
      };
      var wipe=new factory(el,opts);
      wipe.groups=box2D(opts.rows,opts.cols);
      wipe.isGrouped=true; 
      wipe.run();
    },
    diagTopRight:function(el){
      var opts={
        cols:8,rows:4
      };
      var wipe=new factory(el,opts);
      wipe.groups=box2D(opts.rows,opts.cols,true);
      wipe.isGrouped=true; 
      wipe.run();
    },
    diagBottomRight:function(el){
      var opts={
        cols:8,rows:4
      };
      var wipe=new factory(el,opts);
      wipe.reverse();
      wipe.groups=box2D(opts.rows,opts.cols);
      wipe.isGrouped=true;   
      wipe.run();
    },
    diagBottomLeft:function(el){
      var opts={
        cols:8,rows:4
      };
      var wipe=new factory(el,opts);
      wipe.reverse();
      wipe.groups=box2D(opts.rows,opts.cols,true);
      wipe.isGrouped=true;   
      wipe.run();
    }   
  });
})(jQuery);
