const d = document;
const headings = d.querySelectorAll(".heading");
const imgContainers = d.querySelectorAll(".img-container");

const imgSub = d.querySelectorAll(".img-title");;

document.addEventListener("DOMContentLoaded", () => {

    gsap.fromTo(
        ".heading",
        { y: 20, opacity: 0, zIndex: 15 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1 },
    );

    gsap.fromTo(

        ".image",
        { opacity: 0, scale: 0.9, display: "none" }, // Start hidden
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out", delay: 1, display: "block" } // Show smoothly
    );
    
});

imgContainers.forEach((imgContainer) => {
    const mainImage = imgContainer.querySelector(".image");
    const allImages = d.querySelectorAll(".image");

    allImages.forEach((img) => {
        img.dataset.originalSrc = img.src;
    });

    imgContainer.addEventListener("mouseenter", () => {
        const imgTitle = imgContainer.querySelector(".img-title");
        // Replace all images except the hovered one with the SVG
        allImages.forEach((img) => {
            if (img !== mainImage) {
                img.src = "./assets/box.svg";
            }
        });

        if (imgTitle) imgTitle.style.display = "block";

        headings.forEach((heading) => {
            heading.style.webkitTextStroke = "1px gray";
            heading.style.color = "transparent";
        });

        imgContainer.style.zIndex = "15";
    });

    imgContainer.addEventListener("mouseleave", () => {

        allImages.forEach((img) => {
            img.src = img.dataset.originalSrc;
        });

        imgSub.forEach(element => {
            element.style.display = "none";
        });

        headings.forEach((heading) => {
            heading.style.webkitTextStroke = "0";
            heading.style.color = "white";
        });

        imgContainer.style.zIndex = "0";
    });

    imgContainer.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = imgContainer.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);

        gsap.to(imgContainer, {
            x: x * 0.5,
            y: y * 0.5,
            duration: 0.7,
            ease: "power2.out",
        });
    });

    imgContainer.addEventListener("mouseleave", () => {
        gsap.to(imgContainer, {
            x: 0,
            y: 0,
            duration: 2,
            ease: "power2.out",
        });
    });
});
