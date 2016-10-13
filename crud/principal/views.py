import json
import os
import sys
from django import http
from django.core.serializers.python import Serializer
from django.http import HttpResponse, HttpResponseRedirect
from  django.views.decorators.csrf  import  csrf_exempt
from django.shortcuts import render_to_response, RequestContext, get_object_or_404, render 
from principal.models import Personas
from principal.forms import PersonaForm

def inicio(request):
	formulario = PersonaForm()
	context = {'formulario':formulario}
	return render_to_response('personas.html',context, context_instance=RequestContext(request))

######################################
###    Registro de personas	       ###
######################################
def registrar_persona(request):
	if request.method == 'POST':
		nombre_us = request.POST["nombre_usuario"]
		cedula_us = request.POST['cedula_usuario']
		valor = insertar_persona(nombre_us,cedula_us)
		return HttpResponse(json.dumps(str(valor)), content_type = 'application/json;charset=utf8')
		

def insertar_persona(nombre_us,cedula_us):
	if nombre_us!='' and cedula_us!='':
	    #consultar_personas = Personas.objects.get(cedula = cedula_us)
	    recordset = Personas.objects.filter(cedula=cedula_us);
	    if recordset.exists():
	    	return 2
	    else:
	    	salvar_info = Personas(cedula = cedula_us, nombre = nombre_us)
	    	salvar_info.save()
	    	return 1	
	else:
		return 0
	