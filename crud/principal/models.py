#encoding:utf-8
from django.db import models
from django.contrib.auth.models import User
from django import forms

class Estados(models.Model):
	nombre_estado = models.CharField(max_length=100, verbose_name='Nombre estado')
	class Meta:
		db_table = 'estados'

class TiposPersonas(models.Model):
	nombre_tipo = models.CharField(max_length=100)
	class Meta:
		db_table = 'tipos_personas'

class TiposXPersonas(models.Model):
	id_persona = models.ForeignKey('Personas', db_column='id_persona', blank=True)
	id_tipo = models.ForeignKey(TiposPersonas, db_column='id_tipo', blank=True)
	class Meta:
		db_table = 'tipos_x_personas'

class Personas(models.Model):
	nombre = models.CharField(max_length=200, verbose_name='Nombre persona')
	cedula = models.IntegerField(verbose_name='Cedula persona')
	id_estado = models.ForeignKey(Estados, db_column='id_estado')
	fecha = models.DateField(verbose_name='Fecha persona')
	foto = models.CharField(max_length=200)
	tipos = models.ManyToManyField(TiposPersonas, through="TiposXPersonas", related_name="TiposPersonas")
	class Meta:
		db_table = 'personas'