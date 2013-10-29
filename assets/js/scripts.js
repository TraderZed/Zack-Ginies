/*
Bones Scripts File
Author: Eddie Machado

This file should contain any js scripts you want to add to the site.
Instead of calling it in the header or throwing it inside wp_head()
this file will be called automatically in the footer so as not to
slow the page load.

*/


// IE8 ployfill for GetComputed Style (for Responsive Script below)
if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}













// as the page loads, call these scripts
$(document).ready(function() {

	$(document).scrollTop(0);

/* LIKES CAROUSEL ----------------------------------------------*/

var sx,
	likeCarousel = {
		settings : {
			prevBtn 	: $('#likes .btn_prev'),
			nextBtn		: $('#likes .btn_next'),
			currPanel 	: 1,
			numPanels	: $('.like').length,
			canAdvance	: false,
			canRegress	: false,
			panelWidth	: 0,
			verbage		: ['Biking', 'Bad Girls Club', 'Bingo', 'Video Games', 'Working Out'],
			videos		: ['biking', 'badgirlsclub', 'bingo', 'videogames', 'workingout']
		},
		init : function() {
			sx = this.settings;
			
			// Check if there is more than 1 panel, if so, activate the next button
			if(sx.currPanel < sx.numPanels) {
				sx.nextBtn.addClass('active');
				sx.canAdvance = true;
			}	
			
			// Randomize both arrays in the same order
			var i = 0, len = sx.verbage.length, next, order=[];
			
			while(i<len)order[i]= ++i; //[1,2,3...]
			order.sort(function(){return Math.random()-.5});
			
			
			for(i= 0; i<len; i++){
			    next= order[i];
			    sx.verbage.push(sx.verbage[next]);
			    sx.videos.push(sx.videos[next]);
			}
			sx.verbage.splice(0, len);
			sx.videos.splice(0, len);
			
			console.log(sx.verbage);
			console.log(sx.videos);
			
			$('#likes h2 span').html(sx.verbage[0]);
									
			this.bindUIActions();
			this.setupPanels();
		},
		bindUIActions : function() {
			sx.nextBtn.on('click', function() {
				likeCarousel.nextPanel();
			});
			
			sx.prevBtn.on('click', function() {
				likeCarousel.prevPanel();
			});
		},
		setupPanels : function() {

		},
		prevPanel : function() {

		},
		nextPanel : function() {
			console.log('hi');
			$('#likes h2 span').hide('slide', function() {
				console.log('done');
				$('#likes h2 span').html(sx.verbage[2]);
				$('#likes h2 span').show('slide',{direction: 'right'})
			});
		}
	};


/* WORK CAROUSEL ----------------------------------------------*/

var s,
	workCarousel = {
		settings : {
			prevBtn 	: $('#work .btn_prev'),
			nextBtn		: $('#work .btn_next'),
			currPanel 	: 1,
			numPanels	: $('.work_item').length,
			canAdvance	: false,
			canRegress	: false,
			panelWidth	: 0
		},
		init : function() {
			s = this.settings;
			
			// Check if there is more than 1 panel, if so, activate the next button
			if(s.currPanel < s.numPanels) {
				s.nextBtn.addClass('active');
				s.canAdvance = true;
			}	
									
			this.bindUIActions();
			this.setupPanels();
		},
		bindUIActions : function() {
			s.nextBtn.on('click', function() {
				workCarousel.nextPanel();
			});
			
			s.prevBtn.on('click', function() {
				workCarousel.prevPanel();
			});
			
			$(window).on('resize', function() {
				workCarousel.setupPanels();
			});
		},
		setupPanels : function() {
			s.panelWidth = $(window).width();

			$('#work .wrapper').width(s.numPanels * s.panelWidth);
			$('.work_item').width(s.panelWidth - 300);
			
			// reposition the work wrapper if the user resizes the browser
			$('#work .wrapper').css('right', (s.currPanel - 1) * s.panelWidth);
		},
		prevPanel : function() {
			if(s.canRegress == true) {
				$( "#work .wrapper" ).animate({
					right: '-='+s.panelWidth
				}, function() {
					// Animation complete.
					s.currPanel--;
					s.canAdvance = true;
					s.nextBtn.addClass('active');
					
					if(s.currPanel == 1) {
						s.prevBtn.removeClass('active');
						s.canRegress = false;
					}
				});
			}
		},
		nextPanel : function() {
			if(s.canAdvance == true) {
				$( "#work .wrapper" ).animate({
					right: '+='+s.panelWidth
				}, function() {
					// Animation complete.
					s.currPanel++;
					s.canRegress = true;
					s.prevBtn.addClass('active');

					if(s.currPanel >= s.numPanels) {
						s.nextBtn.removeClass('active');
						s.canAdvance = false;
					}
				});
			}
		}
	};


    /*
    Responsive jQuery is a tricky thing.
    There's a bunch of different ways to handle
    it, so be sure to research and find the one
    that works for you best.
    */
    
    /* getting viewport width */
    var responsive_viewport = $(window).width();
    
    /* if is below 481px */
    if (responsive_viewport < 481) {  	
    
    } /* end smallest screen */
    
    /* if is larger than 481px */
    if (responsive_viewport > 481) {
        
    } /* end larger than 481px */
    
    /* if is above or equal to 768px */
    if (responsive_viewport >= 768) {
		$('#likes').height(parseInt($(window).height() - $('header').outerHeight()));
		$('#work').height($(window).height());
		
		likeCarousel.init();
		workCarousel.init();
        
    }
    
    /* off the bat large screen actions */
    if (responsive_viewport > 1030) {
        
    }
    
	
	// add all your scripts here
	
	
	
 
}); /* end of as page load scripts */


/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){ return; }
    var doc = w.document;
    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;
    if( !meta ){ return; }
    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true; }
    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false; }
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
		// If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){ disableZoom(); } }
		else if( !enabled ){ restoreZoom(); } }
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );
})( this );