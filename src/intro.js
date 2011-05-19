(function($){

  var wipeImages=function(opts){
    var config=$.extend(namespace.config,opts),
    pausePlaying=false,
    wipeImages={};

    config.animating=false;// flag to check if animation is running
    config.className=config.className || "wipebox";// make sure a class name is set
