from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^register/$', views.register, name='register'),
	url(r'^register_handle/$', views.register_handle, name='register_handle'),
	url(r'^register_exist/$', views.register_exist, name='register_exist'),
	url(r'^login/$', views.login, name='login'),
	url(r'^site/$', views.site, name='site'),
	url(r'^logout$', views.logout, name='logout'),
	# url(r'^logging/$', views.logging),
]