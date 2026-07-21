// ===== SIMULADOR =====

function generarPublicidad() {

let intereses = [];

document.querySelectorAll("#simulador input:checked").forEach(item => {
    intereses.push(item.value);
});

const resultado = document.getElementById("resultado");

if(intereses.length === 0){
    resultado.innerHTML = "Selecciona al menos un interés.";
    return;
}

resultado.innerHTML = `
<h3>Anuncio Personalizado</h3>
<p>Según tus intereses en <b>${intereses.join(", ")}</b>, podrías recibir anuncios sobre estos temas.</p>
`;

}

// ===== QUIZ =====

const preguntas = [

{
pregunta:"¿Qué es la publicidad personalizada?",
opciones:[
"Publicidad basada en intereses",
"Publicidad al azar",
"Publicidad en periódicos",
"Publicidad sin datos"
],
correcta:0
},

{
pregunta:"¿Qué utilizan las empresas para personalizar anuncios?",
opciones:[
"Datos del usuario",
"Colores favoritos",
"Clima",
"Azar"
],
correcta:0
},

{
pregunta:"¿Cuál es un beneficio?",
opciones:[
"Mayor relevancia",
"Menos ventas",
"Más spam",
"Ninguno"
],
correcta:0
},

{
pregunta:"¿Cuál es un riesgo?",
opciones:[
"Privacidad",
"Más compras",
"Más descuentos",
"Ninguno"
],
correcta:0
},

{
pregunta:"¿Qué empresa recomienda películas?",
opciones:[
"Netflix",
"Coca-Cola",
"Nike",
"Toyota"
],
correcta:0
},

{
pregunta:"¿Qué empresa recomienda música?",
opciones:[
"Spotify",
"Amazon",
"Google Maps",
"Uber"
],
correcta:0
},

{
pregunta:"¿Qué tecnología ayuda a personalizar anuncios?",
opciones:[
"Inteligencia Artificial",
"Calculadora",
"Bluetooth",
"USB"
],
correcta:0
}

];

let indice = 0;
let puntos = 0;
let tiempo = 20;
let intervalo;

const pregunta = document.getElementById("pregunta");
const opciones = document.getElementById("opciones");
const mensaje = document.getElementById("mensaje");
const timer = document.getElementById("timer");
const barra = document.getElementById("barra");
const contador = document.getElementById("contador");

function cargarPregunta(){

if(indice >= preguntas.length){
mostrarResultado();
return;
}

contador.innerHTML = `${indice+1}/${preguntas.length}`;

barra.style.width=((indice)/preguntas.length)*100+"%";

const actual = preguntas[indice];

pregunta.innerHTML = actual.pregunta;

opciones.innerHTML="";

mensaje.innerHTML="";

tiempo=20;

timer.innerHTML=tiempo;

clearInterval(intervalo);

intervalo=setInterval(()=>{

tiempo--;

timer.innerHTML=tiempo;

if(tiempo==0){

clearInterval(intervalo);

indice++;

cargarPregunta();

}

},1000);

actual.opciones.forEach((texto,i)=>{

const boton=document.createElement("button");

boton.className="opcion";

boton.innerHTML=texto;

boton.onclick=()=>responder(i);

opciones.appendChild(boton);

});

}

function responder(opcion){

clearInterval(intervalo);

if(opcion===preguntas[indice].correcta){

mensaje.innerHTML="✅ ¡Correcto!";

puntos+=10;

document.getElementById("puntos").innerHTML=puntos;

}else{

mensaje.innerHTML="❌ Incorrecto";

}

indice++;

setTimeout(cargarPregunta,1000);

}

function mostrarResultado(){

document.getElementById("quiz").style.display="none";

document.getElementById("final").classList.remove("oculto");

barra.style.width="100%";

let porcentaje=(puntos/(preguntas.length*10))*100;

let texto="";

if(porcentaje>=80){

texto="🏆 ¡Excelente! Aprobaste con "+porcentaje+"%";

}else if(porcentaje>=60){

texto="👍 Buen trabajo. Obtuviste "+porcentaje+"%";

}else{

texto="📚 Sigue practicando. Resultado: "+porcentaje+"%";

}

document.getElementById("resultadoFinal").innerHTML=`

<h3>Puntos: ${puntos}</h3>

<h2>${texto}</h2>

`;

}

function reiniciarJuego(){

indice=0;

puntos=0;

document.getElementById("quiz").style.display="block";

document.getElementById("final").classList.add("oculto");

document.getElementById("puntos").innerHTML="0";

cargarPregunta();

}

cargarPregunta();
