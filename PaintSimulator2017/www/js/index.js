var resizeCanvas = function(){
	$('#drawMe').attr('width', $(window).width());
	$('#drawMe').attr('height', $(window).height());
}

$(window).resize(resizeCanvas);
resizeCanvas();

var canvas = $('#drawMe').get(0);
var ctx = canvas.getContext('2d');

var color = '#000000';
var r = 5;

var historique = [];
var ligne = [];

$('#drawMe').on('touchstart', function(evt){
	ligne = [];
	console.log(evt.touches);
});

$('#drawMe').on('touchmove', function(evt){
	
	for (i = 0; i < evt.touches.length; i++) {
	
		var touch = evt.touches[i];
		
		ctx.fillStyle = color;
		
		ctx.beginPath();
		ctx.arc(touch.clientX,touch.clientY, touch.radiusX, 0 , 2*Math.PI );
		ctx.closePath();
		ctx.fill();
		
		var p = {
			x: touch.clientX,
			y: touch.clientY,
			r: touch.radiusX
		};
		
		ligne.push(p);
	}
});

$('#drawMe').on('touchend', function(){
	$('#drawMe').off('mousemove');
	historique.push(ligne);
});

$('.tools li').on('touchstart', function(evt){
	color = $(this).data('color');
});

$('.stroke li').on('touchstart', function(evt){
	r = $(this).data('radius');
});

$('.clear').on('touchstart', function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});

$('.back').on('touchstart', function(){
	
	var derniereLigne = historique.pop();
	
	for(var i in derniereLigne) {
		var point = derniereLigne[i];
		
		ctx.fillStyle = '#FFFFFF';
		ctx.beginPath();
		ctx.arc(point.x,point.y, point.r + 1, 0 , 2*Math.PI );
		ctx.closePath();
		ctx.fill();
	}
});