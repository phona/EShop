# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from tinymce.models import HTMLField
# Create your models here.

class TypeInfo(models.Model):
	ttype = models.CharField(max_length=20)
	isDelete = models.BooleanField(default=False)

class GoodsInfo(models.Model):
	gtitle = models.CharField(max_length=200)
	gpic = models.ImageField(upload_to='df_goods')
	gprice = models.DecimalField(max_digits=10, decimal_places=2)
	isDelete = models.BooleanField(default=False)
	gstorage = models.IntegerField()
	gcontent = HTMLField()
	gtype = models.ForeignKey(TypeInfo)