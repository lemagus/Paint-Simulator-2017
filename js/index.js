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

$('#drawMe').mousedown(function(evt){
	
	ligne = [];
	
	$('#drawMe').mousemove(function(evt){
		
		ctx.fillStyle = color;
		
		ctx.beginPath();
		ctx.arc(evt.offsetX,evt.offsetY, r, 0 , 2*Math.PI );
		ctx.closePath();
		ctx.fill();
		
		var p = {
			x: evt.offsetX,
			y: evt.offsetY,
			r: r
		};
		
		ligne.push(p);
	});

});

$('#drawMe').mouseup(function(){
	$('#drawMe').off('mousemove');
	historique.push(ligne);
});

$('.tools li').click(function(evt){
	color = $(this).data('color');
});

$('.stroke li').click(function(evt){
	r = $(this).data('radius');
});

$('.clear').click(function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});

$('.back').click(function(){
	
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