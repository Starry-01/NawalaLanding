/* =========================
   MOBILE MENU
========================= */

const menuButton =
    document.querySelector(".menu-button");

const mobileMenu =
    document.querySelector(".mobile-menu");

const mobileLinks =
    document.querySelectorAll(".mobile-menu a");


if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

    });

}


mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});


/* =========================
   NAVBAR ON SCROLL
========================= */

const navbar =
    document.querySelector(".navbar");


if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });

}


/* =========================
   SCROLL REVEAL
========================= */

const sections =
    document.querySelectorAll(
        ".section, .join, .stats"
    );


sections.forEach((section) => {

    section.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


sections.forEach((section) => {

    revealObserver.observe(section);

});


/* =========================
   CURRENT YEAR
========================= */

const yearText =
    document.querySelector(".footer-bottom p");


if (yearText) {

    const currentYear =
        new Date().getFullYear();

    yearText.textContent =
        `© ${currentYear} Marching Band. All rights reserved.`;

}


/* =========================
   HERO IMAGE PARALLAX
========================= */

const heroImage =
    document.querySelector(".hero-image img");


if (heroImage) {

    window.addEventListener("scroll", () => {

        const scrollPosition =
            window.scrollY;

        if (scrollPosition < window.innerHeight) {

            heroImage.style.transform =
                `translateY(${scrollPosition * 0.08}px)`;

        }

    });

}


/* =========================
   STAT COUNTER
========================= */

const statNumbers =
    document.querySelectorAll(".stat-number");


const statObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                const number =
                    entry.target;

                const target =
                    parseInt(
                        number.dataset.target
                    );


                if (isNaN(target)) {
                    return;
                }


                let current = 0;

                const duration = 1200;

                const startTime =
                    performance.now();


                function updateCounter(time) {

                    const progress =
                        Math.min(
                            (time - startTime) /
                            duration,
                            1
                        );


                    current =
                        Math.floor(
                            progress * target
                        );


                    number.textContent =
                        current;


                    if (progress < 1) {

                        requestAnimationFrame(
                            updateCounter
                        );

                    } else {

                        number.textContent =
                            target;

                    }

                }


                requestAnimationFrame(
                    updateCounter
                );


                statObserver.unobserve(number);

            });

        },
        {
            threshold: 0.5
        }
    );


statNumbers.forEach((number) => {

    statObserver.observe(number);

});


/* =========================
   BAND MEMBER / SECTION
========================= */

const bandButtons =
    document.querySelectorAll(".band-button");


const bandImage =
    document.querySelector("#band-image");

const bandPosition =
    document.querySelector("#band-position");

const bandName =
    document.querySelector("#band-name");

const bandBio =
    document.querySelector("#band-bio");


const bandMembers = {

    brass: {

        position: "BRASS SECTION",

        name: "Brass Section",

        bio:
            "The brass section brings powerful melodies, bright tones, and energy to every performance.",

        image:
            "assets/images/brass.jpg"

    },


    percussion: {

        position: "PERCUSSION SECTION",

        name: "Percussion Section",

        bio:
            "The percussion section provides the rhythm, timing, and powerful beats that keep the entire band moving.",

        image:
            "assets/images/percussion.jpg"

    },


    color_guard: {

        position: "COLOR GUARD",

        name: "Color Guard",

        bio:
            "The color guard combines movement, choreography, and visual performance to bring the show to life.",

        image:
            "assets/images/color-guard.jpg"

    },


    conductor: {

        position: "CONDUCTOR",

        name: "Band Conductor",

        bio:
            "The conductor guides the ensemble and helps coordinate the music, timing, and overall performance.",

        image:
            "assets/images/conductor.jpg"

    }

};


bandButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const member =
            button.dataset.member;


        const data =
            bandMembers[member];


        if (!data) {
            return;
        }


        bandButtons.forEach((item) => {

            item.classList.remove("active");

        });


        button.classList.add("active");


        if (bandImage) {

            bandImage.style.opacity = "0";

        }


        setTimeout(() => {

            if (bandImage) {

                bandImage.src =
                    data.image;

                bandImage.alt =
                    data.name;

                bandImage.style.opacity =
                    "1";

            }


            if (bandPosition) {

                bandPosition.textContent =
                    data.position;

            }


            if (bandName) {

                bandName.textContent =
                    data.name;

            }


            if (bandBio) {

                bandBio.textContent =
                    data.bio;

            }

        }, 200);

    });

});