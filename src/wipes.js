(function($){
	//interface method for various wipes to extend
	var wipefactory=function(el){
		this.numSlices=10;
		this.orientation="vertical"; // or horizontal
		this.easing="easeTo";
		this.initialVisibility=false;
		this.alignSlices="top"; //or left or right or bottom;
		
		this.ns=$.fn.wipeImages;
		this.el=el;
		this.playground=$(el).find(".imageWipe_overlay");
	};
	wipefactory.prototype._createInner=function(){
		var inner=$("<div class='imageWipe_inner'></div>").css({
			position:"relative",
			width:this.ns.config.viewportWidth,
			height:this.ns.config.viewportHeight,
			display:"none"
		});
		this.playground.append(inner);
		return inner;
	};
	wipefactory.prototype.createSlices=function(){
		var slices=[];
		if(this.orientation=="vertical"){
			for(var i = 0; i < this.numSlices; i++){
				var sliceWidth = Math.round(this.ns.config.viewportWidth/this.numSlices);
				if(i == this.numSlices-1){
					slices.push('<div class="imageWipe_slice" \
							style="display:none;position:absolute;left:'+
							(sliceWidth*i)+'px;width:'+
							(this.ns.config.viewportWidth-(sliceWidth*i))+'px'+
							'background:url('+ vars.currentImage.attr('src') +
							') no-repeat -'+ ((sliceWidth + (i * sliceWidth)) - sliceWidth) +'px 0%'"></div>');
				}else{
					slices.push('<div class="imageWipe_slice" \
							style="display:none;position:absolute;left:'+
							(sliceWidth*i)+'px;width:'+
							sliceWidth+'px'+
							'background:url('+ vars.currentImage.attr('src') +
							') no-repeat -'+ ((sliceWidth + (i * sliceWidth)) - sliceWidth) +'px 0%'"></div>');
				}
			}
		}else if(this.orientation=="horizontal"){
			for(var i = 0; i < this.numSlices; i++){
				var sliceHeight = Math.round(this.ns.config.viewportHeight/this.numSlices);
				if(i == this.numSlices-1){
					slices.push('<div class="imageWipe_slice" \
							style="display:none;position:absolute;top:'+
							(sliceHeight*i)+'px;height:'+
							(this.ns.config.viewportHeight-(sliceHeight*i))+
							'px'+
							'background:url('+ vars.currentImage.attr('src') +
							') no-repeat 0% -'+ ((sliceHeight + (i * sliceHeight)) - sliceHeight) +'px'"></div>');
				}else{
					slices.push('<div class="imageWipe_slice" \
							style="display:none;position:absolute;top:'+
							(sliceHeight*i)+'px;height:'+
							sliceHeight+'px'+
							'background:url('+ vars.currentImage.attr('src') +
							') no-repeat 0% -'+ ((sliceHeight + (i * sliceHeight)) - sliceHeight) +'px'"></div>');
				}
			}
		}
		
		return slices.join("");
	};
	wipefactory.prototype.positionSlices=function(){
		var slices=$(this.el).find(".imageWipe_slice");
		switch(this.alignSlices){
			case "left":
				slices.css({left:"0px"});
			break;
			case "right":
				slices.css({right:"0px"});
			break;
			case "bottom":
				slices.css({bottom:"0px"});
			break;
			case "top":
				slices.css({top:"0px"});
			break;
		}
	}
	wipefactory.prototype.setup=function(){
		var inner=this._createInner();
		inner.append(this.createSlices());
		this.positionSlices();
		inner.show(0);
	};
	wipefactory.prototype.teardown=function(){
		this.playground.empty();
	};
	wipefactory.prototype.play=function(){
		
	};
	
	// the built in wipes themselves
	$.fn.wipeImages.wipes={
		verticalStrips:function(el){
			var wipe=new wipefactory(el);
			wipe.setup();
			wipe.play();
			wipe.teardown();
		},
		horizontalStrips:function(el){
			
		},
		topBottomWipe:function(el){
			
		},
		bottomTopWipe:function(el){
			
		},
		leftRightWipe:function(el){
			
		},
		rightLeftWipe:function(el){
			
		}
	}
	
})(jQuery);