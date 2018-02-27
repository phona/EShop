$(function(){

	var error_name = false;
	var error_pwd = false;
	var error_cpwd = false;
	var error_email = false;
	var error_allow = false;

	$('#user_name').blur(function(){
		check_username();
	})

	$('#user_name').focus(function(){
		$(this).next().hide();
	})

	$('#pwd').blur(function(){
		check_pwd();
	})

	$('#pwd').focus(function(){
		$(this).next().hide();
	})

	$('#cpwd').blur(function(){
		check_cpwd();
	})

	$('#cpwd').focus(function(){
		$(this).next().hide();
	})

	$('#email').blur(function(){
		check_email();
	})

	$('#email').focus(function(){
		$(this).next().hide();
	})

	$('#allow').click(function(){

		if($(this).prop('checked'==true)){
			error_allow = false;
			$('.error_tip2').hide();
		}
		else{
			error_allow = true;
			$('.error_tip2').show();
		}
	})


	function check_username(){
		var val = $('#user_name').val();
		var re = /^\w{5,15}$/i;

		if(val==''){
			$('#user_name').next().html('用户名不能为空！').show();
			error_name = true
			return;
		}
		if(re.test(val)){
			$.get('/user/register_exist/?uname='+$('#user_name').val(), function(data){
				if(data.count!=0){
					$('#user_name').next().html('用户名已存在。').show();
					error_name = true;
				}
				else{
					$('#user_name').next().hide();
					error_name = false;
				}
			})
		}
		else{
			$('#user_name').next().html('用户名是包括数字、字母、下划线的5到15位的字符串。').show();
			error_name = true
			return;
		}
	}

	function check_pwd(){
		var val = $('#pwd').val();
		var re = /^[@\w\.\$\*\!\?]{6,16}$/i;

		if(val==''){
			$('#pwd').next().html('密码不能为空！').show();
			error_pwd = true
			return;
		}
		if(re.test(val)){
			error_pwd = false;
		}
		else{
			$('#pwd').next().html('密码是包含数字字母，还包含.!?$@*的6到16位的字符串。').show();
			error_pwd = true
			return;
		}
	}

	function check_cpwd(){
		var val = $('#pwd').val()
		var val1 = $('#cpwd').val();

		if(val1==''){
			$('#cpwd').next().html('确定密码不能为空！').show();
			error_cpwd = true;
			return;
		}
		if(val==''){
			$('#cpwd').next().html('请输入密码后再输入确认密码。').show();
			error_cpwd = true;
			return;
		}
		if(val!=val1){
			$('#cpwd').next().html('两次密码不一致，请重新输入。').show();
			error_cpwd = true;
			return;
		}
		else{
			error_cpwd = false;
			return;
		}
	}

	function check_email(){
		var val = $('#email').val()
		var re = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

		if(val==''){
			$('#email').next().html('邮箱不能为空！').show();
			error_email = true;
			return;
		}
		if(re.test(val)){
			error_email = false;
			return;
		}
		else{
			$('#email').next().html('非法邮箱格式！').show();
			error_email = true;
			return;
		}
	}

	$('form').submit(function() {
			check_username();
			check_pwd();
			check_cpwd();
			check_email();

			if(error_name == false && error_pwd == false && error_cpwd == false && error_email == false && error_allow == false)
			{
				return true;
			}
			else
			{
				return false;
			}

		});
})