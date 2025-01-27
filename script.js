// Variables globales
let preguntas = []; // Aquí se cargan las preguntas del archivo JSON
let preguntaActual = 0; // Índice de la pregunta que se muestra
let tiempoRestante = 40; // Tiempo por pregunta
let temporizador; // Variable para controlar el intervalo

// Cargar preguntas desde el archivo JSON
fetch('cuestioanrioo.json')
    .then(response => response.json())
    .then(data => {
        preguntas = data; // Guardar las preguntas en la variable global
        mostrarPregunta(); // Mostrar la primera pregunta
        iniciarTemporizador(); // Iniciar el temporizador
    })
    .catch(error => console.error("Error al cargar las preguntas:", error));

// Función para mostrar una pregunta
function mostrarPregunta() {
    const contenedorPregunta = document.getElementById('contenedor-pregunta');
    const opcionesLista = document.getElementById('opciones');
    const btnSiguiente = document.getElementById('btn-siguiente');
    const resultado = document.getElementById('resultado');

    // Limpiar elementos anteriores
    opcionesLista.innerHTML = '';
    btnSiguiente.style.display = 'none';
    resultado.textContent = '';

    // Obtener la pregunta actual
    const pregunta = preguntas[preguntaActual];
    contenedorPregunta.textContent = pregunta.pregunta;

    // Crear opciones como botones
    pregunta.opciones.forEach(opcion => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = opcion;
        button.onclick = () => verificarRespuesta(opcion, pregunta.respuestaCorrecta);
        li.appendChild(button);
        opcionesLista.appendChild(li);
    });
}

// Función para verificar la respuesta seleccionada
function verificarRespuesta(opcionSeleccionada, respuestaCorrecta) {
    const resultado = document.getElementById('resultado');
    clearInterval(temporizador); // Detener el temporizador

    if (opcionSeleccionada === respuestaCorrecta) {
        resultado.textContent = '¡Correcto!';
        resultado.style.color = 'green';
    } else {
        resultado.textContent = `Incorrecto. La respuesta correcta es: ${respuestaCorrecta}`;
        resultado.style.color = 'red';
    }

    document.getElementById('btn-siguiente').style.display = 'block';
}

// Función para iniciar el temporizador
function iniciarTemporizador() {
    tiempoRestante = 40;
    document.getElementById('tiempo').textContent = tiempoRestante;

    temporizador = setInterval(() => {
        tiempoRestante--;
        document.getElementById('tiempo').textContent = tiempoRestante;

        if (tiempoRestante === 0) {
            clearInterval(temporizador);
            verificarRespuesta(null, preguntas[preguntaActual].respuestaCorrecta);
        }
    }, 1000);
}

// Función para manejar el botón "Siguiente"
document.getElementById('btn-siguiente').onclick = () => {
    preguntaActual++;
    if (preguntaActual < preguntas.length) {
        mostrarPregunta(); // Mostrar la siguiente pregunta
        iniciarTemporizador(); // Reiniciar el temporizador
    } else {
        // Mostrar mensaje final
        document.getElementById('quiz').innerHTML = `
            <h2>¡Has completado el quiz!</h2>
            <p>Respondiste correctamente ${preguntaActual} de ${preguntas.length} preguntas.</p>
        `;
    }
};
