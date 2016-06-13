
jQuery(document).ready(function($){
    var $ACF_TAB,
    	$METABOX;

    $(window).load(function () {
		setTimeout(function(){
	    	$ACF_TAB = $('.acf-tab-wrap li');
	    	$METABOX = $('#meta_feature');
	    	$ACF_TAB.on('click', function(e) {
	    		e.preventDefault();
	    		if ($(this).find('a').text() == "Feature Content") $METABOX.css('display', 'block');
	    		else $METABOX.removeAttr('style');
	    	});
	    }, 500);
    });
});