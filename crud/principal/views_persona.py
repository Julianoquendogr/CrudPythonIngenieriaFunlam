#encoding:utf-8
import json
import os
import sys
from datetime import datetime
from django import http
from django.core.serializers.python import Serializer
from django.http import HttpResponse, HttpResponseRedirect
from  django.views.decorators.csrf  import  csrf_exempt
from django.shortcuts import render_to_response, RequestContext, get_object_or_404, render 
from principal.models import Personas,Estados,TiposPersonas,TiposXPersonas
from principal.forms import PersonaForm


######################################
###         Inicio                 ### 
######################################
def inicio(request):
	formulario = PersonaForm()
	lista_tipos = TiposPersonas.objects.all().order_by('nombre_tipo')
	cantipos = TiposPersonas.objects.count()
	context = {'formulario':formulario,'lista_tipos':lista_tipos,'cantipos':cantipos}
	return render_to_response('personas.html',context, context_instance=RequestContext(request))

######################################
###    Registro de personas	       ###
######################################
def registrar_persona(request):
	if request.method == 'POST':
		cantipos = request.POST["cantipos"]
		nombre_us = request.POST["nombre_usuario"]
		cedula_us = request.POST["cedula_usuario"]
		estado_usuario = request.POST["estado_usuario"]
		fecha_usuario = request.POST["fecha_usuario"]
		fecha_usuario = datetime.strptime(fecha_usuario, '%d-%m-%Y').strftime('%Y-%m-%d')
		valor = insertar_persona(nombre_us,cedula_us,estado_usuario,fecha_usuario,cantipos,request)
	return HttpResponse(json.dumps(str(valor)), content_type = 'application/json;charset=utf8')

def insertar_persona(nombre_us,cedula_us,estado_usuario,fecha_usuario,cantipos,request):
	estadou = Estados.objects.get(id=estado_usuario)
	if nombre_us!='' and cedula_us!='':
	    recordset = Personas.objects.filter(cedula=cedula_us);
	    if recordset.exists():
	    	return 2
	    else:
	    	salvar_info = Personas(cedula = cedula_us, nombre = nombre_us, id_estado=estadou,fecha=fecha_usuario)
	    	salvar_info.save()
	    	for i in range(0,int(cantipos)): 
	    		if 'tipo'+str(i) in request.POST:	
	    			id_tipo = request.POST['tipo'+str(i)]
	    			if(id_tipo != ''):
	    				persona = Personas.objects.get(cedula=cedula_us)
	    				tipo = TiposPersonas.objects.get(id=id_tipo)
	    				personas_x_tipo = TiposXPersonas(id_persona=persona,id_tipo=tipo)
	    				personas_x_tipo.save()
	    return 1	
	else:
		return 0

@csrf_exempt
def registrar_imagen(request):
	if request.method == 'POST':
		cedula_us = request.POST["cedula_usuario"]
		if 'foto_usuario' in request.FILES:
			foto = request.FILES['foto_usuario']
			variable = ingresar_foto(foto, cedula_us)
		else:
			variable = '3'
	return HttpResponse(json.dumps(str(variable)), content_type = 'application/json;charset=utf8')

def ingresar_foto(foto, cedula):
	#try:
	fotos = str(foto)
	variable = ""
	cortar_foto = fotos.split('.')
	if cortar_foto[1] == "JPEG" or cortar_foto[1] == "jpg" or cortar_foto[1] == "jpeg" or cortar_foto[1] == "JPG":
		BASE_DIR = os.path.dirname(os.path.dirname(__file__))
		PROJECT_ROOT = os.path.dirname(os.path.realpath(__file__))
		RUTA_PROYECTO = os.path.dirname(os.path.realpath(__file__))
		MEDIA_ROOT = os.path.join(RUTA_PROYECTO,'../crud/static/images/fotos')
		nombre_foto = str(cedula)+".jpg"
		foto_pasar = open('%s/%s' % (MEDIA_ROOT, nombre_foto), 'wb')
		for chunk in foto.chunks():
			foto_pasar.write(chunk)
			pass
		foto_pasar.close()
		variable = update_imagen(nombre_foto,cedula)
	else:
		variable = '2'
	return variable;	
	pass
	#except Exception:
	#	return '0'

def update_imagen(foto,cedula):
	if cedula != "" and foto !="":
		Personas.objects.filter(cedula = cedula).update(foto = foto)
		variable = '1'
	else:
		variable = '4'
	return HttpResponse(json.dumps(str(variable)), content_type = 'application/json;charset=utf8')	

