'use strict';
$(document).ready(function (argument) {
	$('button#flushBtn').click(function(e) {
		var opts = {
			  lines: 9 // The number of lines to draw
			, length: 32 // The length of each line
			, width: 19 // The line thickness
			, radius: 44 // The radius of the inner circle
			, scale: 0.5 // Scales overall size of the spinner
			, corners: 1 // Corner roundness (0..1)
			, color: '#FFF' // #rgb or #rrggbb or array of colors
			, opacity: 0.3 // Opacity of the lines
			, rotate: 0 // The rotation offset
			, direction: 1 // 1: clockwise, -1: counterclockwise
			, speed: 1 // Rounds per second
			, trail: 90 // Afterglow percentage
			, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
			, zIndex: 2e9 // The z-index (defaults to 2000000000)
			, className: 'spinner' // The CSS class to assign to the spinner
			, top: '53%' // Top position relative to parent
			, left: '50%' // Left position relative to parent
			, shadow: false // Whether to render a shadow
			, hwaccel: false // Whether to use hardware acceleration
			, position: 'absolute' // Element positioning
		};
		var target = document.getElementById('spinner');
		var spinner = new Spinner(opts).spin(target);
		$('body').not("#spinner").css("filter","blur(2px)");
		$.ajax({
		  method: "POST",
		  url: window.location.origin + "/flushRedis/flush.php",
		  data: { sha: "12345" }
		})
		  .done(function( msg ) {
		  	spinner.stop();
		  	$('body').not("#spinner").css("filter","blur(0px)");
			swal(
			  'Done',
			  msg,
			  'success'
			);
		  })
		  .fail(function( msg ) {
		    spinner.stop();
		    $('body').not("#spinner").css("filter","blur(0px)");
		    swal(
			  'Fail',
			  'Error while flushing cache.',
			  'error'
			);
		  });

	});
});