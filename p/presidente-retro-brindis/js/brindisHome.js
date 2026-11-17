$(window).load(function()
{
	$(".cover").slideUp(500);
});

$(document).ready(function()
{
	$(".vdGallery").click(function() {
		$.fancybox({
			'padding'		: 0,
			'autoScale'		: false,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none',
			'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
			'type'			: 'swf',
			'swf'			: {
			'wmode'				: 'transparent',
			'allowfullscreen'	: 'true'
			}
		});
		return false;
	});

	var btn =
	{
		up: $(".btnController.btn_up"),
		down: $(".btnController.btn_down"),
		right: $(".btnController.btn_right"),
		left: $(".btnController.btn_left"),

		zIn: $(".btnController.btn_zoom_in"),
		zOut: $(".btnController.btn_zoom_out"),

		rotLeft: $(".btnController.btn_rotate_left"),
		rotRight: $(".btnController.btn_rotate_right"),

		next: $(".btn_next"),
	}, img = $(".profile"), rotZ = 0, mov = 5;

	/* --------- controladores --------- */

	btn["up"].click(function()
	{
		var newValue = (parseInt(img.css("top")) - mov) + "px";
		img.css("top", newValue);
	});

	btn["down"].click(function()
	{
		var newValue = (parseInt(img.css("top")) + mov) + "px";
		img.css("top", newValue);
	});

	btn["right"].click(function()
	{
		var newValue = (parseInt(img.css("left")) + mov) + "px";
		img.css("left", newValue);
	});

	btn["left"].click(function()
	{
		var newValue = (parseInt(img.css("left")) - mov) + "px";
		img.css("left", newValue);
	});

	btn["zIn"].click(function()
	{
		var newValue = (parseInt(img.css("width")) + mov) + "px";
		img.css("width", newValue);
	});

	btn["zOut"].click(function()
	{
		var newValue = (parseInt(img.css("width")) - mov) + "px";
		img.css("width", newValue);
	});

	btn["rotLeft"].click(function()
	{
		rotZ -= 5;
		img.rotate(rotZ);
	});

	btn["rotRight"].click(function()
	{
		rotZ += 5;
		img.rotate(rotZ);
	});

	/* --------- controladores --------- */

	btn["next"].click(function()
	{
		var obj = $("#mainSite").find("section.active");
		obj.removeClass("active");
		obj.next().addClass("active");
		
	});

});