$(function(){
	$('#all_items').hover(function(){
		$(this).find('ul').stop(true, true).slideDown('fast');	
	},
	function(){
		$(this).find('ul').stop(true, true).slideUp('fast');
	})
})

$(function(){
	$('.banner-list').hover(function(){
		$(this).addClass('banner-active').find('ul').stop(true, true).fadeIn('fast');
	},
	function(){
		$(this).removeClass('banner-active').find('ul').stop(true, true).fadeOut('fast');
	})
})