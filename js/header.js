// ==================== ЛИПКАЯ ШАПКА (СКРЫВАЕМ ТОЛЬКО ЛОГОТИП) ====================
const header = document.getElementById('header');
const SCROLL_THRESHOLD = 100; // Пикселей, после которых шапка "сжимается"

window.addEventListener('scroll', () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
});

// ==================== БУРГЕР-МЕНЮ ====================
const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.querySelector('.header__nav');

if (burgerBtn && navMenu) {
    burgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('header__nav--open');
    });

    document.querySelectorAll('.header__nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('header__nav--open');
        });
    });
}

// ==================== ПРОКРУТКА К ФОРМЕ ====================
document.getElementById('openFormBtn')?.addEventListener('click', () => {
    if (window.location.pathname.includes('contacts.html')) {
        const formSection = document.getElementById('formSection');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else {
        window.location.href = 'contacts.html#formSection';
    }
});