def cargar_persona(request):
	formulario = PersonaForm()
	lista_tipos = TiposPersonas.objects.all().order_by('nombre_tipo')
	cantipos = TiposPersonas.objects.count()
	context = {'formulario':formulario,'lista_tipos':lista_tipos,'cantipos':cantipos}
	return render_to_response('personas.html',context, context_instance=RequestContext(request))

######################################
###       Actualizar Personas      ###
######################################
@csrf_exempt
def modificar_persona(request):
	if request.method == 'POST':
		nombre_us = request.POST["nombre_us"]
		cedula_us = request.POST["cedula_us"]
		fecha = request.POST["fecha"]
		estado_usuario = request.POST["estado_usuario"]
		id_persona = request.POST["id_persona"]
		cuantos_tipos = request.POST["cuantos_tipos"]
		valor = actualizar_persona(nombre_us,cedula_us,fecha,estado_usuario,id_persona,cuantos_tipos,request)
	return HttpResponse(json.dumps(str(valor)), content_type = 'application/json;charset=utf8')

def actualizar_persona(nombre_us,cedula_us,fecha,estado_usuario,id_persona,cuantos_tipos,request):
	recordset = Personas.objects.filter(cedula=cedula_us)
	if recordset.exists():
		Personas.objects.filter(cedula=cedula_us).update(nombre=nombre_us,cedula=cedula_us,fecha=fecha,id_estado=estado_usuario)
		####Para modificar tabla de TiposXPersonas
		#1-Elimino los registros
		TiposXPersonas.objects.filter(id_persona=id_persona).delete()
		#2-Realizo de nuevo la inserción
		for i in range(0,int(cuantos_tipos)): 
	    		if 'tipo'+str(i) in request.POST:	
	    			id_tipo = request.POST['tipo'+str(i)]
	    			if(id_tipo != ''):
	    				persona = Personas.objects.get(cedula=cedula_us)
	    				tipo = TiposPersonas.objects.get(id=id_tipo)
	    				personas_x_tipo = TiposXPersonas(id_persona=persona,id_tipo=tipo)
	    				personas_x_tipo.save()
		####
		variable = 1
	else:
		variable = 2
	return variable		
	passdef


######################################
###      Consultar Personas        ###
######################################

def consultar_personas(request):
	caso = 'inactivo'
	if request.method == 'POST':
		actual = request.POST["actual"]
		cuantos_son = request.POST["cuantos_son"]
		cuantos_x_pagina = request.POST["cuantos_x_pagina"]
		tipo = request.POST["tipo"]
		caso = 'activo'		
	cont = 0
	cont2 = 0
	cantipos = TiposPersonas.objects.count()
	cantiper = Personas.objects.count()
	lista = TiposXPersonas.objects.all().select_related().distinct()
	#lista = TiposXPersonas.objects.all().order_by("id_persona.cedula").distinct()[0:20]
	#lista = TiposXPersonas.objects.all().annotate(count("id_persona.cedula"),distinct=true).order_by("id_persona")
	
	tipos = []
	for bus in lista:
		lista_tipos = TiposXPersonas.objects.filter(id_persona=bus.id_persona.id)
		for bus2 in lista_tipos:
			cont+=1
			if cont == 1:
				tipo_str = bus2.id_tipo.nombre_tipo
			else:
				tipo_str = tipo_str+","+bus2.id_tipo.nombre_tipo
		tipos.append(tipo_str)		
		cont2+=1  	
		tipo_str = ""
		cont = 0
	if caso == 'inactivo':	
		paginador = armar_paginacion_inic(0,cantiper,20,0,cantiper) 
	else:
		paginador = armar_paginacion_inic(actual,cuantos_son,cuantos_x_pagina,tipo,cantiper)

	cantidad = Personas.objects.all().order_by('nombre').select_related("TiposPersonas").count()
	context = { 'lista':lista,'cantipos':cantipos, 'cantidad':cantidad, 'tipos':tipos, 'paginador':paginador, 'caso':caso}
	return render_to_response('lista_personas.html', context, context_instance=RequestContext(request))

