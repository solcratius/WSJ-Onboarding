
'use strict';

var ONBOARDING = ONBOARDING || {};

(function() {

	ONBOARDING.namespace = function(nsString) {

	    var parts 	= nsString.split( '.' ),
	        parent 	= ONBOARDING,
	        i;

	    if ( parts[0] === 'ONBOARDING' ) {
	    	parts = parts.slice(1);
	    }

	    for ( i = 0; i < parts.length; i += 1 ) {
	    	if ( typeof parent[ parts[i] ] === 'undefined' ) {
	        	parent[ parts[i] ] = {};
	      	}
	      	parent = parent[ parts[i] ];
	    }

	    return parent;
	};
}());


//-----------------------------------------------------------------------------------------------
ONBOARDING.namespace( 'controller' );
ONBOARDING.namespace( 'main' );
ONBOARDING.namespace( 'main.landing' );
ONBOARDING.namespace( 'main.nav' );




ONBOARDING.controller = (function() {

  	var init = function init() {
  		handlers();
  		
    	var doc = document.documentElement;
    	doc.setAttribute('data-useragent', navigator.userAgent);
	};

    function handlers() {
    	jQuery(window).load(function() {
    		ONBOARDING.main.nav.init();
    		ONBOARDING.main.landing.init();
    		ONBOARDING.main.init();
    	});
    };

	return {
		init: init
	};

})();




