const d = document;
const headings = d.querySelectorAll(".heading");
const imgContainers = d.querySelectorAll(".img-container");

const imgSub = d.querySelectorAll(".img-title");;

document.addEventListener("DOMContentLoaded", () => {
    // First, animate only the headings
    gsap.fromTo(
        ".heading",
        { y: 20, opacity: 0, zIndex: 15 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.2 },
    );

    // Then, after a small delay, animate the rest of the elements
    // gsap.fromTo(
    //     ".image",
    //     { opacity: 0, scale: 0.9 },
    //     { opacity: 1, scale: 1, duration: 1, ease: "power2.out", delay: 1 }
    // );

    gsap.fromTo(

        ".image",
        { opacity: 0, scale: 0.9, display: "none" }, // Start hidden
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out", delay: 1, display: "block" } // Show smoothly
    );
    
});

imgContainers.forEach((imgContainer) => {
    const mainImage = imgContainer.querySelector(".image");
    const allImages = d.querySelectorAll(".image");

    // Store the original image source in a dataset
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

        // Apply text stroke effect
        headings.forEach((heading) => {
            heading.style.webkitTextStroke = "1px gray";
            heading.style.color = "transparent";
        });

        imgContainer.style.zIndex = "15";
    });

    imgContainer.addEventListener("mouseleave", () => {
        // Restore all images to their original source
        allImages.forEach((img) => {
            img.src = img.dataset.originalSrc;
        });

        imgSub.forEach(element => {
            element.style.display = "none";
        });

        // Reset text styles
        headings.forEach((heading) => {
            heading.style.webkitTextStroke = "0";
            heading.style.color = "white";
        });

        imgContainer.style.zIndex = "0";
    });

    // Cursor-follow effect
    imgContainer.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = imgContainer.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);

        gsap.to(imgContainer, {
            x: x * 0.5, // Adjust multiplier for smoother movement
            y: y * 0.5,
            duration: 0.3,
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
