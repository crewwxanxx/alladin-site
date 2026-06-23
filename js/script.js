// ==================== ЛИПКАЯ ШАПКА (СВОРАЧИВАНИЕ) ====================
const header = document.getElementById('header');
const SCROLL_THRESHOLD = 150; // Пикселей, после которых шапка сворачивается

window.addEventListener('scroll', () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
});

// ==================== БУРГЕР-МЕНЮ ДЛЯ МОБИЛЬНЫХ ====================
const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.querySelector('.header__nav');

burgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('header__nav--open');
    // Анимация бургера (крестик) - опционально
    burgerBtn.classList.toggle('is-active');
});

// Закрываем меню при клике на ссылку
document.querySelectorAll('.header__nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('header__nav--open');
        burgerBtn.classList.remove('is-active');
    });
});

// ==================== ПЛАВНЫЙ СКРОЛЛ К СЕКЦИЯМ ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== ОТКРЫТИЕ ФОРМЫ ПО КНОПКАМ ====================
function scrollToForm() {
    const formSection = document.getElementById('formSection');
    if (formSection) {
        const headerOffset = 80;
        const elementPosition = formSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Кнопки, которые открывают форму
document.getElementById('openFormBtn')?.addEventListener('click', scrollToForm);
document.getElementById('heroFormBtn')?.addEventListener('click', scrollToForm);
