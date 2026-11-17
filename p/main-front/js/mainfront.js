Array.prototype.indexOf = function(obj, start)
{
	for (var i = (start || 0), j = this.length; i < j; i++)
	{
		if (this[i] === obj) { return i; }
	}
	return -1;
}

var gsize = function()
{
	$("#ww").html(dw);
	$("#hh").html(dh);
	$("#aspect").html((dw/dh).toFixed(2));
}

var isEmpty = function(val)
{
	return (val === undefined || val == null || val.length <= 0) ? true : false;
}

var rtn = function()
{
	$(".bx1").stop().slideDown(700);
	$("section, h2").not(".bx1").stop().slideUp(700);
	$("body").css({backgroundColor:"rgb(33, 224, 167)"});
	$("#return").animate({top:-80},500);
}

var showView = function(id, color)
{
	$("section").not(id).stop().slideUp(700);
	$(id).stop().slideDown(700);
	$("body").css({backgroundColor:color});
	$("#return").animate({top:0},500);
}

var asciiCode = function()
{
	showView(".bx3", "#4d4d4d");
}

var ruler = function()
{
	showView(".bx2", "#edcc0a");
}

$(document).keyup(function(e)
{
	if (e.keyCode == 27) {
		rtn();
	}
});

$(document).ready(function()
{
	gsize();
	var m = "";
	for( var i in obj )
	{

		( function( o )
		{
			if( !( typeof o.titulo === 'undefined' ) )
			{
				m = "";
				m += "<a href=\"" + o.url + "\" class=\"element fa " + o.icono + "\" target=\"" + o.target+"\">";
				m += "<h3>" + o.titulo + "</h3>";
				m += "</a>";
				$( m ).appendTo( "#mainBox" );
			}
		})( obj[ i ] );
	}

	$("#return").on("click", function()
	{
		rtn();
	});

	$(".fix input").on("click", function() {
		$(".fix").stop().fadeOut(700);
	});

		for(k=0; k<=255; k++) {
			s = code[k] || "";
			s7 = "&amp;#" + k + ";";
			s8 = s != "" ? "&amp;" + s + ";" : "";
			s6 = "<b>"+s7+"</b> "+s8;
			s2 = "&#" + k + ";";
			s3 = "";
			s4 = nameAscii[k] || "";
			s5 = "";

			if(block.indexOf(k) > -1){
				s6 = s8 + " " + s4;
				s2 = "&amp;#" + k + ";";
				s3 = " special"
			}

			if(emp.indexOf(k) > -1){
				s5 = " empty";
				s6 = "Empty";
			}

			m = "";
			m += "<div class=\"element" + s5 + "\">";
			m += "<h3 class=\"tit" + s3 + "\">" + s2 + "</h3>";
			m += "<hr>";
			m += "<h4>" + s6 + "</h4>";
			m += "</div>";
			$( m ).appendTo( "#asciiBox" );
		}
});

$(window).resize(function(){ gsize(); });
$(window).load(function(){ gsize(); });