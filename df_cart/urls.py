from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.cart, name='ucart'),
    url(r'^add/(\d+)_(\d+)/$', views.add, name='add'),
    url(r'^delete/(\d+)/$', views.delete_good, name='delete'),
]