// SELECT ELEMENTS

const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

// IMAGE COUNTER

const counter = document.createElement("div");
counter.style.position = "absolute";
counter.style.bottom = "30px";
counter.style.color = "white";
counter.style.fontSize = "20px";
counter.style.fontWeight = "bold";
lightbox.appendChild(counter);

function updateCounter() {
    counter.textContent = `${currentIndex + 1} / ${images.length}`;
}

// OPEN LIGHTBOX

images.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        lightbox.style.display = "flex";
        lightboxImg.src = images[currentIndex].src;
        updateCounter();
    });
});

// CLOSE LIGHTBOX

closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// NEXT IMAGE

function nextImage() {
    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    lightboxImg.src = images[currentIndex].src;
    updateCounter();
}

// PREVIOUS IMAGE

function prevImage() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    lightboxImg.src = images[currentIndex].src;
    updateCounter();
}

nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

// FILTER IMAGES

function filterSelection(category) {

    const items = document.querySelectorAll(".item");

    items.forEach(item => {

        if (category === "all") {
            item.style.display = "block";
        }

        else if (item.classList.contains(category)) {
            item.style.display = "block";
        }

        else {
            item.style.display = "none";
        }

    });

}

// KEYBOARD SUPPORT

document.addEventListener("keydown", (e) => {

    if (lightbox.style.display === "flex") {

        if (e.key === "ArrowRight") {
            nextImage();
        }

        if (e.key === "ArrowLeft") {
            prevImage();
        }

        if (e.key === "Escape") {
            lightbox.style.display = "none";
        }

    }

});

// CLOSE WHEN CLICKING OUTSIDE IMAGE

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }

});

// OPTIONAL AUTO SCROLL TO GALLERY

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});