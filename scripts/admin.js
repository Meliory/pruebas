// Archivo: admin-script.js

// Configuración de Firebase (reemplaza con tu propia configuración)
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
const auth = firebase.auth();

// Función para iniciar sesión
function iniciarSesion() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Sesión iniciada con éxito");
      mostrarPanelAdmin();
    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión. Verifica tus credenciales.");
    });
}

// Función para cerrar sesión
function cerrarSesion() {
  auth.signOut().then(() => {
    console.log("Sesión cerrada con éxito");
    ocultarPanelAdmin();
  }).catch((error) => {
    console.error("Error al cerrar sesión:", error);
  });
}

// Función para reiniciar el contador
function reiniciarContador() {
  const contadorRef = database.ref('contador');
  contadorRef.set(0).then(() => {
    console.log("Contador reiniciado a 0");
    actualizarContadorEnPagina();
  }).catch((error) => {
    console.error("Error al reiniciar el contador:", error);
  });
}

// Función para actualizar el contador en la página
function actualizarContadorEnPagina() {
  const contadorRef = database.ref('contador');
  contadorRef.on('value', (snapshot) => {
    const contador = snapshot.val() || 0;
    document.getElementById('contador-actual').textContent = contador;
  });
}

// Funciones para mostrar/ocultar el panel de administración
function mostrarPanelAdmin() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('admin-panel').style.display = 'block';
}

function ocultarPanelAdmin() {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('admin-panel').style.display = 'none';
}

// Escuchar cambios en el estado de autenticación
auth.onAuthStateChanged((user) => {
  if (user) {
    mostrarPanelAdmin();
    actualizarContadorEnPagina();
  } else {
    ocultarPanelAdmin();
  }
});

// Event listeners
document.getElementById('login-button').addEventListener('click', iniciarSesion);
document.getElementById('logout-button').addEventListener('click', cerrarSesion);
document.getElementById('reset-button').addEventListener('click', reiniciarContador);