/*document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
        let scrollPosition = window.scrollY;

        // Make navigation bar sticky when scrolling down
        if (scrollPosition > window.innerHeight - 50) {
            navbar.classList.add("fixed");
        } else {
            navbar.classList.remove("fixed");
        }

        // Fade-in effect for sections
        sections.forEach((section) => {
            let sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add("fade-in");
            }
        });
    });
});*/

document.addEventListener("DOMContentLoaded", async function () {
    const carousel = document.getElementById("project-list");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    let scrollAmount = 0;
    let cardWidth = 0;
    let visibleCards = 0;
    let scrollStep = 0;
    let maxScroll = 0;

    // Load projects from JSON before initializing the carousel
    async function loadProjects() {
        try {
            const response = await fetch("project-cards.json");
            const projects = await response.json();

            carousel.innerHTML = ""; // Clear existing content

            projects.forEach((project) => {
                const card = document.createElement("div");
                card.classList.add("project-card");
                card.innerHTML = `
                    <img src="${project.image}" alt="${project.title}">
                    <h3>${project.title}</h3>
                    <p class="description">${project.description}</p>
                `;
                carousel.appendChild(card);
            });

        } catch (error) {
            console.error("Error loading projects:", error);
        }
    }

    function updateCarouselVariables() {
        const projectCards = document.querySelectorAll(".project-card");
        cardWidth = projectCards[0].offsetWidth + 20; // Include spacing
        visibleCards = Math.floor(carousel.offsetWidth / cardWidth);
        scrollStep = visibleCards * cardWidth;
        maxScroll = carousel.scrollWidth - carousel.offsetWidth;
    }

    function updateCarousel(direction) {
        if (direction === "right") {
            scrollAmount += scrollStep;

            // Ensure last visible card is fully displayed before looping
            if (scrollAmount == maxScroll + scrollStep) {
                scrollAmount = 0; // Loop back to start
            } else if (scrollAmount + carousel.offsetWidth > carousel.scrollWidth) {
                console.log(maxScroll);
                console.log(scrollAmount);
                scrollAmount = maxScroll; // Display last set of cards fully
                
            } else if (scrollAmount >= maxScroll) {
                scrollAmount = 0; // Loop back to start
            }
        } else {
            scrollAmount -= scrollStep;

            // Ensure first visible card is fully displayed before looping
            if (scrollAmount == -scrollStep) {
                scrollAmount = maxScroll - scrollStep; // Move back to the last set of cards before looping
            } else if (scrollAmount <= 0) {
                scrollAmount = 0;
            }
        }

        carousel.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        });
    }

    rightBtn.addEventListener("click", () => updateCarousel("right"));
    leftBtn.addEventListener("click", () => updateCarousel("left"));

    await loadProjects(); // Ensure JSON loads **before** initializing carousel
    
            // Update carousel variables **after** cards are added
    updateCarouselVariables();
});

