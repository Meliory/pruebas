window.onload = function() {
    function updateProgress(percentage) {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.height = (percentage) + '%';
        }
    }
    
    // Ejemplo: Llena la barra al 40%
    updateProgress(20);
};