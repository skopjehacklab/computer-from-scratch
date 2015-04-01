$(document).ready(function () {

	// Detect IE and apply a few more CSS rules for the inline SVG and its container and show a disclamer
	if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
		$('.flip-flop-illustration').css({
			'position': 'relative',
			'padding-bottom': '60%'
		});

		$('.flip-flop-illustration svg').css({
			'position': 'absolute',
			'display': 'block',
			'top': '0',
			'left': '0'
		});

		$('<div class="text-center p-left-lg p-right-lg"><span class="">Оваа илустрација е интерактивна, но бидејќи вашиот прелистувач ја нема потребната поддршка за <abbr title="Scalable Vector Graphics">SVG</abbr>, најверојатно нема да работи како што сме предвиделе.</span></div>').appendTo('#pocetna .col-md-7');
	}

	// Jump on a tab based on anchor; for page reloads or links
	if (document.location.hash) {
		$('a[href=' + document.location.hash + ']').tab('show');
	}

	// Update hash based on tab, basically restores browser default behavior to fix Bootstrap tabs
	$(document.body).on("click", "a[data-toggle]", function () {
		document.location.hash = this.getAttribute("href");
	});

});

// On history back activate the tab of the document.location.hash if exists or the default tab if no hash exists
$(window).on('hashchange', function () {
	var anchor = document.location.hash || $("a[data-toggle=tab]").first().attr("href");
	$('a[href=' + anchor + ']').tab('show');
});

// Control what happens once a tab has been toggled
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

	// Remove CSS marking class from all <li> elements in main navigation
	$('.glavno-meni .nav li').removeClass('active');

	// Remove CSS marking class from any element in a <section>
	$('section .active').removeClass('active');

	// Mark main navigation links when clicking on buttons
	$('.glavno-meni .nav').find('a[href="' + $(e.target).attr('href') + '"]').parent().addClass('active');

	if ($('#haklab-kika').hasClass('active')) {

		// Redraw Google map due to a strange resetting behavior on tab switch
		$('#haklab-kika-mapa').attr('src', $('#haklab-kika-mapa').attr('src'));
	}

	// Hide non-collapsed main navigation below certain width and if main navigation visible
	if ($(window).width() <= 768 || $('#glavno-meni-toggle').hasClass('in')) {
		$('#glavno-meni-toggle').removeClass('in');
	}

	// Scroll to page top - this makes sure tabs with a lot of content are not shown from the position of their container
	window.scrollTo(0, 0);

});