var objAnimated = [
	"#newFriends",
	"#oldFriends",
	"#notFriends"
];

var whenEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

$(window).scroll( function(event)
{
	var y = $(this).scrollTop();

	for(var k = 0; k < objAnimated.length; k++)
	{
		var obj = $(objAnimated[ k ]).find(".mainTitle").offset().top - 300;
		if ( ( y >= obj ) && ( y < ( obj + 200 ) ) )
		{
			$(objAnimated[ k ])
			.find(".mainTitle")
			.addClass("animated swing")
			.one(whenEnd, function()
			{
				$(this).removeClass("animated swing");
			});
		}
	}
});