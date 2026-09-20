/* =========================================================
   ZP JOYAS - JAVASCRIPT
========================================================= */


/* =========================================================
   WHATSAPP
========================================================= */

const WHATSAPP_NUMBER = "543815085328";


function consultarWhatsApp(producto = null) {

    let mensaje;

    if (producto) {

        mensaje =
            `Hola ZP Joyas 👋\n\n` +
            `Estoy interesado/a en el producto:\n` +
            `*${producto.nombre}*\n\n` +
            `Precio publicado: $${producto.precio.toLocaleString("es-AR")}\n\n` +
            `¿Me pueden dar más información?`;

    } else {

        mensaje =
            "Hola ZP Joyas 👋 Quiero consultar por sus productos.";

    }

    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
}


/* =========================================================
   NAVBAR MOBILE
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });


    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });

}


/* =========================================================
   HERO SLIDER
========================================================= */

const slides =
    document.querySelectorAll(".hero-slide");

const nextButton =
    document.getElementById("nextSlide");

const prevButton =
    document.getElementById("prevSlide");

const dotsContainer =
    document.getElementById("sliderDots");


let currentSlide = 0;


if (slides.length && dotsContainer) {

    slides.forEach((_, index) => {

        const dot =
            document.createElement("span");

        dot.classList.add("slider-dot");

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {

            currentSlide = index;

            updateSlider();

        });

        dotsContainer.appendChild(dot);

    });


    const dots =
        document.querySelectorAll(".slider-dot");


    function updateSlider() {

        slides.forEach(slide => {

            slide.classList.remove("active");

        });

        dots.forEach(dot => {

            dot.classList.remove("active");

        });

        slides[currentSlide].classList.add("active");

        dots[currentSlide].classList.add("active");

    }


    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        updateSlider();

    }


    function previousSlide() {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        updateSlider();

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextSlide
        );

    }


    if (prevButton) {

        prevButton.addEventListener(
            "click",
            previousSlide
        );

    }


    setInterval(nextSlide, 5000);

}


/* =========================================================
   PRODUCTOS DESTACADOS
========================================================= */

const featuredContainer =
    document.getElementById("featuredProducts");


function crearProductoCard(producto) {

    return `

        <article class="product-card">

            <div class="product-image">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    loading="lazy"
                >

                <span class="product-tag">
                    ZP JOYAS
                </span>

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${producto.categoria}
                </span>

                <h3 class="product-name">
                    ${producto.nombre}
                </h3>

                <div class="product-price">
                    $${producto.precio.toLocaleString("es-AR")}
                </div>

                <a
                    href="pages/producto.html?id=${producto.id}"
                    class="product-button"
                >
                    VER MÁS →
                </a>

            </div>

        </article>

    `;

}


function mostrarDestacados(categoria = "cadenas") {

    if (!featuredContainer) return;

    const productosFiltrados =
        productos
            .filter(producto =>
                producto.categoria === categoria
            )
            .slice(0, 8);


    featuredContainer.innerHTML =
        productosFiltrados
            .map(crearProductoCard)
            .join("");

}


/* =========================================================
   BOTONES DE CATEGORÍAS
========================================================= */

const categoryButtons =
    document.querySelectorAll(".category-btn");


if (categoryButtons.length) {

    mostrarDestacados("cadenas");


    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const categoria =
                button.dataset.category;

            mostrarDestacados(categoria);

        });

    });

}