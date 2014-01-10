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
			video		: $('#likes video'),
			currPanel 	: 0,
			numPanels	: $('.like').length,
			canAdvance	: false,
			canRegress	: false,
			panelWidth	: 0,
			verbage		: ['Biking','Pok&eacute;mon', 'Drag Queens', 'Bad Girls Club', 'Bingo', 'Video Games', 'Working Out', 'Godzilla', 'Mega Man', 'Cats', 'Horror Movies', 'Palm Springs', 'Margaritas', 'Katy Perry', 'Gundam', 'Karaoke'],
			videos		: ['biking', 'pokemon', 'dragqueens', 'badgirlsclub', 'bingo', 'videogames', 'workingout', 'godzilla', 'megaman_alt', 'cats', 'horror_alt', 'palmsprings', 'margaritas', 'katyperry', 'gundam', 'karaoke']
		},
		init : function() {
			sx = this.settings;
			
			// Check if there is more than 1 panel, if so, activate the next button
			if(sx.currPanel < sx.verbage.length) {
				sx.nextBtn.addClass('active');
				sx.canAdvance = true;
			}	

			console.log($(window).width() / 2);			
			
			// Randomize both arrays in the same order - Major credit to Dineshkani (http://stackoverflow.com/users/1507442/dineshkani)
			var arrayShuff = new Array();
			
			for (var i=0;i< sx.verbage.length;i++){
				arrayShuff.push(i);
			}
			
			fisherYates(arrayShuff);
			
			function fisherYates ( myArray ) {
				var i = myArray.length, j, tempi, tempj;
				if ( i === 0 ) return false;
				while ( --i ) {
					j = Math.floor( Math.random() * ( i + 1 ) );
					tempi = myArray[i];
					tempj = myArray[j];
					myArray[i] = tempj;
					myArray[j] = tempi;
				}
			}
			
			var temp_verbage = new Array();
			
			for (i=0;i < arrayShuff.length;i++){
				temp_verbage.push(sx.verbage[arrayShuff[i]]);
			}
			
			sx.verbage = new Array();
			sx.verbage = temp_verbage.slice(0);
			temp_verbage = new Array();
			
			for (i=0;i < arrayShuff.length;i++){
				temp_verbage.push(sx.videos[arrayShuff[i]]);
			}
			sx.videos = new Array();
			sx.videos = temp_verbage.slice(0);
			
/*
			console.log(sx.videos);
			console.log(sx.verbage);
			
			console.log(sx.video);
			console.log(sx.currPanel);
*/
			
			// Setup first panel
			$('#likes h2 span').html(sx.verbage[sx.currPanel]);			
			
			sx.video[0].src = 'assets/videos/'+sx.videos[sx.currPanel]+'.mp4';
			sx.video[0].load();
			sx.video[0].play();
			
			// Setup the second panel
			sx.video[1].src = 'assets/videos/'+sx.videos[sx.currPanel+1]+'.mp4';
			sx.video[1].load();
			sx.video[1].play();
			
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
			
			$(window).on('resize', function() {
				$('#likes').height(parseInt($(window).height() - $('header').outerHeight()));
			});
		},
		setupPanels : function() {

		},
		prevPanel : function() {
			if(sx.canRegress == true) {
				sx.currPanel--;
								
				if($(sx.video[0]).is(":visible") == true) {
					
					$(sx.video[0]).fadeOut('slow');
					
					sx.video[1].src = 'assets/videos/'+sx.videos[sx.currPanel]+'.mp4';
					$(sx.video[1]).fadeIn('slow');
					sx.video[1].load();
					sx.video[1].play();
				} else {
					$(sx.video[1]).fadeOut('slow');
					sx.video[0].src = 'assets/videos/'+sx.videos[sx.currPanel]+'.mp4';
						$(sx.video[0]).fadeIn('slow');
						sx.video[0].load();
						sx.video[0].play();
				}
				
				
				$('#likes h2 span').hide('slide', {direction: 'right'}, function() {
					$('#likes h2 span').html(sx.verbage[sx.currPanel]);
					$('#likes h2 span').show('slide',{direction: 'left'})
				});
								
				if(sx.currPanel == 0) {
					sx.prevBtn.removeClass('active');
					sx.canRegress = false;
				}
				
				if(sx.currPanel == sx.videos.length - 2) {
					sx.nextBtn.addClass('active');
					sx.canAdvance = true;
				}
			}
		},
		nextPanel : function() {
			if(sx.canAdvance == true) {

				sx.currPanel++;
				sx.canRegress = true;
				sx.prevBtn.addClass('active');		
						
				if($(sx.video[0]).is(":visible") == true) {
					
					$(sx.video[0]).fadeOut('slow');
					
					sx.video[1].src = 'assets/videos/'+sx.videos[sx.currPanel]+'.mp4';
					$(sx.video[1]).fadeIn('slow');
					sx.video[1].load();
					sx.video[1].play();
				} else {
					$(sx.video[1]).fadeOut('slow');
					sx.video[0].src = 'assets/videos/'+sx.videos[sx.currPanel]+'.mp4';
						$(sx.video[0]).fadeIn('slow');
						sx.video[0].load();
						sx.video[0].play();
				}
				
				
				$('#likes h2 span').hide('slide', function() {
					$('#likes h2 span').html(sx.verbage[sx.currPanel]);
					$('#likes h2 span').show('slide',{direction: 'right'})
				});
				
				if(sx.currPanel >= sx.videos.length - 1) {
					sx.nextBtn.removeClass('active');
					sx.canAdvance = false;
				}
			}
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
				$('#work').height($(window).height());
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