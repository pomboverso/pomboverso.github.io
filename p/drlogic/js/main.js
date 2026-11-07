(function ($) {
	"use strict";

	var page = $("body").data("page") || "home";

	var PAGE_COLORS = {
		"home": ["blue", "olive"],
		"about-us": ["red", "yellow"],
		"portfolio": ["cyan", "purple"],
		"contact-us": ["orange", null]
	};

	var pointer = null;

	function setSection() {
		var colors = PAGE_COLORS[page];

		if (colors) {
			$("#nav").addClass(colors[0]);
			if (colors[1]) {
				$("section.call-us").addClass(colors[1]);
			}
		}

		$('#nav a.nav-link[data-page="' + page + '"]')
			.append("<span class='sr-only'>(current)</span>")
			.parent()
			.addClass("active");
	}

	function parallax() {
		if (!pointer) {
			return;
		}

		if (page === "home") {
			$("#home .wireframe").css("bottom", -50 + (pointer.y + pointer.x) * 0.01);
		} else if (page === "about-us") {
			var pointX = $(window).width() < 500 ? 75 : 0;
			$("img.base").css("left", pointX + pointer.y * 0.009);
			$("img.manager").css("left", 200 + pointer.y * -0.05);
		}
	}

	function pixelModal() {
		var modals = $(".pixel-modal");

		$(".close-pixel-modal").on("click", function () {
			modals.fadeOut(500);
		});

		$(".active .open-pixel-modal").on("click", function () {
			$(this).parent().parent().find(".pixel-modal").fadeIn(500);
		});
	}

	function mapFocus() {
		$("#map")
			.on("click", function () { $(this).addClass("is-active"); })
			.on("mouseleave", function () { $(this).removeClass("is-active"); });
	}

	function smoothScroll() {
		$('a[href*="#"].smooth').on("click", function () {
			var samePage = location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") &&
				location.hostname === this.hostname;
			var target = $(this.hash);

			if (samePage && target.length) {
				$("html, body").animate({ scrollTop: target.offset().top }, 1000);
				return false;
			}
		});
	}

	$(window).on("mousemove", function (e) {
		pointer = { x: e.pageX, y: e.pageY };
		parallax();
	});

	$(window).on("resize", parallax);

	$(smoothScroll);

	$(window).on("load", function () {
		$("aside.loader").fadeOut(500);
		$("html, body").addClass(page);

		setSection();
		pixelModal();
		mapFocus();

		$(".fix-text").mCustomScrollbar({ theme: "rounded-dots" });
	});
})(jQuery);
