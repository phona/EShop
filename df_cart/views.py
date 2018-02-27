# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse

from models import CartInfo
from df_user.check_login import check_login
# Create your views here.

@check_login
def cart(request):
	uid = request.session['uname']
	carts = CartInfo.objects.filter(user_id=uid)
	context = {
		'title':'购物车',
		'carts':carts,
	}

	return render(request, 'df_cart/cart.html', context)

@check_login
def add(request, goods_id, count):
	uid = request.session['uname']
	goods_id = int(goods_id)
	count = int(count)

	carts = CartInfo.objects.filter(goods_id=goods_id, user_id=uid)

	# return HttpResponse(carts[0].id)
	if len(carts)>=1:
		cart = carts[0]
		cart.count = cart.count + count

	else:
		cart = CartInfo()
		cart.user_id = uid
		cart.goods_id = goods_id
		cart.count = count

	cart.save()

	if request.is_ajax():
		return JsonResponse({'count':cart.count})

	return redirect('/cart/')

@check_login
def delete_good(request, cart_id):
	try:
		good = CartInfo.objects.filter(id=int(cart_id))
		good.delete()
		context = {'result':1}
	except:
		context = {'result':0}
	return JsonResponse(context)











