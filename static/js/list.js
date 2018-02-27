$(function(){
	var totalPage;
	var url = window.location.href;
	var type = url.match('/list/(.*?)/')[1];

	listing(1, type);

	function listing(page, type){
		$.get('/listHandle/', {page:page, type:type},
		function(data){
			var pageNum = data.pageNum;
			var pageCount = data.pageCount;
			var pageStart = parseInt((pageNum/10)+1);
			var pageEnd = parseInt(pageCount/12)+1;
			totalPage = pageEnd;

			$('.items img').each(function(i){
				url = '/commodity/'+ data.data[i]['id'] + '/'
				$(this).attr({'src':data.data[i]['gpic']}).parent().attr({'href':url});
			});

			$('.items p').each(function(i){
				var title = data.data[i]['gtitle'];

				if(title.length>18){
					title = title.slice(0, 19) + '...';
				}

				$(this).text(title).append(
						'<br>售价￥<label>'+data.data[i]['gprice']+'</label>'
					);
			});

			$('#paginator').empty();

			for(i=pageStart;i<=pageEnd;i++){

				if(i==pageStart && pageNum!=1){
					$('#paginator').append(
							"<li><a href='#' id='previous'>上一页</a></li>"
						)
				}
				if(i==pageNum){	
					$('#paginator').append(
							"<li class='active'><a>"+i+"</a></li>"
						);

					if(i==pageEnd && pageNum!=pageEnd){
						$('#paginator').append(
								"<li><a href='#' class='next'>下一页</a></li>"
							)
					}
				}
				else{
					$('#paginator').append(
							"<li><a href='#' id='page'>"+i+"</a></li>"
						);

					if(i==pageEnd && pageNum!=pageEnd){
						$('#paginator').append(
								"<li><a href='#' id='next'>下一页</a></li>"
							)
					}
				}
			}

			})
		};
	$('#paginator').on('click', '#page', function(){
		listing($(this).text(), type);
	})

	$('#paginator').on('click', '#previous', function(){
		var prev = $('#paginator .active').text()
		if(prev!=1){
			listing(parseInt(prev)-1, type);
		}
	})

	$('#paginator').on('click', '#next', function(){
		var next = $('#paginator .active').text()
		if(next!=totalPage){
			listing(parseInt(next)+1, type);
		}
	})


 
})
