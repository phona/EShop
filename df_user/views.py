# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from models import *
from hashlib import sha1

# Create your views here.


def register(request):
	return render(request, 'df_user/register.html')


def register_handle(request):
	post = request.POST
	uname = post.get('user_name')
	upwd = post.get('pwd')
	upwd2 = post.get('cpwd')
	uemail = post.get('email')

	if upwd != upwd2:
		return redirect('/user/register/')

	s1 = sha1()
	s1.update(upwd)
	upwd3 = s1.hexdigest()

	user = UserInfo()
	user.uname = uname
	user.upwd = upwd3
	user.uemail = uemail
	user.save()

	return redirect('/user/login')


def register_exist(request):
	uname = request.GET.get('uname')
	count = UserInfo.objects.filter(uname=uname).count()
	return JsonResponse({'count': count})


def login(request):
	if request.method == 'POST':
		req = request.POST
		username = req.get('username')
		pwd = req.get('pwd')

		s1 = sha1()
		s1.update(pwd)
		upwd = s1.hexdigest()

		context = {'data':False}
		try:
			data = list(UserInfo.objects.filter(uname=username).values())[0]['upwd']
			if data == upwd:
				context['data'] = True

		except Exception as e:
			print e
		
		return JsonResponse(context)

	return render(request, 'df_user/login.html', {'title':'登录'})

def logout(request):
	request.session.flush()
	response = HttpResponseRedirect('/')
	return redirect('/')

def site(request):

	if request.method == 'POST':
		uname = request.POST.get('username')
		allow = request.POST.get('allow')

		user = UserInfo.objects.filter(uname=uname)

		request.session['uname'] = user[0].id
		request.session.set_expiry(0)

		red = HttpResponseRedirect('/user/site/')

		if allow != 0:
			red.set_cookie('uname', uname)

		else:
			red.set_cookie('uname', '', max_age=-1)

		return red

	else:
		uname = request.COOKIES.get('uname')
		user = UserInfo.objects.filter(uname=uname)

		try:
			session = request.session['uname']

		except:
			session = ''

		if session == user[0].id:
			context = {'uname':uname, 'title':'用户中心'}
			return render(request, 'df_user/site.html', context)

		return redirect('/user/login/')	
	# return redirect(reverse('user:index'))







