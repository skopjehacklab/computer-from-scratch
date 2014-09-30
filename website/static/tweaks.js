$(document).ready(function () {

	var url = document.location.toString();

	// Enable automatic tab toggling according to URL
	if (url.match('#')) {
		$('.glavno-meni .nav a[href=#' + url.split('#')[1] + ']').tab('show');
	}

});

// Control what happens once a tab has been toggled
$(document).on('shown.bs.tab', function (event) {

	// Remove CSS marking class from all <li> elements in main navigation
	$('.glavno-meni .nav li').removeClass('active');

	// Remove CSS marking class from any element in a <section>
	$('section .active').removeClass('active');

	// Mark main navigation links when clicking on buttons
	$('.glavno-meni .nav').find('a[href="' + $(event.target).attr('href') + '"]').parent().addClass('active');

	// Add hash to window.location
	window.location.hash = $(event.target).attr('href');

	// Remove hash if loading the first tab through the main navigation
	if (window.location.hash === $('.glavno-meni .nav a:first-child').attr('href')) {
		window.location.hash = '';
	}

	if ($('#haklab-kika').hasClass('active')) {

		// Redraw Google map due to a strange resetting behavior on tab switch
		$('#haklab-kika-mapa').attr('src', $('#haklab-kika-mapa').attr('src'));
	}

	// Scroll to page top - this makes sure tabs with a lot of content are not shown from the position of their container
	window.scrollTo(0, 0);

	// Hide non-collapsed main navigation
	$('#glavno-meni-toggle').collapse('hide');

});