(function($){
	$.fn.wipeImages=function(config){
		init.apply(this,arguments);
	};
	
	
	function init(config){
		$.fn.wipeImages.config=$.extend(config,$.fn.wipeImages.config);
		setup(this);
	}
	
	function setup(els){
		els.each(function(){
			var _this=this;
			//find all images in this
			var $imgs=$("img:visible",_this)
			.css({ // position the images
				position:"absolute",
				width:"100%",
				height:"100%"
			});
			//set up height, width and position of parent
			$(_this).css({
				width:$.fn.wipeImages.config.viewportWidth + "px",
				height:$.fn.wipeImages.config.viewportHeight + "px",
				position:"relative"
			})
			.empty() //clear all contents
			.append($imgs) // add the filtered images
			.children(":gt(0)").hide() //hide all except the first one
			.end()
			.append("<div class='imageWipe_overlay' style='position:absolute;width:100%;height:100%'></div>");
			//add overlay div and position it
		});
	}
	
	$.fn.wipeImages.config={ // configuration object
		viewportWidth:600, // width of the viewport in px
		viewportHeight:400, // height of the viewport in px
		useWipes:"random", // accepts "random" or array of wipes e.g ["verticalStrips","rightLeftWipe"]
		delay:500, // delay between wipes
		duration:300, //duration of individual wipes
		autoPlay:true
	};


	
})(jQuery);