ONBOARDING.main = (function($) {
	var OBJ_NAV,
		OBJ_SECT;
	
	var $WIN = $(window),
		$HTML = $('html'),
		$UTILNAV,
		$UTIL_HEADER,
		$HEADER,
		$MASTHEAD,
		$BACKTOP_BTN,
		$NAV,
		$PROD_BTN,
		$PROD_INTRO,
		$PROD_CONTENT,
		$INTROTEXT_LANDING,
		$PARTNERLOGO_LANDING,
		$DETAIL_ARROW,
		$MAIN_CONTENT,
		$STRIPNAV,
		$STRIP_BTN,
		$DETAIL_CONTENT,
		$CONTENT_MARQUEE,
		$CONTENT_DETAIL,
		$CONTENT_BOTTOM,
		$APPSTORE_BTN,
		$CONTACT_BAR,
		$FOOTER;

	var winW,
		winH,
		curProd,
		totalProd,
		mobileView,
		touchEnable,
		uiState, //0: first time, 1: main sections, 2: detail sections
		mobileAnchorY = [],
		pageData = [],
		myDomain;

	var headerH,
		navTop,
		bottomH,
		is_firefox;

  	var init = function init() {
  		OBJ_NAV = ONBOARDING.main.nav;
  		OBJ_SECT = ONBOARDING.main.landing;

  		myDomain = $('h1 a').attr('href');
  		if (myDomain.substr(myDomain.length - 1) != "/") myDomain += "/";

  		is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  		if ($HTML.hasClass("ie")) is_firefox = true;
  		touchEnable = isMobile.any();
  		if (!touchEnable) $HTML.addClass('noTouch');
  		mobileView = mobileWidthCheck();

  		$UTILNAV = $('#top-strip');
  		$UTIL_HEADER = $('#top-strip .util-header');
  		$HEADER = $('#header');
  		$MASTHEAD = $('#header .masthead');
  		$BACKTOP_BTN = $('#back-to-top');
  		$NAV = $('.navigation');
		$PROD_BTN = $('#header .button-wrapper a.prod-button');
		$PROD_INTRO = $('#header .content-wrapper');
		$PROD_CONTENT = $('.content-wrapper .prod-content');
  		$INTROTEXT_LANDING = $('.content-wrapper p.landing-intro');
  		$PARTNERLOGO_LANDING = $('.content-wrapper .partner-logo');
  		$DETAIL_ARROW = $('a.detail-btn');
  		$MAIN_CONTENT = $('#main-wrapper');
  		$STRIPNAV = $('#strip-nav');
  		$STRIP_BTN = $('#strip-nav .button-wrapper');
  		$DETAIL_CONTENT = $('#main-wrapper .body-content');
  		$CONTENT_MARQUEE = $('#main-wrapper .marquee-container .container');
  		$CONTENT_DETAIL = $('#main-wrapper .detail-container .prodContent-wrapper');
  		$CONTENT_BOTTOM = $('#main-wrapper .bottom-nav .button-wrapper .btn-wrapper');
  		// $APPSTORE_BTN = $('.button-wrapper a.prod-button .button-body .content .customBtn-wrapper');
  		$APPSTORE_BTN = $('.button-wrapper .customBtn-wrapper');
  		$CONTACT_BAR = $('#main-wrapper .service-content');
  		$FOOTER = $('#main-wrapper .footer-content');

  		curProd = totalProd = $('#header .button-wrapper a.prod-button').length;
  		setUiState(0);
  		bottomH = ($CONTACT_BAR.height() + $FOOTER.height() + 45);
  		
  		if ($HTML.hasClass('no-svg')) usePng();

  		for (var i = 0; i < totalProd; i ++)
  		{
  			var prodLink = $PROD_BTN.eq(i).attr('href');
  			var pageName = ($PROD_BTN.eq(i).attr('href').substring(myDomain.length)).slice(0, -1);
  			
  			if (pageName.indexOf('/') !== -1)
  			{
  				var splitter = pageName.split('/');
				var splitted = splitter[(splitter.length - 1)];
				pageName = splitted;
  			}

  			pageData.push(pageName);
  			// console.log(pageName);
  		}

  		$WIN.resize(function() {
  			$HTML.removeClass('animate');
  			getWinD();
  			mobileView = mobileWidthCheck();
  			pageReset('resized');
  			pageNavSet();
        });

		$WIN.on('scroll', function(e) {
    		pageNavSet();
		});

		$WIN.on('popstate', function(e) {
		    this.popStateEventCount++;
		    // if (jQuery.browser.webkit && this.popStateEventCount == 1) return;
		    if (this.popStateEventCount == 1) return;

		    $HTML.removeClass('animate');
		    navigateToPage('browser');
		    pageReset('resized');
		});

		getWinD();
		$HTML.removeClass('animate');
		pageReset('resized');
  		pageNavSet();

		if (getPageName() != "") navigateToPage('browser');
        handlers();
	};

	var mobileWidthCheck = function mobileWidthCheck() {
		if ($HTML.hasClass('breakpoint-phone') || $HTML.hasClass('breakpoint-small-tablet')) return true;
		else return false;
	};

	var touchEnableCheck = function touchEnableCheck() {
		if (touchEnable) return true;
		else return false;
	};

	var isMobile = {
		Android: function() {
		    return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
		    return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
		    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
		    return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
		    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
		},
		any: function() {
		    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var pageNavSet = function pageNavSet() {
		if (mobileView)
		{
			if (Number($WIN.scrollTop()) >= 5)
			{
				$MASTHEAD.addClass('strip');
				$BACKTOP_BTN.show();
			}
			else
			{
				$MASTHEAD.removeClass('strip');
				$BACKTOP_BTN.hide();
			}
		}
		else
		{
			var winTop = Number($WIN.scrollTop());

			if (uiState == 1 && navTop > 0 && winTop > Number(navTop + 100)) OBJ_SECT.setMainContent('btn');

			if (uiState < 2)
			{
				if (winH < 682) $HEADER.addClass('short');
				else $HEADER.removeClass('short');
			}
		}
	};

	var pageReset = function pageReset(type) {
		$PROD_BTN.removeAttr('style');

		if (touchEnable)
		{
			if (isMobile.iOS()) $APPSTORE_BTN.find('.android').css('display', 'none');
			if (isMobile.Android()) $APPSTORE_BTN.find('.ios').css('display', 'none');

			if (!$PROD_BTN.hasClass('hOver')) $PROD_BTN.addClass('hOver');
		}
		else
		{
			$APPSTORE_BTN.find('.ios').css('display', 'none');
			$APPSTORE_BTN.find('.android').css('display', 'none');
		}
		
		if (mobileView)
		{
			if (!$PROD_BTN.hasClass('hOver')) $PROD_BTN.addClass('hOver');
			if ($HEADER.hasClass('detail')) $HEADER.removeClass('detail');
			$INTROTEXT_LANDING.css('display', 'block');
			$PARTNERLOGO_LANDING.css('display', 'block');

			if (mobileAnchorY.length <= 0)
	        {
	        	var newY = $PROD_BTN.eq(0).offset().top - 60;
	        	$PROD_BTN.each(function(i) {
	        		//mobileAnchorY.push($PROD_BTN.eq(i).offset().top - 60);
	        		mobileAnchorY.push(newY + (90*i));
	        	});
			}

			if (curProd < totalProd)
			{
				var $THIS = $PROD_BTN.eq(curProd);
				OBJ_SECT.slickOn(curProd);
				//OBJ_SECT.setProdSelect(curProd, 'button');

				var expandH = $THIS.find('.button-body').height();
				$THIS.stop().css('height', expandH + 'px');
				$THIS.addClass('current');
			}

			//$MAIN_CONTENT.removeAttr('style');
			$PROD_CONTENT.removeAttr('style');
			$CONTACT_BAR.fadeIn(0);
        	$FOOTER.fadeIn(0);

        	if (uiState >= 2) uiState = 1;
		}
		else
		{
			if (type == 'resized') $NAV.removeAttr('style');

			if (uiState <= 0)
			{
				if ($UTIL_HEADER.hasClass('on')) $UTIL_HEADER.removeClass('on');
				if (!$PROD_BTN.hasClass('hOver')) $PROD_BTN.addClass('hOver');
				if ($HEADER.hasClass('detail')) $HEADER.removeClass('detail');
				$MAIN_CONTENT.removeAttr('style');
				$PROD_CONTENT.removeAttr('style');
				$INTROTEXT_LANDING.css('display', 'block');
				$PARTNERLOGO_LANDING.css('display', 'block');
				$DETAIL_ARROW.removeAttr('style');
				$DETAIL_ARROW.removeClass('on');
				$STRIP_BTN.removeClass('on');

				$PROD_BTN.each(function(i) {
	                $(this).removeClass('current');
	                $(this).removeClass('selected');

	                if (!mobileView)
	                {
	                	$(this).removeClass('clicked');
	                }

	                $(this).removeAttr('style');
		        });

				$CONTENT_MARQUEE.removeAttr('style');
				$CONTENT_DETAIL.removeAttr('style');
        		$CONTENT_BOTTOM.removeAttr('style');
        		$CONTACT_BAR.fadeIn(0);
        		$FOOTER.fadeIn(0);
        		$DETAIL_CONTENT.removeAttr('style');
        		$DETAIL_CONTENT.fadeOut(0);

				if ($WIN.height() <= 1200)
				{
					headerH = $WIN.height();
					if ($WIN.height() > 682) navTop = (($WIN.height() - $NAV.height()) * .5) + 20;
					else navTop = 90;
				}
				if ($WIN.height() > 1200)
				{
					headerH = $WIN.height() - bottomH;
					navTop = (($WIN.height() - $NAV.height() - bottomH) * .5) + 20;
				}

				$HEADER.css('height', headerH + 'px');
				$NAV.css('margin-top', navTop + 'px');
			}

			if (uiState == 1)
			{
				if (is_firefox) $('body').addClass('noScroll');
				if ($UTIL_HEADER.hasClass('on')) $UTIL_HEADER.removeClass('on');
				if ($HEADER.hasClass('detail')) $HEADER.removeClass('detail');
				if (!$MASTHEAD.hasClass('strip')) $MASTHEAD.addClass('strip');
				if (!$DETAIL_ARROW.hasClass('on')) $DETAIL_ARROW.addClass('on');
				$PROD_CONTENT.removeAttr('style');
				$PROD_CONTENT.eq(curProd).css('display', 'block');
				$HEADER.css('background-color', $PROD_BTN.eq(curProd).attr('color1-data'));
				if (!$NAV.find('h2').hasClass('selected')) $NAV.find('h2').addClass('selected');
				// $CONTENT_MARQUEE.removeAttr('style');
				// $CONTENT_DETAIL.removeAttr('style');
				// $CONTENT_BOTTOM.removeAttr('style');

				setTimeout(function(){
					if ($HEADER.hasClass('trans')) $HEADER.removeClass('trans');
					$DETAIL_ARROW.removeAttr('style');
					$DETAIL_CONTENT.fadeIn(0);
				}, 500);
				headerH = $WIN.height();

				var marginExtra = 20;
				if (type == 'first') marginExtra = 80;

				if ($WIN.height() <= 1200)
				{
					if ($WIN.height() > 682) navTop = (($WIN.height() - $NAV.height()) * .5) + marginExtra;
					else navTop = 90;
					
					$('body').scrollTop(0);
				}

				if ($WIN.height() > 1200)
				{
					navTop = (($WIN.height() - $NAV.height() - bottomH) * .5) + 20 + 60;

					$('body').scrollTop(0);
				}

				$HEADER.css('height', headerH + 'px');
				$NAV.css('margin-top', navTop + 'px');
			}

			if (uiState == 2)
			{
				// headerH = 0;
				// navTop = $NAV.offset().top - $PROD_BTN.eq(0).offset().top + 30;
				if (is_firefox && $('body').hasClass('noScroll')) $('body').removeClass('noScroll');
	        	$HEADER.addClass('detail');
	        	if (!$UTIL_HEADER.hasClass('on')) $UTIL_HEADER.addClass('on');
	        	// $MAIN_CONTENT.css('padding-top', Number((navTop+70)-110)+'px');
	        	
	        	$PROD_BTN.each(function(i) {
	        		if (i != curProd && $PROD_BTN.eq(i).hasClass('selected'))
		        	{
		        		$PROD_BTN.eq(i).removeClass('selected');
		        		$PROD_BTN.eq(i).removeClass('current');
		        	}
	        	});
			}
			
			if (uiState > 0)
			{
				if (!touchEnable && !mobileView) $PROD_BTN.removeClass('hOver');
				$INTROTEXT_LANDING.css('display', 'none');
				$PARTNERLOGO_LANDING.css('display', 'none');

				if (!$NAV.find(".button-wrapper").hasClass('selected')) $PROD_BTN.eq(curProd).addClass('selected');
			}
		}

		if (type == 'resized')
		{
			setTimeout(function(){
				$HTML.addClass('animate');
			}, 500);
		}
		// console.log("uiState:"+uiState+", curProd:"+curProd);
	};

	var getIDWithPageData = function getIDWithPageData(pageName) {
		var matcher = totalProd;

		for (var i = 0; i < totalProd; i ++) if (pageName.indexOf(pageData[i]) >= 0) matcher = i;
		curProd = matcher;
	};

	var getPageName = function getPageName() {
	    var pathName = String(window.location),
	    	pageName = '';

	        pageName = pathName.substring(myDomain.length);
	        // pageName = pageName.slice(0, -1);
	        
	    return pageName;
	};

	var navigateToPage = function navigateToPage(type) {
		if (!type || type == 'browser')
		{
        	getIDWithPageData(getPageName());
        	// console.log("curProd:" + curProd + ", totalProd:" + totalProd);

        	if (curProd < totalProd)
			{
				setUiState(1);
				OBJ_SECT.setProdSelect(curProd, 'hist');
				if (type != 'browser')
				{
					setTimeout(function() {
						OBJ_SECT.setMainContent('auto');
					}, 250);
				}
			}
			else
			{
				$MASTHEAD.removeClass('strip');
				$NAV.find('h2').removeClass('selected');
				$HEADER.css('background', '#e2e7e7');
				setUiState(0);
			}
			// pageReset('resized');
			pageReset('first');
		}
		
		// console.log("navigateToPage Fired - pageName:" + pageName + ", type:" + type);
		
		if (curProd < totalProd)
		{
			$CONTENT_MARQUEE.removeAttr('style');
			$CONTENT_DETAIL.removeAttr('style');
			$CONTENT_BOTTOM.removeAttr('style');
			$CONTENT_MARQUEE.eq(curProd).fadeIn(0);
			$CONTENT_DETAIL.eq(curProd).fadeIn(0);
			$CONTENT_BOTTOM.eq(curProd).css('display', 'inline-block');
			// $DETAIL_CONTENT.fadeIn(0);
			$CONTACT_BAR.fadeIn(0);
	        $FOOTER.fadeIn(0);

	        OBJ_NAV.pageBtnSet();
	        //$MAIN_CONTENT.css('background-color', $PROD_BTN.eq(curProd).attr('color1-data'));
		}
	};

	var setPageLoad = function setPageLoad(type) {
		if (Modernizr.history)
        {
            var pageName;
            var pagePath = String(window.location);
			// console.log("pagePath:"+pagePath);

            if (curProd < totalProd) pageName = "#" + pageData[curProd];//$PROD_BTN.eq(curProd).attr("href");
            else pageName = myDomain;
            	
            if (type == 'back')
            {
            	type = '';
            	pageName = myDomain;
            }
            
            window.history.pushState(null, "", pageName);
            // console.log("setPageLoad Fired - pageName:" + pageName + ", type:" + type);
            navigateToPage(type);
        }
        else
        {
            $WIN.scrollTop(0);
            // if (curProd < totalProd) window.location = pageData[curProd];
            // else window.location = myDomain;
            navigateToPage(type);
        }
	};

	var getWinD = function getWinD() {
		winW = $WIN.width();
		winH = $WIN.height();
	};

	var getWinW = function getWinW() {
		return winW;
	};
	
	var getWinH = function getWinH() {
		return winH;
	};

	var getCurProd = function getCurProd() {
		return curProd;
	};

	var setCurProd = function setCurProd(n) {
		curProd = n;
	};
	
	var getTotalProd = function getTotalProd() {
		return totalProd;
	};

	var getNavTop = function getNavTop() {
		return navTop;
	};

	var getMobileAnchorY = function getMobileAnchorY(n) {
		return mobileAnchorY[n];
	};

	var getUiState = function getUiState() {
		return uiState;
	};

	var setUiState = function setUiState(n) {
		uiState = n;
	};

	var rNumGenerator = function rNumGenerator(num) {
		return Math.floor(Math.random()*num);
    };

    var usePng = function usePng() {
    	$('img').each(function() {
    		var $img = $(this);
		    var imgsrc = $img.attr('src');
		    var ext = imgsrc.substr(imgsrc.lastIndexOf("."));

		    if (ext == '.svg')
		    {
		    	var newpath = imgsrc.substr(0, imgsrc.lastIndexOf(".")) + ".png";
		    	$img.attr('src',newpath);
		    }
		    else
		    {
		    	return;
		    }
		});
    };

    var uTagTrigger = function uTagTrigger() {
    	var link_data = utag.data;
		link_data["link_name"] = utag.data["meta.page.site"] + "_" + pageData[curProd];
		link_data["button_clicked"] = "true";
		utag.view(utag.data);
    };

    function handlers() {
    	$('a[href*=#]:not([href=#])').click(function() {
	        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

	            var target = $(this.hash);
	            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	            if (target.length) {
	            	var myY = ((target.offset().top > 0) ? target.offset().top - 120 : 0);
	                $('html,body').animate({
	                    scrollTop: myY
	                }, 500, 'easeInOutCubic');
	                return false;
	            }
	        }
	    });

	    $BACKTOP_BTN.on('click', function() {
            $PROD_BTN.each(function(i) {
                $(this).removeClass('current');
                $(this).removeClass('selected');
            });

            $HEADER.removeAttr('style');
            $MASTHEAD.removeClass('strip');
            $NAV.find('h2').removeClass('selected');
            curProd = totalProd;
            setUiState(0);
            pageReset();
        });
    };

	return {
		init: init,
		mobileWidthCheck: mobileWidthCheck,
		touchEnableCheck: touchEnableCheck,
		isMobile: isMobile,
		pageReset: pageReset,
		getWinW: getWinW,
		getWinH: getWinH,
		getCurProd: getCurProd,
		setCurProd: setCurProd,
		getTotalProd: getTotalProd,
		getNavTop: getNavTop,
		getMobileAnchorY: getMobileAnchorY,
		getUiState: getUiState,
		setUiState: setUiState,
		setPageLoad: setPageLoad,
		rNumGenerator: rNumGenerator,
		uTagTrigger: uTagTrigger
	};
})(jQuery);




ONBOARDING.main.landing = (function($) {
	var OBJ_MAIN,
		OBJ_NAV;

	var $WIN = $(window),
		$HTML = $('html'),
		$UTIL_HEADER,
		$HEADER,
		$NAV,
		$MASTHEAD,
		$PROD_BTN,
		$PROD_INTRO,
		$PROD_CONTENT,
		$INTROTEXT_LANDING,
		$PARTNERLOGO_LANDING,
		$DETAIL_ARROW,
		$MAIN_CONTENT,
		$CONTENT_DETAIL,
		$STRIPNAV,
		$STRIP_BTN,
		$CONTACT_BAR,
        $FOOTER;

    var isSliding = false;
  	var init = function init() {
  		OBJ_MAIN = ONBOARDING.main;
  		OBJ_NAV = ONBOARDING.main.nav;

  		$UTIL_HEADER = $('#top-strip .util-header');
  		$HEADER = $('#header');
  		$NAV = $('.navigation');
  		$MASTHEAD = $('#header .masthead');
  		$PROD_BTN = $('#header .button-wrapper a.prod-button');
  		$PROD_INTRO = $('#header .content-wrapper');
  		$PROD_CONTENT = $('.content-wrapper .prod-content');
  		$INTROTEXT_LANDING = $('.content-wrapper p.landing-intro');
  		$PARTNERLOGO_LANDING = $('.content-wrapper .partner-logo');
  		$DETAIL_ARROW = $('a.detail-btn');
  		$MAIN_CONTENT = $('#main-wrapper');
  		$CONTENT_DETAIL = $('#main-wrapper .detail-container .prodContent-wrapper');
  		$STRIPNAV = $('#strip-nav');
  		$STRIP_BTN = $('#strip-nav .button-wrapper');
  		$CONTACT_BAR = $('.service-content');
  		$FOOTER = $('.footer-content');

  		handlers();
	};

	var setProdSelect = function setProdSelect(id, type) {
		var hideLandingIntro = false;
		OBJ_MAIN.setCurProd(id);

		var $THIS = $PROD_BTN.eq(id);

		if (OBJ_MAIN.getUiState() <= 0)
        {
        	$('html,body').animate({
	            scrollTop: 0
	        }, 250, 'easeInOutQuad');

        	OBJ_MAIN.setUiState(1);
        	OBJ_MAIN.pageReset('first');
            $THIS.addClass('hOver');
            hideLandingIntro = true;
            $DETAIL_ARROW.addClass('on');
        }
		
		$THIS.addClass('current');

		$PROD_BTN.each(function(i) {
            // if (($(this).hasClass('current') || $(this).hasClass('selected')) && (i) != id)
            // {
            if ((i) != id)
            {
                $(this).removeClass('current');
                $(this).removeClass('selected');

                if (!OBJ_MAIN.mobileWidthCheck())
                {
                	$(this).removeClass('clicked');
                	$(this).removeClass('hOver');
                }

                $(this).removeAttr('style');
            }
        });

    	if (type != 'strip' && !OBJ_MAIN.mobileWidthCheck())
        {
        	$CONTACT_BAR.fadeOut(0);
    		$FOOTER.fadeOut(0);
        }

        if (!$MASTHEAD.hasClass('strip')) $MASTHEAD.addClass('strip');

		$HEADER.css('background-color', $THIS.attr('color1-data'));
		$NAV.find('h2').addClass('selected');

		var myDelay = (type == 'btn' || type == 'hist') ? 500 : 50;
		if (OBJ_MAIN.mobileWidthCheck()) myDelay = 10;

		setTimeout(function(){
            $THIS.addClass('selected');
        }, myDelay);

        var expandH = $THIS.find('.button-body').height() + 38;
        slickOff(id);

        if (OBJ_MAIN.mobileWidthCheck())
        {
        	$THIS.stop().css('height', expandH + 'px');
			setTimeout(function() {
	            slickOn(id);
	        }, 250);

        	$('html, body').stop().animate({
                scrollTop: OBJ_MAIN.getMobileAnchorY(id)
            }, 500, 'easeInOutCubic');
        }
        else
        {
            $PROD_INTRO.addClass('hide');
            $PROD_CONTENT.removeAttr('style');
            
        	setTimeout(function() {
        		if (hideLandingIntro)
        		{
        			$INTROTEXT_LANDING.css('display', 'none');
        			$PARTNERLOGO_LANDING.css('display', 'none');
        		}
				
				$PROD_CONTENT.eq(id).css('display', 'block');
	            $PROD_INTRO.removeClass('hide');
	        }, 100);
        }

        $MAIN_CONTENT.css('background-color', $PROD_BTN.eq(id).attr('color1-data'));
        
        if (type != 'hist') OBJ_MAIN.setPageLoad(type);
        OBJ_MAIN.uTagTrigger();
	};

	var setMainContent = function setMainContent(type) {
		if (!$UTIL_HEADER.hasClass('on')) $UTIL_HEADER.addClass('on');
		var id = OBJ_MAIN.getCurProd();
		OBJ_MAIN.setUiState(2);

		var myY = OBJ_MAIN.getNavTop()+70;

		if (type == 'auto')
		{
			$('html,body').animate({
                scrollTop: myY+'px'
            }, 350, 'easeInQuad', function() {
            	$HEADER.css({'height': Number($WIN.height()-myY) + 'px'});

            	$('html,body').animate({
	                scrollTop: 0
	            }, 250, 'easeOutQuad', function() {
	            	if ($('body').hasClass('noScroll')) $('body').removeClass('noScroll');
	            });

            	$HEADER.addClass('detail');
				$PROD_BTN.find('.prod-icon .hOver > span').removeClass('on');

				setTimeout(function() {
        			$DETAIL_ARROW.css('opacity', 0);
	        	}, 150);
            });
		}
		else
		{
			$WIN.on("DOMMouseScroll, mousewheel, wheel scroll.scrolldisabler", function(e){
				e.preventDefault();
			});

			$('body').addClass('noScroll');
			$HEADER.css({'height': Number($WIN.height()-myY) + 'px'});

			$('html,body').animate({
                scrollTop: 0
            }, 250, 'easeOutQuad');

			$HEADER.addClass('detail');
			$PROD_BTN.find('.prod-icon .hOver > span').removeClass('on');
			$DETAIL_ARROW.css('opacity', 0);

			$('body').removeClass('noScroll');

			setTimeout(function() {
            	$WIN.off("DOMMouseScroll, mousewheel, wheel scroll.scrolldisabler");
            }, 750);
		}

		setTimeout(function() {
            slickOn(id);
        }, 350);

		$PROD_BTN.each(function(i) {
            if (i != id) $STRIP_BTN.eq(i).removeClass('on');
        });

        if (!$STRIP_BTN.eq(id).hasClass('on')) $STRIP_BTN.eq(id).addClass('on');
	};

	var removeMainContent = function removeMainContent() {
		OBJ_MAIN.setUiState(1);

		$('html,body').scrollTop(0);
		if (!$HEADER.hasClass('trans')) $HEADER.addClass('trans');
        OBJ_MAIN.pageReset();
	};

	var slickOn = function slickOn(id) {
		var $TEMP_SLICKER,
			dotShow = true,
			slideShow = 1,
			arrowShow = false;

		if (OBJ_MAIN.mobileWidthCheck())
		{
			$TEMP_SLICKER = $PROD_BTN.eq(id).find('.button-body .content .feature-container .featureBox');
		}
		else
		{
			$TEMP_SLICKER = $CONTENT_DETAIL.eq(id).find('.feature-container .featureBox');
			dotShow = true;
			slideShow = 3;
			arrowShow = true;
		}

		if($TEMP_SLICKER && $TEMP_SLICKER.hasClass('slick-initialized'))
		{
			$TEMP_SLICKER.off('beforeChange');
			$TEMP_SLICKER.slick("unslick");
		}

		if($TEMP_SLICKER)
		{
			$TEMP_SLICKER.slick({
				dots: dotShow, //true
				infinite: true,
				speed: 300,
				slidesToShow: slideShow, //1
				adaptiveHeight: true,
				centerMode: true,
				arrows: arrowShow, //false
				swipe: true,
				centerPadding: '0',
			});

			$TEMP_SLICKER.on('beforeChange', function(e, slick) {
				isSliding = true;
				setTimeout(function() {
					isSliding = false;
				}, 250);
			});
		}
	};

	var slickOff = function slickOff(id) {
		var $TEMP_SLICKER;
		if (OBJ_MAIN.mobileWidthCheck()) $TEMP_SLICKER = $PROD_BTN.eq(id).find('.button-body .content .feature-container .featureBox');

		if($TEMP_SLICKER && $TEMP_SLICKER.hasClass('slick-initialized'))
		{
			$TEMP_SLICKER.off('beforeChange');
			$TEMP_SLICKER.slick("unslick");
		}
	};

	var getSlickStatus = function getSlickStatus() {
		return isSliding;
	};

	var setSlickStatus = function setSlickStatus(val) {
		isSliding = val;
	};

	var arrowPressed = function arrowPressed(DIR, type) {		
		if (DIR=='DOWN' && OBJ_MAIN.getUiState() == 1)
		{
			setMainContent('auto');
		}

		if (DIR=='UP' && OBJ_MAIN.getUiState() == 2)
		{
			removeMainContent();
		}

		if ((DIR=='LEFT' || DIR=='RIGHT') && OBJ_MAIN.getUiState() < 2)
		{
			OBJ_NAV.navWithArrow(DIR, OBJ_MAIN.getCurProd(), OBJ_MAIN.getTotalProd());
		}

		if ((DIR=='LEFT' || DIR=='RIGHT') && OBJ_MAIN.getUiState() >= 2)
		{
			OBJ_NAV.navWithArrow(DIR, OBJ_MAIN.getCurProd(), OBJ_MAIN.getTotalProd(), 'strip');
		}

		if (DIR=='SPACE' && OBJ_MAIN.getUiState() == 1)
		{
			var $THIS = $PROD_CONTENT.eq(OBJ_MAIN.getCurProd()).find('a.main-cta');
			if ($THIS.attr('href'))
			{
				$THIS.addClass('clicked');
	            setTimeout(function() {
	                window.open($THIS.attr('href'));
	            }, 175);
	            setTimeout(function() {
	                $THIS.removeClass('clicked');
	            }, 400);
			}
		}
	};

	function handlers() {
		$DETAIL_ARROW.on('click', function(e) {
			e.preventDefault();
            e.stopPropagation();
			arrowPressed('DOWN');
		});

		$UTIL_HEADER.on('click', function(e) {
			e.preventDefault();
            e.stopPropagation();
			arrowPressed('UP');
		});

		$(document).keydown(function(e) {
		    switch(e.which) {
		    	case 32: // spacebar
		        	arrowPressed('SPACE');
		        break;

		    	case 37: // left
		        	arrowPressed('LEFT');
		        break;

		        case 38: // up
		        	arrowPressed('UP');
		        break;

		        case 39: // right
		        	arrowPressed('RIGHT');
		        break;

		        case 40: // down
		        	arrowPressed('DOWN');
		        break;

		        default: return;
		    }

		    e.preventDefault();
		});
	};

	return {
		init: init,
		setProdSelect: setProdSelect,
		setMainContent: setMainContent,
		removeMainContent: removeMainContent,
		// mainContentSet: mainContentSet,
		slickOn: slickOn,
		slickOff: slickOff,
		getSlickStatus: getSlickStatus
	};

})(jQuery);




ONBOARDING.main.nav = (function($) {
	var OBJ_MAIN,
        OBJ_SECT;

    var $HEADER,
        $NAV,
        $PROD_BTN,
        $PROD_ARROW,
        $MOBILE_COLLAPSE_BTN,
        $MAIN_CTA,
        $BUTTON_CTA,
        $FEA_BUTTON_CTA,
        $STRIPNAV,
        $MAIN_CONTENT,
        $DETAIL_ANCHOR,
        $MARQUEE_CONT,
        $DETAIL_CONT;

  	var init = function init() {
        OBJ_MAIN = ONBOARDING.main;
		OBJ_SECT = ONBOARDING.main.landing;

        $HEADER = $('#header');
        $NAV = $('.navigation');
        $PROD_BTN = $('#header .button-wrapper a.prod-button');
        $PROD_ARROW = $('#header .button-wrapper a.prod-nav');
        $MOBILE_COLLAPSE_BTN = $('#header .button-wrapper a.prod-button .button-body .topBox');
        $MAIN_CTA = $('.content-wrapper .prod-content .button-wrapper a.main-cta');
        $BUTTON_CTA = $('#header .button-wrapper button');
        $FEA_BUTTON_CTA = $('#header .button-wrapper button.item');
        $STRIPNAV = $('#strip-nav');
        $MAIN_CONTENT = $('#main-wrapper');
        $DETAIL_ANCHOR = $('#main-wrapper .marquee-container .headline .detailAnchor');
        $MARQUEE_CONT = $('#main-wrapper .marquee-container');
        $DETAIL_CONT = $('#main-wrapper .detail-container');

  		handlers();
	};

    var navWithArrow = function navWithArrow(DIR, curID, totalID, type) {
        if (DIR == 'LEFT')
        {
            if (curID <= 0) curID = totalID - 1;
            else curID -= 1;
        }
        else
        {
            if (curID >= totalID - 1) curID = 0;
            else curID += 1;
        }

        var myType = (type == 'strip') ? type : 'arrow';
        OBJ_SECT.setProdSelect(curID, myType);

        if (OBJ_MAIN.getUiState() == 2)
        {
        	OBJ_SECT.setProdSelect(curID, myType);
        	OBJ_SECT.setMainContent('strip');
        }
    };

    var pageBtnSet = function pageBtnSet() {
        $('#main-wrapper .bottom-nav .button-wrapper .customBtn-wrapper button').each(function (i) {
        	$(this).off("click");
            $(this).on("click", function(e) {
	            e.preventDefault();
	            e.stopPropagation();

	            window.open($(this).attr('href'));
	            return false;
	        });
        });

        $FEA_BUTTON_CTA.on("click", function(e) {
        	e.stopPropagation();
            e.preventDefault();
            
            if (!OBJ_SECT.getSlickStatus())
            {
            	window.open($(this).attr('href'));
        		return false;
            }
        });
    };

    function handlers() {
        $PROD_ARROW.on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            var $THIS = $(this),
            DIR = ($THIS.find('div').hasClass('arrow-left')) ? 'LEFT' : 'RIGHT',
            curID = OBJ_MAIN.getCurProd(),
            totalID = OBJ_MAIN.getTotalProd();

            $THIS.addClass('clicked');
            setTimeout(function(){
                $THIS.removeClass('clicked');
            }, 200);

            if (curID >= totalID && DIR == 'RIGHT') navWithArrow(DIR, totalID, totalID);
            else if (curID >= totalID && DIR == 'LEFT') navWithArrow(DIR, 0, totalID);
            else navWithArrow(DIR, curID, totalID);
        });

        $PROD_BTN.on("mouseenter", function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (OBJ_MAIN.getUiState() <= 0 && !OBJ_MAIN.touchEnableCheck() && !OBJ_MAIN.mobileWidthCheck()) $PROD_BTN.removeClass('hOver');
            if (!OBJ_MAIN.touchEnableCheck() && !OBJ_MAIN.mobileWidthCheck()) $(this).addClass('hOver');
        });
        $PROD_BTN.on("mouseleave", function(e) {
            e.preventDefault();
            e.stopPropagation();
            var $THIS = $(this);

            if (OBJ_MAIN.getUiState() <= 0)
            {
                 if (!OBJ_MAIN.touchEnableCheck() && !OBJ_MAIN.mobileWidthCheck()) $PROD_BTN.addClass('hOver');
            }
            else
            {
                if (!OBJ_MAIN.touchEnableCheck() && !OBJ_MAIN.mobileWidthCheck() && !$THIS.hasClass('current')) $THIS.removeClass('hOver');
            }
        });
        $PROD_BTN.on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            var $THIS = $(this);
            
            if (!OBJ_MAIN.touchEnableCheck()) $THIS.addClass('hOver');

            if (!OBJ_MAIN.mobileWidthCheck())
            {
	            if (OBJ_MAIN.getUiState() < 2)
	            {
	                $THIS.addClass('clicked');
	            
	                setTimeout(function() {
	                    $THIS.removeClass('clicked');
	                }, 250);
	            }
        	}

            if (!$THIS.hasClass('current') && OBJ_MAIN.getUiState() < 2) OBJ_SECT.setProdSelect($THIS.index()-1, 'btn');
            if (!$THIS.hasClass('current') && OBJ_MAIN.getUiState() == 2 && !OBJ_MAIN.mobileWidthCheck())
            {
            	OBJ_SECT.setProdSelect($THIS.index()-1, 'strip');
            	OBJ_SECT.setMainContent('strip');
            }
            
            OBJ_SECT.slickOn($THIS.index()-1);
        });

        $MOBILE_COLLAPSE_BTN.on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (OBJ_MAIN.mobileWidthCheck())
            {
                OBJ_SECT.setProdSelect(OBJ_MAIN.getTotalProd(), 'btn');
                $('html,body').animate({
                    scrollTop: 0
                }, 500, 'easeInOutCubic');

				$NAV.removeAttr('style');
	            OBJ_MAIN.setUiState(0);
	            OBJ_MAIN.pageReset();
	            OBJ_MAIN.setPageLoad('back');
            }
        });

        $MAIN_CTA.on("mouseenter", function(e) {
            $(this).addClass('clicked');
        });
        $MAIN_CTA.on("mouseleave", function(e) {
            $(this).removeClass('clicked');
        });
        $MAIN_CTA.on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            var $THIS = $(this);

            window.open($THIS.attr('href'));
            $THIS.removeClass('clicked');
        });

        $BUTTON_CTA.on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!OBJ_SECT.getSlickStatus())
            {
            	window.open($(this).attr('href'));
            	return false;
            }
        });

        $DETAIL_ANCHOR.on("click", function(e) {
        	e.preventDefault();
            e.stopPropagation();

            var desY = $DETAIL_CONT.offset().top - $MARQUEE_CONT.offset().top;

            $('html,body').animate({
                scrollTop: desY
            }, 500, 'easeInOutCubic');
            // console.log(desY);

        });
    };

	return {
		init: init,
        navWithArrow: navWithArrow,
        pageBtnSet: pageBtnSet
	};

})(jQuery);



//-----------------------------------------------------------------------------------------------
jQuery(document).ready(function() {
	ONBOARDING.controller.init();
});
