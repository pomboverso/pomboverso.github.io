var app = angular.module('css_app', ['ngCookies']);
app.controller('css_ctr', function(CSS_PROPERTIES, MAIN_VAR, $cookieStore)
{
	this.konsole = function()
	{
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
	}();

	this.property = CSS_PROPERTIES;

	this.study = $cookieStore.get('StudyList');

	if( this.study === undefined)
	{
		this.study = [];
	}

	this.addToArray = function(a)
	{
		var r = 0;
		obj = { data : a, check : 0 };

		for(k = 0; k <= this.study.length-1; k++)
		{
			if( this.study[k].data == a ){ r = 1; }
		}

		if( r == 0 )
		{
			this.study.push(obj);
			this.putCookie();
			swal(
			{
				title: "Added to study list",
				type: "success",
				showCancelButton: false,
				timer: 800,
				showConfirmButton: false
			});
		}
	}

	this.checkList = function(a)
	{
		this.study[a].check = !this.study[a].check;
		this.putCookie();
	}

	this.filter_vs = function(new_vs)
	{
		this.vs = new_vs;
		this.color = MAIN_VAR[new_vs].color;
		this.txt = MAIN_VAR[new_vs].text;
	};

	this.filter_vs( 'all' );

	this.is_check = function(check)
	{
		var ans = 0;
		ans = ((this.vs == check) || ('all' == this.vs)) ? 1 : 0;
		return ans;
	};
	
	this.putCookie = function()
	{
		$cookieStore.put('StudyList', this.study);
	};

	this.clearStudyList = function()
	{
		this.study = [];
		$cookieStore.put('StudyList', this.study);
		swal(
		{
			title: "The Board is Clean",
			type: "success",
			showCancelButton: false,
			timer: 800,
			showConfirmButton: false,
			allowEscapeKey: true,
			allowOutsideClick: true
		});
	};

});