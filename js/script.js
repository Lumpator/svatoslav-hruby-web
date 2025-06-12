// Jednoduchý skript pro aktivní navigaci (příklad)
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('header nav ul li a');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active'); // Odebrat, pokud již není aktivní
        }
    });

    // Ošetření pro úvodní stránku (index.html nebo prázdná cesta)
    if (currentPath === '' || currentPath === 'index.html') {
        const homeLink = document.querySelector('header nav ul li a[href="index.html"]');
        if (homeLink) {
            // Odebrání 'active' ze všech ostatních a přidání na Úvod
            navLinks.forEach(link => link.classList.remove('active'));
            homeLink.classList.add('active');
        }
    }

    // Funkcionalita pro kontaktní formulář (pouze základní)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Zabráníme výchozímu odeslání formuláře

            // Jednoduchá validace (může být rozšířena)
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                formStatus.textContent = 'Prosím, vyplňte všechna povinná pole.';
                formStatus.style.color = 'red';
                return;
            }

            // Simulace odeslání (v reálné aplikaci by zde byl AJAX požadavek na server)
            formStatus.textContent = 'Zpráva se odesílá...';
            formStatus.style.color = 'orange';

            setTimeout(() => {
                // Zde byste normálně odeslali data na server
                // Např. pomocí fetch() API

                // Po "úspěšném odeslání"
                formStatus.textContent = 'Zpráva byla úspěšně odeslána!';
                formStatus.style.color = 'green';
                contactForm.reset(); // Vyčistí formulář

                // Po nějaké době může hláška zmizet
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);

            }, 2000); // Simulace zpoždění sítě
        });
    }

    // Přidání placeholder obrázků do galerie, pokud nejsou specifikovány
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        if (!img.getAttribute('src') || img.getAttribute('src') === 'img/placeholder-image.jpg') {
            // Použijeme placeholder službu, např. placehold.co
            // Můžete si upravit rozměry a text
            const width = img.parentElement.offsetWidth || 300;
            const height = Math.floor(width * (2 / 3)); // Příklad poměru stran
            img.src = `https://placehold.co/${width}x${height}/0779e4/FFF?text=Foto+Svatoslav`;
            img.alt = 'Ukázková fotografie';
        }
    });

    // Přepínání motivu (Dark Mode)
    const themeToggleButton = document.getElementById('theme-toggle');
    const darkModeStylesheet = document.getElementById('dark-mode-stylesheet');
    const storedTheme = localStorage.getItem('theme'); // Změna z currentTheme na storedTheme pro lepší srozumitelnost

    function enableDarkMode() {
        darkModeStylesheet.removeAttribute('disabled');
        document.body.classList.add('dark-mode');
        themeToggleButton.textContent = '☀️'; // Ikona pro světlý režim
        localStorage.setItem('theme', 'dark');
    }

    function disableDarkMode() {
        darkModeStylesheet.setAttribute('disabled', 'true');
        document.body.classList.remove('dark-mode');
        themeToggleButton.textContent = '🌙'; // Ikona pro tmavý režim
        localStorage.setItem('theme', 'light');
    }

    if (storedTheme === 'light') {
        disableDarkMode();
    } else { // Výchozí je tmavý režim, pokud není nic uloženo nebo je uloženo 'dark'
        enableDarkMode();
    }

    themeToggleButton.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // Funkcionalita pro Hamburger menu
    const hamburgerMenuButton = document.getElementById('hamburger-menu');
    const navigationMenu = document.getElementById('navigation-menu');

    if (hamburgerMenuButton && navigationMenu) {
        hamburgerMenuButton.addEventListener('click', () => {
            navigationMenu.classList.toggle('active');
            hamburgerMenuButton.classList.toggle('active');
            const isExpanded = hamburgerMenuButton.getAttribute('aria-expanded') === 'true' || false;
            hamburgerMenuButton.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Funkcionalita pro Lightbox v galerii s podporou šipek
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const galleryImages = document.querySelectorAll('.gallery-item img');

    let currentIndex = 0;

    function showLightbox(index) {
        if (index < 0 || index >= galleryImages.length) return;
        currentIndex = index;
        const image = galleryImages[currentIndex];
        lightbox.style.display = 'block';
        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;
        const overlayP = image.parentElement.querySelector('.overlay p');
        lightboxCaption.textContent = overlayP ? overlayP.textContent : image.alt;
        // Zobrazit/skrýt šipky podle pozice
        if (lightboxPrev) lightboxPrev.style.display = currentIndex === 0 ? 'none' : 'block';
        if (lightboxNext) lightboxNext.style.display = currentIndex === galleryImages.length - 1 ? 'none' : 'block';
    }

    if (lightbox && lightboxImg && lightboxCaption && lightboxClose && galleryImages.length > 0) {
        galleryImages.forEach((image, idx) => {
            image.addEventListener('click', () => {
                showLightbox(idx);
            });
        });

        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                lightbox.style.display = 'none';
            });
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });

        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                if (currentIndex > 0) {
                    showLightbox(currentIndex - 1);
                }
            });
        }
        if (lightboxNext) {
            lightboxNext.addEventListener('click', (e) => {
                e.stopPropagation();
                if (currentIndex < galleryImages.length - 1) {
                    showLightbox(currentIndex + 1);
                }
            });
        }
        // Podpora klávesnice (šipky a ESC)
        document.addEventListener('keydown', function (e) {
            if (lightbox.style.display === 'block') {
                if (e.key === 'ArrowLeft' && currentIndex > 0) {
                    showLightbox(currentIndex - 1);
                } else if (e.key === 'ArrowRight' && currentIndex < galleryImages.length - 1) {
                    showLightbox(currentIndex + 1);
                } else if (e.key === 'Escape') {
                    lightbox.style.display = 'none';
                }
            }
        });
    }

});

// Funkce pro plynulé scrollování (pokud byste měli odkazy na sekce na jedné stránce)
// Příklad: <a href="#latest-news" class="smooth-scroll">Aktuality</a>
document.querySelectorAll('a.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
