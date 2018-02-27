$(function(){
	var size;
	var num = 1;
	var good_id = $('#good_id').text();

	$('#chooseSize button').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		size = $(this).text();
		$('#size').text(size);
	})

	$('#goodsNum').change(function(){
		num = $(this).val();
		$('#num').text(num)
	})

	$('#goodsText').change(function(){
		num = $(this).val();

		if(parseInt(num)){
			$('#num').text(num);
		}
		else{
			alert('请输入数字')
		}
	})

	$('#put_in_cart').click(function(){
		if(num){
			$.get('/cart/add/'+good_id+'_'+num, function(data){
				alert('已将商品填入购物车');
			})
		}
		else{
			alert('请选择商品的数量与尺寸');
		}
	})


})