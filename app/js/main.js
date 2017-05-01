var main = {};

main.WIDTH = 650;
main.HEIGHT = 750;

main.initCanvas = function() {
   	ropeMechanism.initMechanism(main.WIDTH, main.HEIGHT);
}

main.initSlider = function() {
	$("#angleSlider").change(function(evt) {
  		main.rotateBar(evt.target.value);
	});
}

main.rotateBar = function(angle) {
	ropeMechanism.rotateBar(angle);
}

window.onload = function(){
	main.initSlider();
	main.initCanvas();
}