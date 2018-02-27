from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^list/(?P<id>\d+)/$', views.list_item, name='list'),
	url(r'^listHandle/$', views.list_items, name='lists'),
	url(r'^commodity/(?P<id>\d+)/$', views.commodity, name='commodity'),
	# url(r'^logging/$', views.logging),
]