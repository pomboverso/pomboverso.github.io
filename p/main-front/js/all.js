var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-49593543-1']);
_gaq.push(['_trackPageview']);
(function()
{
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

var dw; /* Document Width */
var dh; /* Document Height */
var kbp = 0;

/* Get Size of the Document */
function gsz(){
	dw = $(window).width()
	|| document.width
	|| document.documentElement.clientWidth
	|| document.innerWidth
	|| window.innerWidth
	|| screen.width;

	dh = $(window).height()
	|| document.height
	|| document.documentElement.clientHeight
	|| document.innerHeight
	|| window.innerHeight
	|| screen.height;
}

/* Centralización Vertical y Horizontal */
(function( $ ){
	$.fn.center = function( obj ) {
		obj.y = obj.y || 0;

		dh = $(window).height()
		|| document.height
		|| document.documentElement.clientHeight
		|| document.innerHeight
		|| screen.height
		|| window.innerHeight;

		var h = this.height();
		var py = ( ( dh / 2 ) - ( h / 2 ) ) + obj.y;

		this.stop().animate({ "top" : py }, 500);
		return this;
	};
})( jQuery );

/* Centralización Vertical y Horizontal */
(function( $ ){
	$.fn.centerXY = function( obj ) {
		obj.y = obj.y || 0;
		obj.x = obj.x || 0;

	dh = $(window).height()
		|| document.height
		|| document.documentElement.clientHeight
		|| document.innerHeight
		|| screen.height
		|| window.innerHeight;

	dw = $(window).width()
		|| document.width
		|| document.documentElement.clientWidth
		|| document.innerWidth
		|| window.innerWidth
		|| screen.width;

		var h = this.height();
		var w = this.width();

		var y2 = ( ( dh / 2 ) - ( h / 2 ) ) + obj.y;
		var x2 = ( ( dw / 2 ) - ( w / 2 ) ) + obj.x;

		this.stop().css({ "top" : y2, "left" : x2 });
		return this;
	};
})( jQuery );

/* obtener alto máximo */
(function( $ ){
	$.fn.getHeight = function( adelay, num ) {
		adelay = adelay || 0; /* animation delay */
		num = num || 1; /* divide */

		dh = $(window).height()
		|| document.height
		|| document.documentElement.clientHeight
		|| document.innerHeight
		|| screen.height
		|| window.innerHeight;

		dh /= num;

		this.stop().animate({ "height" : dh }, adelay);
		return this;
	};
})( jQuery );

$(document).keyup(function(e) {
	if( e.keyCode == 27 ) { 
		fkbp(1);
	} else { fkbp(0); }
});

$(window).mousemove(function() { fkbp(0); });
$(window).resize(function() { gsz(); fkbp(0); });
$(window).click(function() { fkbp(0); });

$(document).ready( function() {
	gsz();

	var kons = '\n';
	kons += '       d8888                                              888             \n';
	kons += '      d88888                                              888             \n';
	kons += '     d88P888                                              888             \n';
	kons += '    d88P 888  .d88b.  888  888  8888b.   .d8888b  8888b.  888888  .d88b.  \n';
	kons += '   d88P  888 d88P"88b 888  888     "88b d88P"        "88b 888    d8P  Y8b \n';
	kons += '  d88P   888 888  888 888  888 .d888888 888      .d888888 888    88888888 \n';
	kons += ' d8888888888 Y88b 888 Y88b 888 888  888 Y88b.    888  888 Y88b.  Y8b.     \n';
	kons += 'd88P     888  "Y88888  "Y88888 "Y888888  "Y8888P "Y888888  "Y888  "Y8888  \n';
	kons += '                  888                                                     \n';
	kons += '             Y8b d88P                                                     \n';
	kons += '              "Y88P"  \n';
	kons += '\n';
	console.log('%c ' + kons, 'color: #96c613');

});

function fkbp(bol){
	if(kbp == 5){ console.log("cd /var/www/html/Dropbox/avo/"); }

	if(bol == 1){ kbp += 1; } else { kbp = 0; }
}
