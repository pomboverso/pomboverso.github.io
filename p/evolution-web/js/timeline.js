var npag = $("section").length || 76;

function vcent(o,k){
	var dhm = dh - k;
	var h = $(o).height();
	var f = (dhm/2)-(h/2);
	$(o).stop().animate({ "top" : f }, 1000 );
	return 0;
}

function gsize(){
var dwm = ( dw > 1505 ) ? dw : (dw + 100);
	$("body, html, #bk, #texture").stop().css({ "width" : ( 1500 * npag ) } );
	$(".mt1, mt2").stop().css({ "top" : "auto" } );

	var kk = dh * 0.2;

	$("h2").center({y : -(dh * 0.7)/2});
	$("article").center({y : -(dh * 0.28)/2});
	$(".t02").center({y : -(dh * 0.15)/2});

	$("body, html").css({ height: window.innerHeight });
}

/* ------------------ JQuery ------------------ */

$(window).resize( function() {
	gsize();
});

$(window).load( function(){
	$("#cover").fadeOut(1000);
	$("#menu").fadeIn(1000);
});

$(document).ready( function(){

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollLeft: target.offset().left
        }, 1000);
        return false;
      }
    }
  });

	gsize();

	$("body").mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 150);
		event.preventDefault();
	});

	$.stellar({
		horizontalScrolling: true,
		verticalScrolling: false,
		horizontalOffset: 0,
		verticalOffset: 0,
		parallaxBackgrounds: true,
		parallaxElements: true,
		hideDistantElements: true,
		responsive: true
	});

});