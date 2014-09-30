$(document).ready(function (e) {

	loadTabHash();
});

$(window).on('hashchange', function (e) {

	loadTabHash();
});

// Control what happens once a tab has been toggled
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

	// Remove CSS marking class from all <li> elements in main navigation
	$('.glavno-meni .nav li').removeClass('active');

	// Remove CSS marking class from any element in a <section>
	$('section .active').removeClass('active');

	// Mark main navigation links when clicking on buttons
	$('.glavno-meni .nav').find('a[href="' + $(e.target).attr('href') + '"]').parent().addClass('active');

	// Add hash to location.hash
	location.hash = $(e.target).attr('href').substr(1);

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

// Check if location.hash is a hash and load a tab accordingly
function loadTabHash() {
	if (location.hash.substr(0, 1) === "#") {
		$("a[href='#" + location.hash.substr(1) + "']").tab("show");
	}

	// Show first tab if no hash set
	if (location.hash === '') {
		$("a[href='#" + $('.glavno-meni .nav a:first').attr('href').substr(1) + "']").tab("show");
	}
}