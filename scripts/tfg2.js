document.addEventListener('DOMContentLoaded', function() {
    // Generar estrellas
    const starsContainer = document.querySelector('.stars-container');
    generateStars(starsContainer, 1000); 
    
    // Botones de descarga
    const downloadButtons = document.querySelectorAll('.download-button[data-url]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.open(this.getAttribute('data-url'), '_blank');
        });
    });

    const fileButtons = document.querySelectorAll('.download-button[data-file]');
    fileButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filename = this.getAttribute('data-filename');
            alert(`Descargando ${filename}...`);
            contador++;
            contadorElement.textContent = contador;
        });
    });

    // Efecto de scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

function generateStars(container, starCount) {
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const xPos = Math.random() * 100; 
        const yPos = Math.random() * 100; 
        
        const size = Math.random() * 3 + 1; // entre 1px y 4px
        const opacity = Math.random() * 0.5 + 0.3; // entre 0.3 y 0.8
        const duration = Math.random() * 4 + 3; // entre 3s y 7s
        const delay = Math.random() * 5; // entre 0s y 5s
        
        star.style.left = `${xPos}%`;
        star.style.top = `${yPos}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--star-opacity', opacity);
        star.style.setProperty('--twinkle-duration', `${duration}s`);
        star.style.animationDelay = `${delay}s`;
        
        if (Math.random() > 0.7) {
            star.classList.add('with-glow');
        }
        
        container.appendChild(star);
    }
}