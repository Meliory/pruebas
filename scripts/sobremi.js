// Menú desplegable
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Timeline de experiencia
const timeline = document.querySelector('.timeline');
const experiences = [
    { year: '2023', title: 'Experiencia 1', description: 'Descripción de la experiencia 1' },
    { year: '2022', title: 'Experiencia 2', description: 'Descripción de la experiencia 2' },
    { year: '2021', title: 'Experiencia 3', description: 'Descripción de la experiencia 3' }
];

experiences.forEach(exp => {
    const item = document.createElement('div');
    item.classList.add('timeline-item');
    item.innerHTML = `
        <h3>${exp.year} - ${exp.title}</h3>
        <p>${exp.description}</p>
    `;
    timeline.appendChild(item);
});

// Interactividad para las habilidades e intereses
const skillItems = document.querySelectorAll('.skill-item');
const interestItems = document.querySelectorAll('.interest-item');

function showTooltip(event) {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = event.target.dataset.name;
    document.body.appendChild(tooltip);

    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
}

function removeTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

skillItems.forEach(item => {
    item.addEventListener('mouseover', showTooltip);
    item.addEventListener('mouseout', removeTooltip);
});

interestItems.forEach(item => {
    item.addEventListener('mouseover', showTooltip);
    item.addEventListener('mouseout', removeTooltip);
});