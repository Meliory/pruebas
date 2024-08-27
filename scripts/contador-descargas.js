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
    const contador = snapshot.val() || 0;
    document.getElementById('contador-descargas').textContent = contador;
  });
}

// Llamar a esta función cuando se carga la página
actualizarContadorEnPagina();

// Event listener para el botón de descarga
document.getElementById('boton-descarga').addEventListener('click', (e) => {
  e.preventDefault();
  incrementarContador();
  // Aquí puedes añadir el código para iniciar la descarga real
  //window.location.href = 'URL_DE_TU_LIBRO_ELECTRONICO';
});