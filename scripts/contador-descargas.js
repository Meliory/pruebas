// Archivo: contador-descargas.js

// Utilizamos Firebase Realtime Database para almacenar el contador
// Asegúrate de reemplazar la configuración con la de tu propio proyecto de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDNbsRSsJ4Tmo5F9QCIqsz567IXVg5B5T0",
  authDomain: "pagina-web-personal-5b8b6.firebaseapp.com",
  databaseURL: "https://pagina-web-personal-5b8b6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pagina-web-personal-5b8b6",
  storageBucket: "pagina-web-personal-5b8b6.appspot.com",
  messagingSenderId: "200445849577",
  appId: "1:200445849577:web:215efb3281c76579f9a578",
  measurementId: "G-13R5GLQJ0V"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Función para incrementar el contador
function incrementarContador() {
  const contadorRef = database.ref('contador');
  contadorRef.transaction((currentValue) => {
    return (currentValue || 0) + 1;
  }).then(() => {
    console.log("Contador incrementado con éxito");
  }).catch((error) => {
    console.error("Error al incrementar el contador:", error);
  });
}

// Función para actualizar el contador en la página
function actualizarContadorEnPagina() {
  const contadorRef = database.ref('contador');
  contadorRef.on('value', (snapshot) => {
      const nuevoValor = snapshot.val() || 0;
      animarCambioContador(nuevoValor);
  });
}

function animarCambioContador(nuevoValor) {
  const contadorElement = document.getElementById('contador-descargas');
  const valorActual = parseInt(contadorElement.textContent);

  if (nuevoValor !== valorActual) {
      contadorElement.classList.add('changing');
      
      setTimeout(() => {
          contadorElement.textContent = nuevoValor;
      }, 250);

      setTimeout(() => {
          contadorElement.classList.remove('changing');
      }, 500);
  }
}

// Llamar a esta función cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
  actualizarContadorEnPagina();

  // Manejar clics en botones
  const botones = document.querySelectorAll('.download-button');
  botones.forEach(boton => {
      boton.addEventListener('click', (e) => {
          e.preventDefault();
          incrementarContador();

          const url = boton.dataset.url;
          const file = boton.dataset.file;
          const filename = boton.dataset.filename;

          if (url) {
              // Abrir enlace en nueva pestaña
              window.open(url, '_blank');
          } else if (file) {
              // Iniciar descarga
              const link = document.createElement('a');
              link.href = file;
              link.download = filename || 'download';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          } 
      });
  });
});