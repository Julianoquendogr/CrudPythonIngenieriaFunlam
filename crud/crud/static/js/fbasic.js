//Script que contiene funciones básicas de javascript utilizadas en diversos modulos del sistema.
//funciones mde validaciones de longitud
function  validar_longitud(campo,longitud)
{
  var campo_sin_espacios = $.trim($(campo).val());
  if(campo_sin_espacios.length < longitud)
  {
     return false;
  }
  else
    return true
}
//funciones de validaciones
function valida(e,s,i,l)
{   
  tecla = (document.all) ? e.keyCode : e.which; 
  if (tecla==8 || tecla==0 || tecla==13) return true;
  //Exepcion barras y barras invertidas
  if(tecla == 47 || tecla == 92) return false;
  if (s.value.length>=l) return false;
        
  if (i==0) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz]/;  // 0 Solo acepta letras
  if (i==1) patron = /[0123456789,.%]/;     // 1 Solo acepta n�meros
  if (i==2) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789]/;      // 2 Acepta n�meros y letras
  if (i==3) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789��������������\s]/;
  if (i==4) patron=  /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz��������������\s]/;
  if (i==5) patron=  /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@._-]/; // Formato Correo Electronico
  if (i==6) patron=  /[ABCDEFabcdef0123456789]/;
  if (i==7) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789��������������()@:;_\-.,/\s]/;
  if (i==8) patron = /[01]/;
  if (i==9) patron = /[GJV0123456789]/; //Formato de RIF
  if (i==10)patron = /[0123456789]/;
  if (i==11)patron = /[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789. %()_-]/; 
  if (i==12)patron = /[gjveGJVE0123456789]/;  //RIF
  if (i==13) patron = /[0123456789,]/; 
  if (i==14) patron=  /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._-]/; // Formato Nick Correo Electronico
  if (i==15) patron=  /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@.]/; // Formato direccion manual Correo Electronico
  if (i==16) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzáéíóúÁÉÍÓÚ\w]/;  // 0 Solo acepta letras y comas
  if (i==17) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\s,.]/; // Acepta n�meros, letras, espacios ,.
  if (i==18) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\wáéíóúÁÉÍÓÚñÑ0123456789.,;()+-_=#*?¿{}$!\s]/; // Acepta n�meros, letras, espacios ,.
  if (i==19) patron=  /[A-Za-zñÑ'áéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛÑñäëïöüÄËÏÖÜ\s\t]/; 
  if (i==20) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*.,;%()+-_=?¿{}$!]/; // Acepta clave para el ldap

  te = String.fromCharCode(tecla);
  return patron.test(te);
} 
function valida2(s,i,l)
{
  if (i==0) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz]/;  // 0 Solo acepta letras
  if (i==1) patron = /[0123456789,.%]/;     // 1 Solo acepta n�meros
  if (i==2) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789]/;      // 2 Acepta n�meros y letras
  if (i==3) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789��������������\s]/;
  if (i==4) patron=  /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz��������������\s]/;
  if (i==5) patron=  /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@._-]/;
  if (i==6) patron=  /[ABCDEFabcdef0123456789]/;
  if (i==7) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789��������������()@:;_\-.,/\s]/;
  if (i==8) patron = /[01]/;
  if (i==9) patron = /[GJV0123456789]/;
  if (i==10)patron = /[0123456789]/;
  if (i==11)patron = /[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789. %()_-]/;   
  if (i==12)patron = /[gjveGJVE0123456789]/;  //RIF
  if (i==13) patron = /[0123456789,]/; 
  if (i==14) patron=  /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._-]/; // Formato Nick Correo Electronico
  if (i==15) patron=  /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@.]/; // Formato direccion manual Correo Electronico
  if (i==16) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz]/;  // 0 Solo acepta letras y comas
  if (i==17) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\s,.]/; // 2 Acepta n�meros, letras, espacios ,.
  if (i==18) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\wáéíóúÁÉÍÓÚñÑ0123456789.,;()+-_=#*?¿{}$!\s]/; // Acepta n�meros, letras, espacios ,.
  if (i==19) patron=  /[A-Za-zñÑ'áéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛÑñäëïöüÄËÏÖÜ\s\t]/;
  if (i==20) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*.,;%()+-_=?¿{}$!]/; // Acepta clave para el ldap
  r="";
  ll=0;
  for (i=0;i<s.value.length;i++)
  {
    if (patron.test(s.value.charAt(i)))
    {
      r=r+s.value.charAt(i);
      ll++;
      if (ll==l) break;
    }
  }
  
  return s.value=r;
}
//--Bloque de funciones para los mensajes emergenetes
//funcion para crear estructura modal preconfigurado por el usuario
function crear_modal(texto)
{
  var cuerpo=texto;
  var cabecera='<h3 class="modal-title" id="myModalLabel" name="myModalLabel" >Informaci&oacute;n:</h3>';
  //$("#cuerpo_mensaje").css({"height":"auto"});
  $("#cuerpo_mensaje").removeClass("cuerpo_normal").removeClass("cuerpo_xdefecto").removeClass("cuerpo_astecnico").addClass("cuerpo_auto");
  $("#cabecera_mensaje").html(cabecera);
  $("#cuerpo_mensaje").html(cuerpo);
}
//funcion que inserta el mensaje dentro el modal
function mensajes(texto)
{
  crear_modal(texto);
  $("#modal_mensaje").modal("show");
}
//funcion para crear estructura modal2 preconfigurado por el usuario
function crear_modal2(texto)
{
  var cuerpo2=texto;
  var cabecera2='<h3 class="modal-title" id="myModalLabel2" name="myModalLabel2" >Informaci&oacute;n:</h3>';
  //$("#cuerpo_mensaje").css({"height":"auto"});
  $("#cuerpo_mensaje2").removeClass("cuerpo_normal").removeClass("cuerpo_xdefecto").removeClass("cuerpo_astecnico").addClass("cuerpo_auto");
  $("#cabecera_mensaje2").html(cabecera2);
  $("#cuerpo_mensaje2").html(cuerpo2);
}
//funcion que inserta el mensaje dentro el modal2
function mensajes_modal2(texto)
{
  crear_modal2(texto);
  $("#modal_mensaje2").modal("show");
}
//--Fin del bloque
function cambiar_formato(fecha_hora)
{
  var fecha = fecha_hora.substr(8,2)+"/"+fecha_hora.substr(5,2)+"/"+fecha_hora.substr(0,4)+" "+fecha_hora.substr(10);
  return fecha;
}
//Para activar las características de la ventana de gráficos
function activar_grafico()
{
  $("#guardar_apelacion,#cancelar_apelacion,#aceptar_eliminacion,#cancelar_eliminacion,#guardar_solticket,#cancelar_solticket,#aceptar_salir,#cancelar_salir").css({"display":"none"});
  $("#guardar_apel_solticket,#cancelar_apel_solticket").css({"display":"none"});
  $("#aceptar_mensaje").css({"display":"block"});
  $("#ventana_desc").removeClass("ventana_peque").removeClass("ventana_grande").removeClass("ventana_normal").removeClass("ventana_adm").removeClass("ventana_peque");
  $("#ventana_desc").addClass("ventana_grafico");
  $("#cuerpo_mensaje").addClass("cuerpo_auto").addClass("modal-body");
}
//Para activar los botones de salir del sistema
function activar_botones_salir()
{
  $("#aceptar_salir,#cancelar_salir").css({"display":"block"});
  $("#aceptar_mensaje,#aceptar_eliminacion,#cancelar_eliminacion,#guardar_apelacion,#cancelar_apelacion,#guardar_solticket,#cancelar_solticket").css({"display":"none"});
  $("#guardar_apel_solticket,#cancelar_apel_solticket").css({"display":"none"});
  $("#ventana_desc").removeClass("ventana_grafico");
  $("#ventana_desc").removeClass("ventana_peque").removeClass("ventana_grande").removeClass("ventana_normal").removeClass("ventana_adm").addClass("ventana_peque");
  $("#cuerpo_mensaje").addClass("cuerpo_auto").addClass("modal-body");
}
//Para ampliar el tamaño del modal
function activar_historial_sol(){
  $("#cuerpo_mensaje").removeClass("cuerpo_resumen").removeClass("cuerpo_auto").removeClass("cuerpo_xdefecto").removeClass("cuerpo_astecnico").removeClass("cuerpo_normal");
  $("#cuerpo_mensaje").addClass("cuerpo_sol");
}
//Activación de entorno de soluciones
function activar_solticket(){
  $("#guardar_solticket,#cancelar_solticket").css({"display":"block"});
  $("#aceptar_mensaje,#aceptar_eliminacion,#cancelar_eliminacion,#guardar_apelacion,#cancelar_apelacion,#aceptar_salir,#cancelar_salir").css({"display":"none"});
  $("#guardar_apel_solticket,#cancelar_apel_solticket").css({"display":"none"});
  $("#cuerpo_mensaje").removeClass("cuerpo_resumen").removeClass("cuerpo_auto").removeClass("cuerpo_xdefecto").removeClass("cuerpo_astecnico").addClass("cuerpo_normal");
  $("#cuerpo_mensaje").removeClass("cuerpo_sol");
  $("#ventana_desc").removeClass("ventana_peque").removeClass("ventana_grande").removeClass("ventana_adm").addClass("ventana_normal");
  $("#ventana_desc").removeClass("ventana_grafico");
  $("#cuerpo_mensaje").addClass("modal-body");
}
//--Activación de entorno de apelaciones soluciones
function activar_apel_solticket(){
  $("#guardar_apel_solticket,#cancelar_apel_solticket").css({"display":"block"});
  $("#aceptar_mensaje,#aceptar_eliminacion,#cancelar_eliminacion,#guardar_apelacion,#cancelar_apelacion,#aceptar_salir,#cancelar_salir").css({"display":"none"});
  $("#guardar_solticket,#cancelar_solticket").css({"display":"none"});
  $("#cuerpo_mensaje").removeClass("cuerpo_resumen").removeClass("cuerpo_auto").removeClass("cuerpo_xdefecto").removeClass("cuerpo_astecnico").addClass("cuerpo_normal");
  $("#cuerpo_mensaje").removeClass("cuerpo_sol");
  $("#ventana_desc").removeClass("ventana_peque").removeClass("ventana_grande").removeClass("ventana_adm").addClass("ventana_normal");
  $("#ventana_desc").removeClass("ventana_grafico");
  $("#cuerpo_mensaje").addClass("modal-body");
}
//--Activación de entorno guardar apelación
function  activar_formulario_modal()
{
  $("#guardar_apelacion,#cancelar_apelacion").css({"display":"block"});
  $("#aceptar_mensaje,#aceptar_eliminacion,#cancelar_eliminacion,#guardar_solticket,#cancelar_solticket,#aceptar_salir,#cancelar_salir").css({"display":"none"});
  $("#guardar_apel_solticket,#cancelar_apel_solticket").css({"display":"none"});
  $("#ventana_desc").removeClass("ventana_peque").removeClass("ventana_grande").removeClass("ventana_adm").addClass("ventana_normal");
  $("#ventana_desc").removeClass("ventana_grafico");
  $("#cuerpo_mensaje").addClass("modal-body");
  $("#cuerpo_mensaje").addClass("cuerpo_auto");
}
//--Activación de entorno resumén ticket
function activar_resumen_ticket()
{
  $("#guardar_apelacion,#cancelar_apelacion,#aceptar_eliminacion,#cancelar_eliminacion,#guardar_solticket,#cancelar_solticket,#aceptar_salir,#cancelar_salir").css({"display":"none"});
  $("#guardar_apel_solticket,#cancelar_apel_solticket").css({"display":"none"});
  $("#aceptar_mensaje").css({"display":"block"});
  $("#ventana_desc").removeClass("ventana_grafico");
  $("#ventana_desc").removeClass("ventana_peque").removeClass("ventana_grande").removeClass("ventana_adm").addClass("ventana_normal");
  $("#cuerpo_mensaje").removeClass("cuerpo_resumen").removeClass("cuerpo_auto").removeClass("cuerpo_normal").removeClass("cuerpo_astecnico").addClass("cuerpo_xdefecto");
  $("#cuerpo_mensaje").addClass("modal-body");
  $("#cuerpo_mensaje").removeClass("cuerpo_sol");

}
//Para la ventana de soluciones
function activar_solucion()
{
  $("#guardar_apelacion,#cancelar_apelacion").css({"display":"block"});
  $("#guardar_apelacion,#cancelar_apelacion,#aceptar_eliminacion,#cancelar_eliminacion,#guardar_solticket,#cancelar_solticket,#aceptar_salir,#cancelar_salir").css({"display":"none"});
  $("#guardar_apel_solticket,#cancelar_apel_solticket").css({"display":"none"});
  $("#ventana_desc").removeClass("ventana_grafico");
  $("#ventana_desc").removeClass("ventana_peque").removeClass("ventana_grande").removeClass("ventana_adm").addClass("ventana_normal");
  $("#cuerpo_mensaje").removeClass("modal-body");
  $("#cuerpo_mensaje").removeClass("cuerpo_auto");
}
//Para la ventana de administracion de tickets
function activar_astecnico()
{
  $("#aceptar_mensaje").css({"display":"block"});
  $("#guardar_apelacion,#cancelar_apelacion,#aceptar_eliminacion,#cancelar_eliminacion,#guardar_solticket,#cancelar_solticket,#aceptar_salir,#cancelar_salir").css({"display":"none"});
  $("#guardar_apel_solticket,#cancelar_apel_solticket").css({"display":"none"});
  //$("#ventana_desc").css({"min-height":"700px","height":"auto"});
  $("#ventana_desc").css({"height":"auto"});
  $("#ventana_desc").removeClass("ventana_peque").removeClass("ventana_grande").removeClass("ventana_normal").addClass("ventana_adm");
  $("#ventana_desc").removeClass("ventana_grafico");
  $("#cuerpo_mensaje").removeClass("cuerpo_resumen").removeClass("cuerpo_auto").removeClass("cuerpo_normal").removeClass("cuerpo_xdefecto").addClass("cuerpo_astecnico");
  $("#cuerpo_mensaje").removeClass("modal-body");
  $("#cuerpo_mensaje").removeClass("cuerpo_sol");
}
//Para restar caracteres de textarea
function restar_caracteres(campo,campo2)
{
    var value = $(campo).val().length;
    value = 400 - value;
    $(campo2).html(value);
}
//Mensaje de validacion
function mensaje_validacion(campo, mensaje)
{
  $(campo).addClass("alert alert-danger").removeClass("alert alert-success");
  $(campo).html(mensaje);
  setTimeout(function()
  {
    $(campo).fadeOut(1400);
  },2000);
  $(campo).show();
}
//Mensaje de validacion afirmativo
function mensaje_afirmativo(campo, mensaje)
{
  mensaje = "<i class='fa fa-check'></i> "+mensaje;
  $(campo).removeClass("alert alert-info").removeClass("alert alert-danger").addClass("alert alert-success");
  $(campo).html(mensaje);
  setTimeout(function()
  {
    $(campo).fadeOut(1400);
  },2000);
  $(campo).show();
}
//Mensaje:Registro 
function mensaje_registro(campo,campos_bloquear)
{
  $(campo).removeClass("alert alert-danger").removeClass("alert alert-info").addClass("alert alert-success");
  $(campo).html("");
  $(campo).html("<i class='fa fa-check'></i> Registro realizado de manera exitosa");
  if(campos_bloquear!="")
  {
      bloquear_pantalla(campos_bloquear);
  }
}
//Mensaje:No registro
function mensaje_noregistro(campo)
{
  $(campo).removeClass("alert alert-success").removeClass("alert alert-info").addClass("alert alert-danger");
  $(campo).html("");
  $(campo).html("<i class='fa fa-exclamation-circle'></i> Ocurrió un error durante el proceso de registro");
}
//Mensaje:No registro
function mensaje_noregistro_correo(campo)
{
  $(campo).removeClass("alert alert-success").removeClass("alert alert-info").addClass("alert alert-danger");
  $(campo).html("");
  $(campo).html("<i class='fa fa-exclamation-circle'></i> Proceso realizado satisfactoriamente pero ocurri&oacute; un error en el env&iacute;o de correo");
}
//Mensaje Blanco
function mensaje_blanco(campo)
{
  $(campo).removeClass("alert alert-success").removeClass("alert alert-info").addClass("alert alert-danger");
  $(campo).html("");
  $(campo).html("<i class='fa fa-exclamation-circle'></i> No puede registrar una lista de técnicos en blanco");
}
//Bloquear cualquier pantalla
function bloquear_pantalla(campos)
{
  $(campos).attr("disabled","disabled");
}
//Desbloquear cualquier pantalla apelacion
function desbloquear_pantalla(campos)
{
  $(campos).attr("disabled",false);
}
//Activa botones para usar mensaje modal como confirm
function activar_formulario_confirm()
{
  $("#guardar_apelacion,#cancelar_apelacion,#aceptar_mensaje,#guardar_solticket,#cancelar_solticket,#aceptar_salir,#cancelar_salir").css({"display":"none"});
  $("#guardar_apel_solticket,#cancelar_apel_solticket").css({"display":"none"});
  $("#ventana_desc").removeClass("ventana_normal").removeClass("ventana_adm").removeClass("ventana_grande").addClass("ventana_peque");
  $("#ventana_desc").removeClass("ventana_grafico");
  $("#aceptar_eliminacion,#cancelar_eliminacion").css({"display":"block"});
  $("#cuerpo_mensaje").removeClass("cuerpo_resumen").removeClass("cuerpo_auto").removeClass("cuerpo_normal").removeClass("cuerpo_astecnico").addClass("cuerpo_xdefecto");
  $("#cuerpo_mensaje").addClass("modal-body");
  $("#cuerpo_mensaje").removeClass("cuerpo_sol");
}
//Mensaje:Elimino 
function mensaje_elimino(campo)
{
  $(campo).removeClass("alert alert-danger").removeClass("alert alert-info").addClass("alert alert-success");
  $(campo).html("<i class='fa fa-check'></i> Solicitud eliminada");
}
//Mensaje:No elimino
function mensaje_noelimino(campo)
{
  $(campo).addClass("alert alert-danger");
  $(campo).html("<i class='fa fa-exclamation-circle'></i> Ocurrió un error durante el proceso de registro");
}
//Para los uploaders al momento de guardar
function uploader_reg(campo,campos_bloquear)
{
  $(campo).css({"display":"block"});
  $(campo).removeClass("alert alert-danger").removeClass("alert alert-success").addClass("alert alert-info");
  $(campo).html("");
  $(campo).html("<i class='fa fa-spinner fa-pulse'></i> Por favor espere unos segundos mientras se ejecuta el proceso");
  if(campos_bloquear!="")
  {
      bloquear_pantalla(campos_bloquear);
  }
}
//Para redimensionar pantalla modal de asignaciones apelaciones
function activar_formulario2_asigapl()
{
  $("#ventana_desc2").addClass("ventana_normal");
  $("#cuerpo_mensaje2").removeClass("cuerpo_auto").addClass("cuerpo_asignacion_apl");
  $("#aceptar_mensaje2").css({"display":"none"});
}
//Para redimensionar pantalla para tablas con listas
function adaptar_sistema_auto()
{
  $("#cuerpo_sistema").css({"height":"auto"});
  $("#cuerpo_sistema").css({"min-height":"400px","overflow-y":"hidden"});
}
//Para redimensionar pantalla basicas
function adaptar_sistema_cien()
{
  $("#cuerpo_sistema,body").css({"height":"100%","min-height":"400px"});
 //$("#cuerpo_sistema").css({"height":"800px","min-height": "800px"});
}
//Para validar que el texto no tenga mas de un espacio en blanco
function quitar_espacios(texto,campo){
 var cadena="";
 var texto2="";
 //cadena = texto.replace(/-+/g," "); 
 cadena = texto.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, ' ');
 $(campo).val(cadena);
 alert(cadena);
 alert("Este es el texto:"+texto);
}
//Para evitar ir hacia atras 
function nobackbutton(){
  window.location.hash="";
  window.location.hash="Again-No-back-buttonsafgasf";
  window.onhashchange=function(){
    window.location.hash="";
  }
}
//--Para cargar la ventana predeterminada
function cargar_ventana_predeterminada(){
  //Si el tab de crea ticket está activa
  if( $("#opmenu_crear_ticket").hasClass('active')){
      carga_crear_ticket();//Carga el div solñucion
  }
  //Si el tab de sugerencias esta activa
  if( $("#opmenu_sugerencias").hasClass('active')){
    carga_sugerencias();
  }
  //Si el tab de Misticket esta activa
  if( $("#opmenu_mis_tickets").hasClass('active')){
    carga_mistickets();
  }
  //Si el tab de admin_tickets esta activa
  if( $("#opmenu_admin_tickets").hasClass('active')){
    carga_admintickets();
  }
  //Si el tab de sol_tickets está activa
  if( $("#opmenu_sol_tickets").hasClass('active')){
      carga_solucion();//Carga el div solucion
  }
  //Si el tab de admin sistema está activa
  if( $("#opmenu_adminsistema").hasClass('active')){
      carga_adminsistema();//Carga el div de admin sistema
  }
}
//--Para formatear el campo fecha
function IsNumeric(valor) 
{ 
  var log=valor.length; var sw="S"; 
  for (x=0; x<log; x++) 
  { 
    v1=valor.substr(x,1); 
    v2 = parseInt(v1); 
    //Compruebo si es un valor num?rico 
    if (isNaN(v2))
    { 
      sw= "N";
    } 
  } 
  if (sw=="S") 
  {
    return true;
  } 
  else 
  {
    return false;
  } 
} 
//--
var primerslap=false; 
var segundoslap=false; 
function formateafecha(fecha) 
{ 
    var long = fecha.length; 
    var dia; 
    var mes; 
    var ano; 
    if ((long>=2) && (primerslap==false)) { dia=fecha.substr(0,2); 
    if ((IsNumeric(dia)==true) && (dia<=31) && (dia!="00")) { 
      fecha=fecha.substr(0,2)+"-"+fecha.substr(3,7); 
      primerslap=true; } 
    else { 
      fecha=""; primerslap=false;} 
    } 
    else
    {
       dia=fecha.substr(0,1); 
      if (IsNumeric(dia)==false) 
      {
        fecha="";} 
        if ((long<=2) && (primerslap=true)) {fecha=fecha.substr(0,1); primerslap=false; } 
      } 
      if ((long>=5) && (segundoslap==false)) 
      { 
        mes=fecha.substr(3,2); 
        if ((IsNumeric(mes)==true) &&(mes<=12) && (mes!="00")) 
        { 
          fecha=fecha.substr(0,5)+"-"+fecha.substr(6,4); 
          segundoslap=true; 
        } 
        else 
        { 
          fecha=fecha.substr(0,3); segundoslap=false;
        } 
    } 
    else 
    { 
      if ((long<=5) && (segundoslap=true)) 
      { 
        fecha=fecha.substr(0,4); segundoslap=false; 
      } 
    } 
    if (long>=7) 
    { 
      ano=fecha.substr(6,4); 
      if (IsNumeric(ano)==false) 
      { 
        fecha=fecha.substr(0,6); 
      } 
    else 
    { 
      if (long==10){ if ((ano==0) || (ano<1900) || (ano>2100)) { fecha=fecha.substr(0,6); } } } 
    } 
    if (long>=10) 
    { 
      fecha=fecha.substr(0,10); 
      dia=fecha.substr(0,2); 
      mes=fecha.substr(3,2); 
      ano=fecha.substr(6,4); 
    // A?o no viciesto y es febrero y el dia es mayor a 28 
    if ( 
    ((ano%4 != 0) && (mes ==02) && (dia > 28)) || 
    ((mes ==02) && (dia >= 30)) || 
    ((mes ==02) && (dia >= 31)) || 
    ((mes ==04) && (dia >= 31)) || 
    ((mes ==06) && (dia >= 31)) || 
    ((mes =='09') && (dia >= 31)) || 
    ((mes ==11) && (dia >= 31)) 
    )
    { 
      fecha=fecha.substr(0,2)+"-";} 
    } 
    return (fecha); 
} 
//Funcion que se encarga de transformar el formato de una fecha, para compararlo posteriormente...
function validar_fecha_formato(fecha_transformar)
{
  vector_fecha_d = fecha_transformar.split("-");
  var fecha_r = new Date(vector_fecha_d[2],(vector_fecha_d[1]-1),vector_fecha_d[0]);
  return fecha_r; 
}
//--Función que sustituye los &(vocal)acute; por acentos
function remplazar_acentos_acute(cadena1){
  var cadena = "";
  cadena = cadena1.replace("&aacute;","á");
  cadena = cadena.replace("&eacute;","é");
  cadena = cadena.replace("&iacute;","í");
  cadena = cadena.replace("&oacute;","ó");
  cadena = cadena.replace("&uacute;","ú");
  return cadena;
}
//--Funcion que se encarga de limpiar los acentos de un vector
function limpiar_acentos(vector){
  for(i=0;i<vector.length;i++){
        vector[i][0] = remplazar_acentos_acute(vector[i][0]);
  }
}
//--
function comArr(unitsArray) { 
  var outarr = [];
  for (var i = 0; i < unitsArray.length; i++) { 
    outarr[i] = [i, unitsArray[i]];
  }
return outarr;
} 
//--
function val_correo(campo)
{
  var exr = /^\w+[a-z_0-9\-\.]+@\w+[0-9a-z\-\.]+\.[a-z]{2,4}$/i;
    if(!(exr.test(campo.value)))
    {
      campo.value="";
    }
}
//--
function formato_tlf(tlf,origen)
{
  //--
  var telefono = tlf.value.substring(0,4);
  var longitud = tlf.value.length;
  var telefono_local = tlf.value.substring(0,2);
  //alert(longitud_local);
  if(((telefono_local!="02")&&(telefono!="0414")&&(telefono!="0416")&&(telefono!="0426")&&(telefono!="0424"))||(longitud!=11))
  {
      tlf.value="";
      switch (origen)
      {
        case 1:
          mensaje_validacion("#alert-validacion", "Debe ingresar un n° de tel&eacute;fono v&aacute;lido de 11 d&iacute;gitos, considerando c&oacute;digo de operadora");
          break;
      } 
  }
  //--
}
//Mensaje de validacion
function mensaje_validacion(campo, mensaje)
{
  mensaje = "<i class='fa fa-exclamation-circle'></i> "+mensaje;
  $(campo).addClass("alert alert-danger");
  $(campo).html(mensaje);
  setTimeout(function()
  {
    $(campo).fadeOut(1400);
  },2000);
  $(campo).show();
}
//Para cerrar modals
function cerrar_mensaje(){
  setTimeout(function()
  {
     $("#cerrar_mensaje").click();
  },2000);
}
//--
