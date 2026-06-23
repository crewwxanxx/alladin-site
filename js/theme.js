// ==================== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ====================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;
const heroImage = document.getElementById('heroImage');

// Проверяем сохраненную тему
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);
updateHeroImage(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    let newTheme = 'light';
    
    if (currentTheme === 'light') {
        newTheme = 'dark';
    }
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    updateHeroImage(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

function updateHeroImage(theme) {
    if (heroImage) {
        if (theme === 'dark') {
            heroImage.src = 'images/hero-dark.png';
        } else {
            heroImage.src = 'images/hero-light.png';
        }
    }
}
