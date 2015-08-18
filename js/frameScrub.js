(function($) {

    $.fn.frameScrub = function(options) {
	
		function preloader(a) {
		  for (var i = 0; i < a.length; i++) {
		    $("<img />").attr("src", a[i]);
		  }
		}
	
		var settings = $.extend({
            defaultImage : null,
			verticalAlignment: null,
			showTitles: null,
			frameWidth: null,
        }, options);

        return this.each( function() {
			var that = $(this),
				w = $(this).width(),
				num = $(this).children("img").length,
				switcher = w / num,
				imgs = [],
				waiter = "",
				titles = [];
				
			$((that).children("img")).each(function(){
				imgs.push($(this).attr("src"));
			});	
			
			preloader(imgs);
							
			function init(){
				
				$(that).css("position","relative");
				
				$(that).children('img').map(function(){
					var pw = $(this).width(),
						ph = $(this).height(),
					    src = $(this).attr('src').split('/'),
						newW,
						newH;
													
					if(settings.frameWidth){
						newW = settings.frameWidth + "px";
						newH = ((ph * settings.frameWidth)/pw) + "px";
					}else{
						newW = "100%";
						newH = "auto";
					}
					$(this).css({"margin": "auto", "display":"inline-block", "position" : "absolute", "left" : "0", "width": newW, "height": newH, "min-height": $(that).height(), "min-width": (pw * $(that).height())/ph});
				});
			
			}
			
			init();
			
			$(this).find("img").css("opacity","0");
			
			if(settings.defaultImage){
				$(this).find("img#" + settings.defaultImage).css("opacity","1");
			}else{
				$(this).find("img").first().css("opacity","1");
			}
			if(settings.showTitles){
				$("#" + settings.showTitles).html(settings.defaultImage ? $(this).find("img#" + settings.defaultImage).attr('title') : $(this).find("img").first().attr('title'));
			  }
			
			remargin();   
			
			function remargin(){
				if(settings.verticalAlignment){
					$(that).children("img").map(function(){
						switch(settings.verticalAlignment){
							case "middle":
									$(this).css("top", -($(this).height()/2) + ($(that).height()/2));
								break;
							case "top":
									$(this).css("top", 0);
								break;
							case "bottom":
									$(this).css("top", -($(this).height()) + ($(that).height()));
								break;
							}
					});
				
				}
			}
			
			$(window).resize(function(){
				w = $(that).width();
				switcher = w / num;
				waiter = "";
				waiter = setTimeout(remargin,500);
			});
			
			if(settings.showTitle){
				$(that).children('img').map(function(){
					var title = $(this).attr('title');
					titles.push(title);
				});
			}
			
			$(this).on("mouseenter", function(event){
				  if(settings.defaultImage){
					$(this).find("img#" + settings.defaultImage).css("opacity","0");
				  }else{
					$(this).find("img").first().css("opacity","0");
				  }
				showMouseX(event,$(this).attr("id"));
			});
			
			$(this).on("mousemove", function(event){
			    showMouseX(event,$(this).attr("id"));
			});

			  $(this).on("mouseleave", function(event){
				$(this).find("img").css("opacity","0");
				if(settings.defaultImage){
					$(this).find("img#" + settings.defaultImage).css("opacity","1");
				}else{
					$(this).find("img").first().css("opacity","1");
				}
				if(settings.showTitles){
					$("#" + settings.showTitles).html(settings.defaultImage ? $(this).find("img#" + settings.defaultImage).attr('title') : $(this).find("img").first().attr('title'));
				  }
			  });

			      function showMouseX(e,that){
			        var offset = $("#" + that).offset();
			        var imgNum = (e.clientX - offset.left) < w ? Math.floor((e.clientX - offset.left)/switcher) : imgs.length - 1;
			        showImage(imgNum,that);
			      }

			      function showImage(num,cont){
				      num = num + 1;
					  before = num - 1;
					  after = num + 1;
					  $("#" + cont + " img:nth-of-type(" + num +")").css(opacity","1");
					  if(settings.showTitles){
						$("#" + settings.showTitles).html($("#" + $(that).attr("id") + " img:nth-of-type(" + num +")").attr('title'));
					  }
					  if(num < imgs.length){
					  	$("#" + cont + " img:nth-of-type(" + after +")").css("opacity","0");
					  				  	  }
					  if(before != 0){
					  	$("#" + cont + " img:nth-of-type(" + before +")").css("opacity","0");
					  }
			      }
        });

    }

}(jQuery));
