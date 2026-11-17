var goHome = function()
{
	console.log("unlock");
};


var validarEdad = function()
{
	if( parseInt($(".text_box").val()) > 17 )
	{
		$("#door_area").find(".base").addClass("animate");
		setTimeout(goHome, 1500);
	}
}

$(document).ready(function()
{
	$(".btn_send").on("click", function(){ validarEdad(); });
	$("body").on("click", function(){ $(".text_box").focus(); });
	$(".text_box").focus();
});

$(document).keyup(function(e)
{
	if( e.keyCode == 13 ) { validarEdad(); }
});

