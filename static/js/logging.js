$(function(){
	var username_check = false;
	var pwd_check = false;

	$('#username').blur(function(){
		check_user_name();
	});

	$('#username').focus(function(){
		$(this).next().hide();
	});

	$('#pwd').focus(function(){
		$(this).next().hide();
	});

	function check_user_name(){
		var username = $('#username').val();
		var pattern = /^\w{5,15}$/i;

		if(username==''){
			$('#username').next().html('用户名不得为空！').show();
			return;
		}
		if(pattern.test(username)==false){
			$('#username').next().html('非法的用户名，请重新输入！').show();
			return;
		}
		else{
			return username;
		}
	};

	function check_pwd(){
		var pwd = $('#pwd').val();
		var username = check_user_name();

		if(pwd==''){
			$('#pwd').next().html('密码不能为空！').show();
			return false;
		}
		else{
			context = {'username':username, 'pwd':pwd};
			$.ajax({ 
				type: "POST", 
				cache: false, 
				data: context, 
				async: false, 
				url: "/user/login/", 
				success: function(data) { 
					result = data.data;
				}
			}); 
		}
		return result;
	};

	$('form').submit(function(){
		
		if(check_pwd()){
			return true;	
		}
		else{
			alert('用户名密码错误！')
			return false;
		}
	})
})