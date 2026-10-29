document.addEventListener("DOMContentLoaded", () => {
    /* =========================
       HERO SLIDER
    ========================== */
    const slides = document.querySelectorAll(".slide");
    const hero = document.querySelector(".hero-slider");
    const dots = document.querySelectorAll(".dot");
    const prevSlide = document.getElementById("prevSlide");
    const nextSlide = document.getElementById("nextSlide");
    let currentSlide = 0;
    let sliderInterval;
    function showSlide(index) {
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });
        dots.forEach((dot) => {
            dot.classList.remove("active");
        });
        slides[index].classList.add("active");
        dots[index].classList.add("active");
        currentSlide = index;
    }
    function nextSlideFunction() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }
    function prevSlideFunction() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        showSlide(currentSlide);
    }
    function startSlider() {
        sliderInterval = setInterval(() => {
            nextSlideFunction();
        }, 5000);
    }
    function resetSlider() {
        clearInterval(sliderInterval);
        startSlider();
    if (hero) {
        hero.addEventListener("mouseenter", () => clearInterval(sliderInterval));
        hero.addEventListener("mouseleave", resetSlider);
    }
    }
    if (nextSlide) {
        nextSlide.addEventListener("click", () => {
            nextSlideFunction();
            resetSlider();
        });
    }
    if (prevSlide) {
        prevSlide.addEventListener("click", () => {
            prevSlideFunction();
            resetSlider();
        });
    }
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            resetSlider();
        });
    });
    startSlider();
    /* =========================
       MOBILE MENU
    ========================== */
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("show");
            const icon = mobileMenuBtn.querySelector("i");
            if (navLinks.classList.contains("show")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    }


    /* =========================
   WISHLIST
========================= */

const wishlistButtons =
    document.querySelectorAll(".wishlist-btn");

const wishlistCount =
    document.getElementById("wishlistCount");

let wishlist =
    JSON.parse(
        localStorage.getItem("amitBeejWishlist")
    ) || [];


/* UPDATE WISHLIST COUNT */

function updateWishlistCount() {

    if (!wishlistCount) return;

    wishlistCount.textContent =
        wishlist.length;
}


/* LOAD ACTIVE WISHLIST */

wishlistButtons.forEach((button) => {

    const productCard =
        button.closest(".product-card");

    const productName =
        productCard.querySelector("h3").textContent.trim();

    const alreadyAdded =
        wishlist.some(
            item => item.name === productName
        );

    if (alreadyAdded) {

        button.classList.add("active");

        const icon =
            button.querySelector("i");

        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");

    }


    button.addEventListener("click", () => {

        const productImage =
            productCard.querySelector(
                ".product-image img"
            ).src;

        const priceText =
            productCard.querySelector(
                ".current-price"
            ).textContent
            .replace("₹", "")
            .replace(/,/g, "")
            .trim();

        const price = Number(priceText) || 0;


        const existingIndex =
            wishlist.findIndex(
                item => item.name === productName
            );


        if (existingIndex !== -1) {

            wishlist.splice(
                existingIndex,
                1
            );

            button.classList.remove("active");

            const icon =
                button.querySelector("i");

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

        } else {

            wishlist.push({

                id: Date.now(),

                name: productName,

                image: productImage,

                price: price

            });

            button.classList.add("active");

            const icon =
                button.querySelector("i");

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

        }


        localStorage.setItem(
            "amitBeejWishlist",
            JSON.stringify(wishlist)
        );


        updateWishlistCount();

    });

});


updateWishlistCount();


   /* =========================
   ADD TO CART
========================= */

const addCartButtons = document.querySelectorAll(".add-cart-btn");
const cartCount = document.getElementById("cartCount");

let cart = JSON.parse(
    localStorage.getItem("amitBeejCart")
) || [];


/* UPDATE CART COUNT */

function updateCartCount() {

    if (!cartCount) return;

    const totalItems = cart.reduce(
        (total, product) => total + Number(product.quantity),
        0
    );

    cartCount.textContent = totalItems;
}


/* ADD PRODUCT */

addCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard =
            button.closest(".product-card");

        const productName =
            productCard.querySelector("h3").textContent.trim();

        const productImage =
            productCard.querySelector(
                ".product-image img"
            ).src;

        const priceText =
            productCard.querySelector(
                ".current-price"
            ).textContent
            .replace("₹", "")
            .replace(/,/g, "")
            .trim();

        const price = Number(priceText) || 0;

        const chemicalElement =
            productCard.querySelector(".chemical-name");

        const chemical =
            chemicalElement
                ? chemicalElement.textContent
                    .replace("Chemical:", "")
                    .trim()
                : "";


        /* CHECK EXISTING PRODUCT */

        const existingProduct =
            cart.find(
                product =>
                    product.name === productName
            );


        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({

                id: Date.now(),

                name: productName,

                image: productImage,

                price: price,

                chemical: chemical,

                quantity: 1

            });

        }


        /* SAVE */

        localStorage.setItem(
            "amitBeejCart",
            JSON.stringify(cart)
        );


        /* UPDATE COUNT */

        updateCartCount();


        /* BUTTON */

        const originalText =
            button.innerHTML;

        button.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Added
        `;

        button.style.pointerEvents = "none";


        setTimeout(() => {

            button.innerHTML =
                originalText;

            button.style.pointerEvents =
                "auto";

        }, 1500);

    });

});


/* LOAD COUNT */

updateCartCount();


    /* =========================
       BUY NOW BUTTON
    ========================== */

    const buyButtons = document.querySelectorAll(".buy-now-btn");

    buyButtons.forEach((button) => {
        button.addEventListener("click", () => {

            const productCard = button.closest(".product-card");
            const productName = productCard.dataset.name;

            alert(
                productName +
                " selected. Product purchase page will be connected soon."
            );
        });
    });


    /* =========================
       SEARCH PRODUCTS
    ========================== */

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    function updateNoResults() {
        const box = document.getElementById("noResults");
        if (!box) return;
        const visible = [...document.querySelectorAll(".product-card")]
            .some((c) => c.style.display !== "none");
        box.hidden = visible;
    }

    function searchProducts() {
        setTimeout(updateNoResults, 0);
        const searchValue = searchInput.value.toLowerCase().trim();
        const productCards = document.querySelectorAll(".product-card");

        if (searchValue === "") {
            productCards.forEach((card) => {
                card.style.display = "block";
            });

            document.getElementById("featured-products")
                .scrollIntoView({
                    behavior: "smooth"
                });

            return;
        }

        productCards.forEach((card) => {
            const productName = card.dataset.name.toLowerCase();
            const productText = card.innerText.toLowerCase();

            if (
                productName.includes(searchValue) ||
                productText.includes(searchValue)
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });

        document.getElementById("featured-products")
            .scrollIntoView({
                behavior: "smooth"
            });
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", searchProducts);
    }

    if (searchInput) {
        searchInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                searchProducts();
            }
        });
    }


    /* =========================
       ENQUIRY FORM
    ========================== */

    const enquiryForm = document.getElementById("enquiryForm");

    if (enquiryForm) {
        enquiryForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const phone = document.getElementById("phone").value;
            const email = document.getElementById("email").value;
            const product = document.getElementById("product").value;
            const message = document.getElementById("message").value;

            const enquiryMessage = `
NEW ENQUIRY - AMIT BEEJ BHANDAR

Name: ${name}
Phone: ${phone}
Email: ${email || "Not Provided"}
Product Category: ${product}
Message: ${message || "No Message"}
            `;

            console.log(enquiryMessage);

            alert(
                "Thank you " +
                name +
                "! Your enquiry has been submitted successfully."
            );

            enquiryForm.reset();
        });
    }


    /* =========================
       SCROLL TO TOP
    ========================== */

    const scrollTopButton = document.getElementById("scrollTop");

    window.addEventListener("scroll", () => {
        if (!scrollTopButton) return;
        if (window.scrollY > 400) {
            scrollTopButton.classList.add("show");
        } else {
            scrollTopButton.classList.remove("show");
        }
    });

    if (scrollTopButton) {
        scrollTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* =========================
       CLOSE MOBILE MENU
       AFTER CLICKING A LINK
    ========================== */

    const allNavLinks = document.querySelectorAll(".nav-links a");

    allNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navLinks) {
                navLinks.classList.remove("show");
            }

            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    });


    /* =========================
       SCROLL PROGRESS + REVEAL
    ========================== */
    const progress = document.getElementById("scrollProgress");
    window.addEventListener("scroll", () => {
        if (!progress) return;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
    }, { passive: true });

    if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll(
            ".section-heading, .category-card, .product-card, .process-text, .process-step, .process-gallery, .enquiry-image, .enquiry-form-container, .footer-column, .trust-grid > div"
        ).forEach((el) => {
            const siblings = [...el.parentElement.children];
            el.style.setProperty("--d", (siblings.indexOf(el) % 4) * 0.09 + "s");
            el.classList.add("reveal");
            io.observe(el);
        });
    }
});