$(function(){
	aggregate();

	$('.delete').click(function(){
		element = $(this).parents('.item')
		cart_id = element.attr('id');
		del = confirm('确定要删除吗？');

		if(del){
			// element.remove('#'+cart_id);
			$.get('/cart/delete/'+cart_id+'/', function(data){
				if(data.result == 1){
					element.remove('#'+cart_id);
					aggregate();
				}
				else{
					alert('删除失败');
				}
			})
		}
	});

	function aggregate(){
		check_price = 0;

		$('.item').each(function(){
			price = parseFloat($(this).find('.price').text());
			count = parseFloat($(this).find('.count').val());
			total = price * count;
			check_price += total;

			$(this).find('.total').text(total);
		});

		$('#aggregate').text(check_price);
	};

	$('.item').each(function(){
		good_nums = $(this).find('#good_nums');
		$(this).find('#plus').click(function(){
			good_nums.val(
					parseInt(good_nums.val())+1
				);
			aggregate();
		});

		$(this).find('#minus').click(function(){
			if(good_nums.val()>0){
				good_nums.val(
						parseInt(good_nums.val())-1
					);
				aggregate();
			}
		});
	});

	$('.item').find('.count').on('change', function(){
		aggregate();
	})

})