########################################
###   Consulta con paginación        ###
########################################
@csrf_exempt
def consultar_personas_pag(request):
	#Para armar la paginación...
	if request.method == 'POST':
		actual = request.POST["actual"]
		cuantos_son = request.POST["cuantos_son"]
		cuantos_x_pagina = request.POST["cuantos_x_pagina"]
		tipo = request.POST["tipo"]

	lista = Personas.objects.all().order_by('cedula').annotate()
	cuantos_tipos = Personas.objects.all().count()
	cuantas_per = Personas.objects.count()
	nombres = []
	cedula = []
	fechas = []
	estado = []
	tipos = []
	cont2 = 0
	for bus in lista:
		lista_tipos =  TiposXPersonas.objects.filter(id_persona=bus.id)
		#-- Creando las listas de tipos
		for bus2 in lista_tipos:
			cont2+=1
			if cont2 == 1:
				tipo_str = bus2.id_tipo.nombre_tipo
			else:
				tipo_str = tipo_str+","+bus2.id_tipo.nombre_tipo
				cont2 = 0	
		#--Creando las listas de personas
		fecha = bus.fecha
		nombres.append(bus.nombre)
		cedula.append(bus.cedula)
		fechas.append(fecha.isoformat())
		estado.append(bus.id_estado.nombre_estado)
		tipos.append(tipo_str)
		tipo_str = ""
	paginador = armar_paginacion_inic(actual,cuantos_son,cuantos_x_pagina,tipo,cuantas_per)
	#--
	variable = {'cedula':cedula,'nombres':nombres,'fechas':fechas, 'estado':estado, 'tipos':tipos, 'cuantos_tipos':cuantos_tipos, 'paginador': paginador};	
	return HttpResponse(json.dumps(variable), content_type = 'application/json;charset=utf8')
	
########################################
###			Consultar Personas JS	####
########################################

def consultar_personas2(request):
	context = {}
	return render_to_response('lista_personas2.html', context, context_instance=RequestContext(request))

@csrf_exempt
def consultar_personasjq(request):

	#lista = TiposXPersonas.objects.all().distinct()
	#Para armar la paginación...
	caso = 'no'
	actual = 0
	tipo_str = ""
	str_id_tipo = ""
	where = ''
	if request.method == 'POST':
		#--Var paginación:
		actual = request.POST["actual"]
		cuantos_son = request.POST["cuantos_son"]
		cuantos_x_pagina = request.POST["cuantos_x_pagina"]
		tipo = request.POST["tipo"]
		#--Var Filtros:
		filtro_name = request.POST["filtro_name"]
		filtro_ci = request.POST["filtro_ci"]
		caso = 'si'
	else:
		filtro_name = ''
		filtro_ci = ''	
	###
	cuantas_per = Personas.objects.count()
	cuantos_tipos = Personas.objects.all().count()
	###
	if caso == 'no':
		paginador = armar_paginacion_inic(0,cuantas_per,20,0,cuantas_per) 
	else:
		paginador = armar_paginacion_inic(actual,cuantos_son,cuantos_x_pagina,tipo,cuantas_per)
	#lista = Personas.objects.all().order_by('cedula').annotate()
	#--
	#Para filtar:
	if filtro_name !="" or filtro_ci!="":
		if filtro_name !="" and filtro_ci!="":
			lista = Personas.objects.filter(nombre=filtro_name,cedula=filtro_ci).order_by('cedula')[paginador["offset_tabla"]:]
		else:
			if filtro_name != "":
		   	    lista = Personas.objects.filter(nombre=filtro_name).order_by('cedula')[paginador["offset_tabla"]:]
			elif filtro_ci != "":
				lista = Personas.objects.filter(cedula=filtro_ci).order_by('cedula')[paginador["offset_tabla"]:]
	else:
		lista = Personas.objects.all().order_by('cedula')[paginador["offset_tabla"]:]
	#cuantos_tipos = Personas.objects.all().count()
	#cuantas_per = Personas.objects.count()
	nombres = []
	cedula = []
	fechas = []
	estado = []
	tipos = []
	id_estado = []
	id_tipo = []
	todos_tipos = []
	todos_id_tipos = []
	id_persona = []
	cont2 = 0
	#--Para recorrer todos los tipos de personas
	t_tipos = TiposPersonas.objects.all()
	for bus_tp in t_tipos:
		todos_tipos.append(bus_tp.nombre_tipo)
		todos_id_tipos.append(bus_tp.id)
	#--
	for bus in lista:
		lista_tipos =  TiposXPersonas.objects.filter(id_persona=bus.id)
		#-- Creando las listas de tipos
		for bus2 in lista_tipos:
			cont2=cont2+1
			if cont2 == 1:
				tipo_str = bus2.id_tipo.nombre_tipo
				str_id_tipo = str(bus2.id_tipo.id)
			else:
				tipo_str = tipo_str+","+bus2.id_tipo.nombre_tipo
				str_id_tipo = str_id_tipo+","+str(bus2.id_tipo.id)
		cont2 = 0	
		#--Creando las listas de personas

		fecha = bus.fecha
		nombres.append(bus.nombre)
		cedula.append(bus.cedula)
		fechas.append(fecha.isoformat())
		estado.append(bus.id_estado.nombre_estado)
		tipos.append(tipo_str)
		id_estado.append(bus.id_estado.id)
		id_tipo.append(str_id_tipo)
		id_persona.append(bus.id)
		#if caso == 'no':
		#	paginador = armar_paginacion_inic(0,cuantas_per,20,0,cuantas_per) 
		#else:
		#	paginador = armar_paginacion_inic(actual,cuantos_son,cuantos_x_pagina,tipo,cuantas_per)
		#--
	variable = {'cedula':cedula,'nombres':nombres,'fechas':fechas, 'estado':estado, 'tipos':tipos, 'cuantos_tipos':cuantos_tipos, 'paginador': paginador, 'id_estado': id_estado, 'id_tipo':id_tipo, 'todos_tipos':todos_tipos, 'todos_id_tipos':todos_id_tipos, 'id_persona' : id_persona	};	
	return HttpResponse(json.dumps(variable), content_type = 'application/json;charset=utf8')

