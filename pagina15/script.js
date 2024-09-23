document.addEventListener('DOMContentLoaded', function() {
    const sideNav = document.querySelector('.sidenav');
    const openNavBtn = document.querySelector('.open-nav');
    const closeNavBtn = document.querySelector('.close-nav');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Funcionalidad de la barra de navegación
    function toggleNav() {
        sideNav.classList.toggle('open');
    }

    openNavBtn.addEventListener('click', toggleNav);
    closeNavBtn.addEventListener('click', toggleNav);

    // Cambio de tema claro/oscuro
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        themeToggle.textContent = body.classList.contains('dark-theme') ? '☀️' : '🌓';
    });

    // Cerrar la navegación al hacer clic fuera de ella
    document.addEventListener('click', (e) => {
        if (!sideNav.contains(e.target) && !openNavBtn.contains(e.target) && window.innerWidth < 768) {
            sideNav.classList.remove('open');
        }
    });

    // Scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Resaltar sección activa durante el scroll
    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 80) { // Ajusté el desplazamiento de sección activa
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.sidenav a').forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').substring(1) === current) {
                li.classList.add('active');
            }
        });
    });

    // Ajustar la visibilidad de la barra de navegación en función del ancho de la pantalla
    function adjustNavVisibility() {
        if (window.innerWidth >= 768) {
            sideNav.classList.add('open');
            openNavBtn.style.display = 'none';
        } else {
            sideNav.classList.remove('open');
            openNavBtn.style.display = 'block';
        }
    }

    // Llamar a la función al cargar la página y cuando se redimensione la ventana
    adjustNavVisibility();
    window.addEventListener('resize', adjustNavVisibility);
});
