# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from models import GoodsInfo, TypeInfo
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.core.paginator import Paginator
from df_user.check_login import check_login

# Create your views here.

def index(request):
	return render(request, 'df_goods/index.html')

def list_item(request, id):
	title = TypeInfo.objects.filter(id=id).values()
	context = {'title': list(title)[0]['ttype']}

	goods_ids = request.COOKIES.get('goods_ids', '')

	if goods_ids != '':
		result = []
		goods_idsl = goods_ids.split(',')

		for i in range(len(goods_idsl)):
			val = GoodsInfo.objects.filter(id=int(goods_idsl[i])).values()
			url = '/commodity/' + goods_idsl[i] +'/'
			result.append({'val':list(val)[0], 'url':url})

	else:
		result = ''

	context['result'] = result

	# return HttpResponse(context['result'][0]['gtitle'])
	return render(request, 'df_goods/list.html', context)

def list_items(request):
	get = request.GET
	page = get['page']
	type = get['type']

	type = int(type)
	list1 = GoodsInfo.objects.filter(gtype_id=type).values()

	p = Paginator(list(list1), 12)

	if page == '':
		page = '1'

	page = int(page)
	list2 = p.page(page)
	plist = p.page_range

	context = {'code':'查询成功', 'pageNum':page, 'pageCount':len(list(plist)), 'data':list(list2)}

	return JsonResponse(context)

@check_login
def commodity(request, id):
	good = GoodsInfo.objects.filter(id=id)[0]
	context = {
		'title': good.gtitle,
		'price': good.gprice,
		'src': good.gpic,
		'good_id': good.id,
	}

	goods_ids = request.COOKIES.get('goods_ids', '')
	goods_id = str(id)
	if goods_ids != '':
		goods_idsl = goods_ids.split(',')
		if goods_idsl.count(str(id)) >= 1:
			goods_idsl.remove(goods_id)
		goods_idsl.insert(0, goods_id)

		if len(goods_idsl) > 4:
			goods_idsl.pop()
		goods_ids = ','.join(goods_idsl)

	else:
		goods_ids = goods_id

	response = render(request, 'df_goods/commodityPage.html', context)
	response.set_cookie('goods_ids', goods_ids)

	return response



