
  }

  $.fn.wipeImages.config={
  	animations:"random", // accepts "random" or wipe name as string  e.g "verticalStrips" or wipe names as array eg ["fade","someOtherWipe"]
  	autoPlay:true,
  	delay:5000,
  	duration:400,// duration of animation
  	easing:"swing",
  	pauseOnHover:false, // pauses the animation when mouse is hovered
  	className:"wipebox" // the class name applied to all appended boxes
  }

})(jQuery);
