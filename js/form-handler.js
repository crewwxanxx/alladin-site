const form = document.getElementById('orderForm');
const messageDiv = document.getElementById('formMessage');

// URL ВАШЕГО ВЕБ-ПРИЛОЖЕНИЯ
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwnMHJahq4CgthRYFb7rylMWzH13JP6HS5kzjtYfrDigIWTFrqRdyqkZ5cmjd6V5NE/exec';

// ==================== МАСКА ДЛЯ ТЕЛЕФОНА (+7 АВТОМАТИЧЕСКИ) ====================
const phoneInput = document.getElementById('phone');

if (phoneInput) {
    // Устанавливаем начальное значение +7
    phoneInput.value = '+7 ';

    phoneInput.addEventListener('input', function(e) {
        // Удаляем всё, кроме цифр
        let digits = this.value.replace(/\D/g, '');
        
        // Если цифр нет — оставляем +7
        if (digits.length === 0) {
            this.value = '+7 ';
            return;
        }

        // Если первая цифра не 7 или 8 — исправляем
        if (digits[0] !== '7' && digits[0] !== '8') {
            digits = '7' + digits;
        }

        // Если больше 11 цифр — обрезаем
        if (digits.length > 11) {
            digits = digits.slice(0, 11);
        }

        // Форматируем номер: +7 (xxx) xxx-xx-xx
        let formatted = '+7 ';
        if (digits.length > 1) {
            formatted += '(' + digits.slice(1, 4);
        }
        if (digits.length > 4) {
            formatted += ') ' + digits.slice(4, 7);
        }
        if (digits.length > 7) {
            formatted += '-' + digits.slice(7, 9);
        }
        if (digits.length > 9) {
            formatted += '-' + digits.slice(9, 11);
        }

        this.value = formatted;
    });

    // Запрещаем вставку с буквами
    phoneInput.addEventListener('keydown', function(e) {
        const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
        if (allowedKeys.includes(e.key)) return;
        if (!/^\d$/.test(e.key)) {
            e.preventDefault();
        }
    });

    // Обработка вставки через Ctrl+V / Cmd+V
    phoneInput.addEventListener('paste', function(e) {
        e.preventDefault();
        const pasted = (e.clipboardData || window.clipboardData).getData('text');
        const digits = pasted.replace(/\D/g, '');
        if (digits.length > 0) {
            // Эмулируем ввод цифр
            const currentDigits = this.value.replace(/\D/g, '');
            const newDigits = (currentDigits + digits).slice(0, 11);
            this.value = '+7 ';
            // Пересобираем номер
            let formatted = '+7 ';
            if (newDigits.length > 1) {
                formatted += '(' + newDigits.slice(1, 4);
            }
            if (newDigits.length > 4) {
                formatted += ') ' + newDigits.slice(4, 7);
            }
            if (newDigits.length > 7) {
                formatted += '-' + newDigits.slice(7, 9);
            }
            if (newDigits.length > 9) {
                formatted += '-' + newDigits.slice(9, 11);
            }
            this.value = formatted;
        }
    });

    // При фокусе курсор ставим в конец
    phoneInput.addEventListener('focus', function() {
        this.setSelectionRange(this.value.length, this.value.length);
    });
}

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.contact-form__submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправляется...';
        messageDiv.textContent = '';
        messageDiv.className = 'form-message';

        const params = new URLSearchParams();
        params.append('name', document.getElementById('name').value);
        params.append('phone', document.getElementById('phone').value);
        params.append('service', document.getElementById('service').value);
        params.append('social', document.getElementById('social').value);
        params.append('message', document.getElementById('message').value);

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString()
            });

            const result = await response.json();

            if (result.result === 'success') {
                messageDiv.textContent = '✅ Заявка отправлена! Менеджер свяжется с вами.';
                messageDiv.className = 'form-message success';
                form.reset();
                // Восстанавливаем +7 после сброса
                phoneInput.value = '+7 ';
            } else {
                throw new Error('Ошибка сервера');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            messageDiv.textContent = '❌ Произошла ошибка. Пожалуйста, попробуйте позже или позвоните нам.';
            messageDiv.className = 'form-message error';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить заявку';
        }
    });
}
