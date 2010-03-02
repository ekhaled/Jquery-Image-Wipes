(function($){
	$.fn.wipeImages=function(config){
		init.apply(this,arguments);
	};
	
	
	function init(config){
		$.fn.wipeImages.config=$.extend(config,$.fn.wipeImages.config);
		setupCss(this);
	}
	
	function setupCss(els){
		els.each(function(){
			var _this=this;
		});
	}
	
	$.fn.wipeImages.config={ // configuration object
		viewportWidth:"300px", // width of the viewport
		viewportHeight:"300px", // height of the viewport
		useWipes:"random", // accepts "random" or array of wipes e.g ["verticalStrips","rightLeftWipe"]
		delay:500, // delay between wipes
		duration:300 //duration of individual wipes
	};


	
})(jQuery);