########################################
###Para armar paginacion de consulta####
########################################

def armar_paginacion_inic(actual1, cuantos_son1, cuantos_x_pagina1, tipos, cuantos_bd1):
	offset = 0
	dicc_tabla = ''
	#---------------------------------
	actual = int(actual1)
	cuantos_son = int(cuantos_son1)
	cuantos_x_pagina =  int(cuantos_x_pagina1)
	cuantos_bd = int(cuantos_bd1)
	tipo = str(tipos)
	#---------------------------------
	if cuantos_son == 0  or tipo == 3:
		cuantos_son_tabla = cuantos_bd
	else:
		cuantos_son_tabla = cuantos_son
	#Calculo a que página debe ir
	if tipo == '0':
		offset = 0;
		#calculo los limites
		dicc_tabla = calculo_limites(offset,cuantos_son_tabla,1)

	if tipo == '1':
		offset = actual + cuantos_x_pagina
		#calculo de limites
		dicc_tabla = calculo_limites(offset,cuantos_son_tabla,1)

	if tipo == '2':
		offset = actual - cuantos_x_pagina
		#calculo de limites
		dicc_tabla = calculo_limites(offset,cuantos_son_tabla,2)

	if tipo == '3':
		offset = int(actual)
		if actual == cuantos_son_tabla:
			offset = 0
			dicc_tabla = calculo_limites(offset,cuantos_son_tabla,1)	

	#para ocultar siguiente
	offset_sig = offset + cuantos_x_pagina
	clase_sig = ""
	if offset_sig == cuantos_son_tabla or offset_sig > cuantos_son_tabla:
		clase_sig = "disabled"		

	#para ocultar anterior
	if offset == 0:
		clase_ant = "disabled"
	else:
		clase_ant = ""
	#
	if cuantos_son_tabla > 0:
		clase_tabla = 'show'
		clase_tickets = 'hide'
	else:
		clase_tabla = 'hide'
		clase_tickets = 'show'
	###
	###-Ordenando las variables
	vect_tabla = dicc_tabla.split("-")
	###	
	diccionario = {
						'clase_paginador_siguiente' : clase_sig,
						'clase_paginador_anterior' : clase_ant,
						'offset_tabla' : offset,
						'cuantos_tabla': cuantos_son_tabla,
						'inicio_tabla' : vect_tabla[0],
						'fin_tabla': vect_tabla[1],
						'clase_tabla': clase_tabla,
						'clase_tickets': clase_tabla,
						'tipo':offset
	}

	return diccionario

def calculo_limites(offset,cuantos_son,tipo):
	inicio_tabla = offset+1
	valor = offset+20;

	if valor >= cuantos_son:
		fin_tabla = cuantos_son
	else:
		fin_tabla = valor

	if cuantos_son == 0:
		inicio_tabla = 0

	dicc_tabla = str(inicio_tabla)+"-"+str(fin_tabla)
	return dicc_tabla