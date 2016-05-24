//viewport fix for over 1280 wide
if (screen.width > 1280) {
// document.getElementById("viewport").setAttribute("content", "width=1280");
}

if (jQuery('html').outerWidth(true) > 1280) {
  jQuery('head').append('<meta name="viewport" content="width=1280"/>');
} else {
	jQuery('head').append('<meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"/>');
}
jQuery(document).ready(function(){
	FixCTAHeight();	
	var mobilewidth = 760;
	$("#desktoplogo").hover(function(){
		
		$(".definition").removeClass("fadeOut").addClass("fadeIn");
	}, function() {
		$(".definition").removeClass("fadeIn").addClass("fadeOut");
		
	});
	var windowWidth = $(window).width();
	
	if(windowWidth <= mobilewidth)
	{
		//fix header height on mobile, as the 100% height changes when the page scrolls down and the URL bar is out of view
		$(".header").css("height", $(window).height());
		$(".mobilebkg").css("height", $(window).height()+100);
	}

	
	//fittext
	//jQuery(".fittext").fitText();
	
	
	//tabs
	$(".tab").on("click", function(){
		var index = $(".tab").index(this);
		$(".tab").removeClass("selected");
		$(this).addClass("selected");
		
		$( ".tab-content.selected, .tab-content.default" ).fadeOut( "fast", function(){
			$( ".tab-content" ).eq(index).removeClass("hidden").fadeIn( "fast",function(){
				$( ".tab-content.selected" ).removeClass("selected");
				$( ".tab-content.default" ).removeClass("default");
				$( ".tab-content" ).eq(index).removeClass("hidden").addClass("selected");
			});
		});
	});
	
	//mobile tabs
	$(".mobiletab").removeClass("selected");
	$(".mobiletab").on("click", function(){
		var index = $(".mobiletab").index(this);
		console.log(index);
		if($(this).hasClass("selected"))
		{
				$( ".tab-content" ).fadeOut( "fast");
			
			
		} else {
			$(".mobiletab").removeClass("selected");
			$(this).addClass("selected");
			
			$( ".tab-content" ).fadeOut( "fast", function(){
				$( ".tab-content" ).eq(index).removeClass("hidden").show();
			});
			/*
			$( ".tab-content.selected, .tab-content.default" ).fadeOut( "fast", function(){
				$( ".tab-content" ).eq(index).show( "fast",function(){
					$( ".tab-content" ).eq(index).addClass("selected");
				});
			});
			*/
		}
	});
	/*
	if (screen.width > mobilewidth) {
		//page animation
		jQuery('section').addClass("viewhidden");
		jQuery('section').viewportChecker({
			classToAdd: 'viewvisible animated fadeInDown', // Class to add to the elements when they are visible
			removeClassAfterAnimation: true, 
			offset: 100    
		});  
	}
	*/

   
   //scrolling anchor
   //jQuery to collapse the navbar on scroll
	$(window).scroll(function() {
		/*console.log($(".navbar").offset().top);
		if ($(".navbar").offset().top < 50) {
			$("#navbar-collapse").addClass("in");
		} else {
			*/
			$("#navbar-collapse").removeClass("in");
		//}
		

		if (($(".desktop.navbar").offset().top > 5) && $(window).width() > mobilewidth) {
			$(".home-fixed").fadeOut("fast");
			$(".desktop.navbar").fadeIn("slow");
		} else {
			$(".desktop.navbar").fadeOut("slow");
			$(".home-fixed").fadeIn("fast");
		}
		
		
		
		//parallax, disable if touch
		//disabled for launch
		/*
		if(!$("html").hasClass("touch"))
		{
			//console.log($(this).scrollTop());
			$('.stats').css({
				'margin-top': -($(this).scrollTop() * .75 ) + "px"
			});
		}
		*/
		
		
	});
	
	$(window).resize( function(e)
	{
		//FixCTAHeight();
		//mobile menu height fix
		FixMobileNav();
	});
	
	
	FixMobileNav();
	
	
	
	function FixMobileNav() {
		var height = $(window).height();
		//console.log(height);
		$("#navbar-collapse ul").css("height", height - 50);
		
		//update desktop logo top paddingBottom
		$(".logo").css("margin-top", height/20);		
		
		
	}


	//jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$('.page-scroll').bind('click', function(event) {
			var $anchor = $(this);
			//console.log($($anchor.attr('href')).offset().top)	
			$('html, body').stop().animate({
				scrollTop: ($($anchor.attr('href')).offset().top)	
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
	});
	 
    
	//highlight nav scrolling past anchor
	// Cache selectors
	var topMenu = $(".desktop .nav"),
		topMenuHeight = topMenu.outerHeight()+15,
		// All list items
		menuItems = topMenu.find("a"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function(){
		  var item = $($(this).attr("href"));
		  if (item.length) { return item; }
		});

	// Bind to scroll
	$(window).scroll(function(){
	   // Get container scroll position
	   //changing topmenuheight to be taller to trigger take action earlier
	   topMenuHeight = $(window).height()/2; 
	   var fromTop = $(this).scrollTop()+topMenuHeight;

	   // Get id of current scroll item
	   var cur = scrollItems.map(function(){
		 if ($(this).offset().top < fromTop)
		   return this;
	   });
	   // Get the id of the current element
	   cur = cur[cur.length-1];
	   var id = cur && cur.length ? cur[0].id : "";
	   // Set/remove active class
	   menuItems
		 .parent().removeClass("active")
		 .end().filter("[href=#"+id+"]").parent().addClass("active");
		 
	 //hide take action if take action is in view
		if(($(".action").offset().top < $(this).scrollTop() + 1350  ) && ($(window).width() > mobilewidth))
		{
			$(".button.fixed").fadeOut("slow");
		} else {
			$(".button.fixed").show();
		}
		 /*
		//also check if button.fixed is in view
		if(($(".action").offset().top < $(this).scrollTop() + 200  ) && ($(window).width() > mobilewidth))
		{
			$(".button.fixed").show();
		} else {
			$(".button.fixed").hide();
		}*/
	
	
	});

});


$(window).load(function(){
	FixCTAHeight();
});

function FixCTAHeight()
{
	var height = 200;
	$(".cta .col-md-3").each(function(){
		//console.log(height);
		//console.log($(this).height());
		
		if($(this).height() > height)
		{
			height = $(this).height();
		}
	});
	height += 50;
	//console.log(height);
	$(".cta .col-md-3").css("height",height);
	
	height = 200;
	$(".cta .col-md-3 .text-center").each(function(){
		
		if($(this).height() > height)
		{
			height = $(this).height();
		}
	});
	height += 20;
	//console.log(height);
	//$(".cta .col-md-3 .text-center").css("height",height);//
	
	
	//fix action container height
	var height1 = $(".action .titlecontainer").height() + $(".action .container").height() + 200;
	$(".action").css("height",height1);
	
}