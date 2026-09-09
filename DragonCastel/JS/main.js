
const aboutSection = document.querySelector(".about");
const aboutTitle = aboutSection.querySelector("h2");
const cards = aboutSection.querySelectorAll("article");

aboutTitle.style.opacity = "0";
aboutTitle.style.transform = "translateY(40px)";
aboutTitle.style.transition = "1s ease";

cards.forEach((card,index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(70px)";

    card.style.transition = `
        opacity .8s ease ${index * 150}ms,
        transform .8s ease ${index * 150}ms,
        border-color .4s ease,
        box-shadow .4s ease
    `;
});

const aboutObserver = new IntersectionObserver((entries,observer) => {

    entries.forEach(entry => {

        if(!entry.isIntersecting) return;

        aboutTitle.style.opacity = "1";
        aboutTitle.style.transform = "translateY(0)";

        cards.forEach(card => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        });

        observer.unobserve(entry.target);

    });

},{
    threshold:.15
});

aboutObserver.observe(aboutSection);


cards.forEach(card => {

    card.addEventListener("mousemove",(e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transition = "transform .1s ease";

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)
        `;

    });


    card.addEventListener("mouseleave",() => {

        card.style.transition = "transform .5s ease";

        card.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0)
        `;

    });

});
