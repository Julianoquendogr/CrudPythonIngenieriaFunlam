#encoding:utf-8
from django.forms import ModelForm
from django import forms
from principal.models import Personas, Estados

class PersonaForm(forms.Form):
	nombre_usuario = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control', 'placeholder':'Ingrese aquí su nombre', 'onkeypress':'return valida(event,this,0,50);', 'onblur':'valida2(this,0,50)' }))
	cedula_usuario = forms.IntegerField(widget=forms.TextInput(attrs={'class':'form-control','placeholder':'Ingrese aquí su C.I',  'onkeypress':'return valida(event,this,9,10);', 'onblur':'valida2(this,9,10)'}))
	estado_usuario = forms.ChoiceField(widget=forms.Select(attrs={'class':'form-control chosen'}),choices=[(elemento.id,str(elemento.nombre_estado)) for elemento in Estados.objects.all().order_by('nombre_estado')])
	fecha_usuario =	forms.CharField(widget=forms.TextInput(attrs={'class':'form-control','onkeyup':'this.value=formateafecha(this.value);','placeholder':'Fecha: dd-mm-aaaa'}))
	foto_usuario = forms.FileField()