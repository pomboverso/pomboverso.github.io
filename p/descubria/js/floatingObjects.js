function cursorXY(w)
{
	var fobj = [
		".planes.p01",
		".planes.p02",
		".planes.p03"
	];


	if (!w) var w = window.event;
	if (w.pageX || w.pageY || w.clientX || w.clientY || w.pageXOffset || w.pageYOffset){
		var cx = w.pageX || w.clientX || w.pageXOffset;
		var cy = w.pageY || w.clientY || w.pageYOffset;
	}

	$(fobj[0]).css({"left" : ((cx*0.04)), "top" : (0 + (cy*-0.05))});
	$(fobj[1]).css({"right" : ((cx*-0.02)), "top" : (0 + (cy*0.07))});
	$(fobj[2]).css({"right" : ((cx*0.02)), "top" : (0 - (cy*0.03))});

}

$(window).mousemove(function(e) { cursorXY(e); });
$(window).resize(function(e) { cursorXY(e); });
$(window).load(function(e){
	$("aside.cover").slideUp(1000);
	cursorXY(e);

	var navigation = $("nav");
	navigation.find("ul li button").on("click", function(e){
		newClass = e.currentTarget.className;
		$("body")[0].className = newClass;
	});

	$("nav.hour").on("click", function(){
		$(this).toggleClass("on");
	});

});
