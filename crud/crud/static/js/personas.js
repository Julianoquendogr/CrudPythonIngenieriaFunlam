//--Bloque de Eventos
$(document).ready(function(){
//--	
	$("#guardar_us").click(function(){
		var nombre_usuario = $("#id_nombre_usuario").val();
		var cedula_usuario = $("#id_cedula_usuario").val();
		var estado_usuario = $("#id_estado_usuario").val();
		var cantipos = $("#cantipos").val();
		var fecha_usuario = cambiar_formato_fecha($("#id_fecha_usuario").val());
		var csrfmiddlewaretoken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
		var data = {
						'nombre_usuario':nombre_usuario,
						'cedula_usuario':cedula_usuario,
						'estado_usuario':estado_usuario,
						'fecha_usuario':fecha_usuario,
						'cantipos':cantipos,
						'csrfmiddlewaretoken':csrfmiddlewaretoken
		};
		var formulario = new FormData($("#formulario")[0]);
		$.ajax({
					url:'/registrar/persona',
					type: 'POST',
    				data: formulario,
					cache:false,
					contentType: false,
    				processData: false,
					error:function(resp){
						console.log(resp);
						//debe ir mensaje de alerta
					},
					success:function(html){
						if(html==1){
							//El registro fue exitoso...
							cargar_imagen();
						}else if(html==2){
							//Ya existe el número de usuario...
							mensaje_validacion("#respuesta","Yá existe el n&uacute;mero de c&eacute;dula");
						}else{
							//Ocurri&oacute; un error inesperado...
							mensaje_validacion("#respuesta","Ocurri&oacute; un error inesperado");
						}
					}
		});
	});
//--
	/*var config = { 
	   	'.chosen-select'           : {},
	      '.chosen-select-deselect'  : {allow_single_deselect:true},
	      '.chosen-select-no-single' : {disable_search_threshold:10},
	      '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
	      '.chosen-select-width'     : {width:"95%"}
	   } 
	   for (var selector in config) {
	   	$(selector).chosen(config[selector]);
	   }	
	   $(".chosen-select").chosen();
	   if($("#id_estado_usuario").val()){
	   	$('#id_estado_usuario').prepend(new Option('SELECCIONE...', '0', true, true));	
			$('#id_estado_usuario').trigger("chosen:updated");			
	   }*/
	$('.chosen').chosen({
    	no_results_text: "No hemos encontrado resultados!",
		allow_single_deselect: true
	});

	if($("#id_estado_usuario").val()){
	   	$('#id_estado_usuario').prepend(new Option('SELECCIONE...', '0', true, true));	
			$('#id_estado_usuario').trigger("chosen:updated");			
	}

	$("#id_fecha_usuario").datetimepicker({ 
	    lang:'es',
	    minDate:0,
	    timepicker:true,
	    format:'d-m-Y',
	    formatDate:'Y-m-d',
	});
//--	
});
//--Bloque de funciones

function cambiar_formato_fecha(fecha){
	var fecha2 = fecha.substring(6,10)+"-"+fecha.substring(3,5)+"-"+fecha.substring(0,2);
	return fecha2;
}

function cargar_imagen(){
	var formulario = new FormData($("#formulario")[0]);
	$.ajax({
			url:'/registrar/imagen',
			type:'POST',
			data:formulario,
			cache : false,
			contentType: false,
    		processData: false,
    		error:function(resp){
				console.log(resp);
			//debe ir mensaje de alerta
			},
			success:function(html){
			    if(html==3){
			    	mensaje_validacion("#respuesta","Se realiz&oacute; el registro, pero ocurri&oacute; un error inesperado al cargar imagen");
			    }else if(html==2){
			    	mensaje_validacion("#respuesta","Se realiz&oacute; el registro, la imag&eacute;n no se carg&oacute;, esta debe estar en formato JPG");
			    }else if(html==4){
			    	mensaje_validacion("#respuesta","Se realiz&oacute; el registro, hubo un error actualizando la imagen cargada");
			    }else if(html==0){
			    	mensaje_validacion("#respuesta","Se realiz&oacute; el registro, pero ocurri&oacute; un error inesperado actualizando imagen");
			    }
			    else{
			    	mensaje_afirmativo("#respuesta","Registro realizado con &eacute;xito");	
			    }    
			}
					
	});
}