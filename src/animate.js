(function($){
	
	//simplified animate function
	$.fn.wipeImages.animate=function(func,opts){
		var start = +new Date;
		var dur = opts.duration||200;
		var finish = start+dur;
		var interval;
		var easing=opts.easing ? $.fn.wipeImages.easing[opts.easing] : function(pos){ return (-Math.cos(pos*Math.PI)/2) + 0.5; };
		interval=setInterval(function(){
			var time = +new Date, pos = time>finish ? 1 : (time-start)/dur;
			func(easing(pos));
			if(time>finish) { clearInterval(interval); opts.after && opts.after(); }
		},10);
	}
	
})(jQuery);