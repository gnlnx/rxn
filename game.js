var canvas;
var ctx;
var balls = [];
var MAX_BALLS = 5;
var RADIUS = 3;
var FPS = 30;
var init = function() {
	console.log( 'init' );
	canvas = document.getElementById( 'game' );
	ctx = canvas.getContext( '2d' );
	for( idx = 0; idx < MAX_BALLS; idx++ ) {
		balls[ idx ] = {
			x: RADIUS + Math.random() * (canvas.width - RADIUS),
			y: RADIUS + Math.random() * (canvas.height - RADIUS),
			radius: RADIUS,
			xvel: 2 + Math.random() * 5,
			yvel: 2 + Math.random() * 5
		};
	}

	// mouse events
	canvas.addEventListener( 'click', function( e ) {
		console.log( e );
		ctx.beginPath();
		ctx.arc( e.x-2*RADIUS, e.y-2*RADIUS, 4 * RADIUS, 0, 2 * Math.PI, false );
		ctx.stroke();
		ctx.closePath();
	}, false );
}

var render = function() {
	//console.log( 'render' );
	// clear the screen
	canvas.width = canvas.width;
	for( idx = 0; idx < MAX_BALLS; idx++ ) {
		// update
		balls[idx].x += balls[idx].xvel;
		balls[idx].y += balls[idx].yvel;
		if( balls[idx].x + RADIUS > canvas.width ) {
			balls[idx].x = canvas.width - RADIUS;
			balls[idx].xvel *= -1;
		}
		if( balls[idx].x - RADIUS < 0 ) {
			balls[idx].x = RADIUS;
			balls[idx].xvel *= -1;
		}
		if( balls[idx].y + RADIUS > canvas.height ) {
			balls[idx].y = canvas.height - RADIUS;
			balls[idx].yvel *= -1;
		}
		if( balls[idx].y - RADIUS < 0 ) {
			balls[idx].y = RADIUS;
			balls[idx].yvel *= -1;
		}

		// draw
		ctx.beginPath();
		ctx.arc( 
			balls[idx].x, 
			balls[idx].y, 
			balls[idx].radius,
			0,
			2 * Math.PI,
			false
		);
		ctx.fill();
		ctx.closePath();
	}
}

window.onload = function() {
	init();
	setInterval( function() { 
		render(); 
	}, 1000/FPS );
}
