document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const counterEl = document.getElementById('slide-counter');

    function showSlide(n) {
        // Ocultar todas las diapositivas
        slides.forEach(slide => slide.style.display = 'none');

        // Asegurar que el índice esté en el rango correcto
        currentSlide = (n + totalSlides) % totalSlides;

        // Mostrar la diapositiva actual
        slides[currentSlide].style.display = 'block';

        // Actualizar contador
        counterEl.textContent = `${currentSlide + 1} / ${totalSlides}`;
        
        // Lógica de botones
        checkTriviaAndNav();
    }

    // Lógica para ocultar 'Siguiente' en las diapositivas de trivia
    // hasta que se responda.
    function checkTriviaAndNav() {
        if (slides[currentSlide].classList.contains('trivia-question') && 
            !slides[currentSlide].dataset.answered) {
            nextBtn.style.display = 'none'; // Ocultar 'Siguiente' si la trivia no está respondida
        } else if (currentSlide === totalSlides - 1) {
            nextBtn.style.display = 'none'; // Ocultar 'Siguiente' en la última diapositiva
        } else {
            nextBtn.style.display = 'block'; // Mostrar 'Siguiente'
        }
        
        // Ocultar 'Anterior' en la primera diapositiva
        prevBtn.style.display = (currentSlide === 0) ? 'none' : 'block';
    }

    // Lógica de los botones
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    // Lógica de la Trivia
    const triviaOptions = document.querySelectorAll('.option');

    triviaOptions.forEach(option => {
        option.addEventListener('click', () => {
            const slide = option.closest('.slide');
            const feedbackEl = slide.querySelector('.feedback');
            const rationaleEl = slide.querySelector('.rationale-text');
            const allOptions = slide.querySelectorAll('.option');
            
            // Evitar doble click
            if (slide.dataset.answered === 'true') return;
            slide.dataset.answered = 'true';

            const isCorrect = option.dataset.correct === 'true';
            const rationale = option.dataset.rationale;

            // Deshabilitar todas las opciones
            allOptions.forEach(opt => opt.style.pointerEvents = 'none');

            // Mostrar feedback
            rationaleEl.textContent = rationale;
            feedbackEl.classList.add('show');

            if (isCorrect) {
                option.classList.add('correct');
                feedbackEl.classList.add('correct');
            } else {
                option.classList.add('incorrect');
                feedbackEl.classList.add('incorrect');
                // Resaltar la correcta
                const correctOpt = slide.querySelector('[data-correct="true"]');
                if (correctOpt) {
                    correctOpt.classList.add('correct');
                }
            }
            
            // Mostrar el botón 'Siguiente' automáticamente después de responder
            if (currentSlide !== totalSlides - 1) {
                nextBtn.style.display = 'block';
            }
        });
    });

    // Iniciar
    showSlide(currentSlide);
});