function parallax() {
	var scrollPosition = $(window).scrollTop();
	$('#parallax').css('top',(72 - (scrollPosition * 0.3))+'px' ); // bg image moves at 30% of scrolling speed
}

$(document).ready(function() {

	/* ========== PARALLAX BACKGROUND ========== */

	$(window).on('scroll', function(e) {
		parallax();
	});



	/* ========== FITVIDS PLUGIN ========== */
	
	$('.fitvids').fitVids();



	/* ========== BOOTSTRAP CAROUSEL ========== */

	$('.carousel').carousel({
	  interval: 4000
	});



	/* ========== CONTACT FORM ========== */

    $("#contact-form").submit(function() {
    	$('.form-control', $("#contact-form")).attr('readonly', true);
    	$('#btnSend').attr('disabled', true).data('orig', $('#btnSend').html()).html('Sending ...');

		var str = $(this).serialize();
		$.ajax({
			type: "POST",
			url: "/html/contactus",
			data: str,
			success: function(msg) {
				$('.form-control', $("#contact-form")).attr('readonly', false);
		    	$('#btnSend').attr('disabled', false).html($('#btnSend').data('orig'));

				if(msg.success) {
					err = $('<div class="alert alert-success">您的邮件已经发送成功了哦～</div>');
					$("#contact-form").hide();
					setTimeout("location.reload(true);",7000);
			  	} else {
			  		var err = $('<div class="alert alert-error"></div>');
			  		for (var i = 0; i < msg.errors.length; i++) {
			  			var errmsg = '<p>';
			  			if(msg.errors[i].label) {
			  				errmsg += '<strong>' + msg.errors[i].label + '</strong> ';
			  			}
			  			errmsg += msg.errors[i].message;
			  			errmsg += '</p>';

			  			err.append(errmsg);
			  		};
			  	}
			  	$('#contact-error').html('').append(err);
		    }
		});
		return false;
	});



	/* ========== SMOOTH SCROLLING BETWEEN SECTIONS ========== */

	$('[href^=#]').not('.carousel a, .panel a, .modal-trigger a').click(function (e) {
	  e.preventDefault();
	  var div = $(this).attr('href');

	  if ($(".navbar").css("position") == "fixed" ) {
		  $("html, body").animate({
		    scrollTop: $(div).position().top-$('.navbar').height()
		  }, 700, 'swing');
		} else {
			$("html, body").animate({
		    scrollTop: $(div).position().top
		  }, 700, 'swing');
		}
	});


	

	/* =========== CUSTOM STYLE FOR SELECT DROPDOWN ========== */

	$("select").selectpicker({style: 'btn-hg btn-primary', menuStyle: 'dropdown'});

	// style: select toggle class name (which is .btn)
	// menuStyle: dropdown class name

	// You can always select by any other attribute, not just tag name.
	// Also you can leave selectpicker arguments blank to apply defaults.



	/* ========== TOOLTIPS & POPOVERS =========== */

	$("[data-toggle=tooltip]").tooltip();

	$('.popover-trigger').popover('hide');




});