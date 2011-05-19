(function($){
  var namespace = $.fn.wipeImages = function(opts){
    var config=$.extend(namespace.config,opts),
    pausePlaying=false,
    wipes=namespace.wipes,wipeImages={},wipeString=[];

    config.animating=false;// flag to check if animation is running
    config.className=config.className || "wipebox";// make sure a class name is set

    for(var k in wipes){
      wipeString.push(k);
    };
