// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    mirror: true
});

//---------SCREEN BACKGROUND

const canvas=document.getElementById("networkCanvas");
const ctx=canvas.getContext("2d");

let particles=[];
const numberOfParticles=70;

function resizeCanvas(){

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",resizeCanvas);

class Particle{

constructor(){

this.reset();

}

reset(){

this.x=Math.random()*canvas.width;

this.y=Math.random()*canvas.height;

this.size=Math.random()*2+1;

this.speedX=(Math.random()-.5)*0.4;

this.speedY=(Math.random()-.5)*0.4;

}

update(){

this.x+=this.speedX;
this.y+=this.speedY;

if(this.x<0||this.x>canvas.width) this.speedX*=-1;
if(this.y<0||this.y>canvas.height) this.speedY*=-1;

}

draw(){

ctx.beginPath();

ctx.arc(this.x,this.y,this.size,0,Math.PI*2);

ctx.fillStyle="rgba(168,85,247,.9)";

ctx.shadowColor="#A855F7";

ctx.shadowBlur=12;

ctx.fill();

ctx.shadowBlur=0;

}

}

for(let i=0;i<numberOfParticles;i++){

particles.push(new Particle());

}

const mouse={

x:null,

y:null,

radius:180

};

window.addEventListener("mousemove",e=>{

mouse.x=e.x;
mouse.y=e.y;

});

function connectParticles(){

for(let a=0;a<particles.length;a++){

for(let b=a;b<particles.length;b++){

const dx=particles[a].x-particles[b].x;
const dy=particles[a].y-particles[b].y;

const distance=Math.sqrt(dx*dx+dy*dy);

if(distance<150){

ctx.strokeStyle=`rgba(168,85,247,${1-distance/150})`;

ctx.lineWidth=.7;

ctx.beginPath();

ctx.moveTo(particles[a].x,particles[a].y);

ctx.lineTo(particles[b].x,particles[b].y);

ctx.stroke();

}

}

}

}

function mouseInteraction(){

particles.forEach(p=>{

if(mouse.x==null) return;

const dx=mouse.x-p.x;

const dy=mouse.y-p.y;

const dist=Math.sqrt(dx*dx+dy*dy);

if(dist<mouse.radius){

p.x-=dx*.002;
p.y-=dy*.002;

}

});

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

p.update();

p.draw();

});

mouseInteraction();

connectParticles();

requestAnimationFrame(animate);

}

animate();


// --------------- STICKY NAVBAR 
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // At the very top
    if (currentScroll <= 0) {
        navbar.style.transform = "translateY(0)";
        navbar.classList.remove("navbar-active");
        return;
    }

    // Scrolling down
    if (currentScroll > lastScrollTop) {
        navbar.style.transform = "translateY(-100%)";
    }

    // Scrolling up
    else {
        navbar.style.transform = "translateY(0)";
        navbar.classList.add("navbar-active");
    }

    lastScrollTop = currentScroll;
});


//-----------Dynamic HEading
/*=========================
DYNAMIC HERO HEADING
=========================*/

const dynamicWord = document.querySelector(".dynamic-word");

const heroWords = [
    "Modern Websites",
    "Digital Presence",
    "Smart Solutions",
    "Digital Growth"
];

let wordIndex = 0;

function changeHeroWord(){

    dynamicWord.classList.add("change-out");

    setTimeout(() => {

        wordIndex++;

        if(wordIndex >= heroWords.length){
            wordIndex = 0;
        }

        dynamicWord.textContent = heroWords[wordIndex];

        dynamicWord.classList.remove("change-out");
        dynamicWord.classList.add("change-in");

        setTimeout(() => {
            dynamicWord.classList.remove("change-in");
        },350);

    },350);
}

setInterval(changeHeroWord,3000);



// ---------- PROJECT POPUP

const projects = {

    1: {
        title: "Resort Website",
        category: "Wordpress",
        description: "Modern responsive Hotel website with smooth animations and premium UI.",
        video: "videos/project1.mp4",
        features: [
            "Fully Responsive",
            "Modern & Premium UI",
            "Smooth Animations",
            "Modern Layout",
            "Cross Browser Compatible"
        ],
        tech: [
            "Wordpress",
            "Elementor"
        ],
        live: "https://detulip.com",
        github: "https://github.com/yourusername/project1"
    },

    2: {
        title: "E-Commerce Website",
        category: "WooCommerce",
        description: "Responsive eCommerce website built with WordPress and WooCommerce.",
        video: "videos/project2.mp4",
        features: [
            "Responsive Design",
            "SEO Friendly",
            "Contact Form",
            "Fast Loading"
        ],
        tech: [
            "WordPress",
            "WooCommerce",
            "Woodmart"
        ],
        live: "https://mahakbeautyshop.com",
        github: "#"
    },

    3: {
        title: "E-Commerce Website",
        category: "WooCommerce",
        description: "Online shopping website developed using WooCommerce.",
        video: "videos/project3.mp4",
        features: [
            "Shopping Cart",
            "Checkout",
            "Responsive",
            "Payment Integration"
        ],
        tech: [
            "WooCommerce",
            "WordPress"
        ],
        live: "https://your-live-link.com",
        github: "#"
    }

    /* Add Project 4,5,6 in same format */

};


// -----------POPUP OPEN 
const cards = document.querySelectorAll(".project-card");
const popup = document.querySelector(".project-popup");
const closeBtn = document.querySelector(".close-popup");

const popupTitle = document.getElementById("popupTitle");
const popupDescription = document.getElementById("popupDescription");
const popupVideo = document.getElementById("popupVideo");
const popupFeatures = document.getElementById("popupFeatures");
const popupTech = document.getElementById("popupTech");
const popupLive = document.getElementById("popupLive");
const popupGithub = document.getElementById("popupGithub");
const popupCategory = document.querySelector(".popup-category");

cards.forEach(card => {
    card.querySelector(".details-btn").addEventListener("click", () => {

        const id = card.dataset.project;
        const project = projects[id];
        popupTitle.textContent = project.title;
        popupDescription.textContent = project.description;
        popupCategory.textContent = project.category;
        popupVideo.src = project.video;
        popupLive.href = project.live;
        popupGithub.href = project.github;
        popupFeatures.innerHTML = "";
        project.features.forEach(feature => {

            popupFeatures.innerHTML += `<li>${feature}</li>`;

        });

        popupTech.innerHTML = "";

        project.tech.forEach(item => {

            popupTech.innerHTML += `<span>${item}</span>`;

        });

        popup.classList.add("active");

        document.body.style.overflow = "hidden";

        popupVideo.load();

    });

});

// ------POPUP CLOSE

function closePopup(){

    popup.classList.remove("active");

    document.body.style.overflow = "auto";

    popupVideo.pause();

    popupVideo.currentTime = 0;

}

closeBtn.addEventListener("click", closePopup);

popup.addEventListener("click", function(e){

    if(e.target === popup){

        closePopup();

    }

});

document.addEventListener("keydown", function(e){

    if(e.key === "Escape"){

        closePopup();

    }

});



// --------------- MOBILE MENU

const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".mobile-sidebar");
const overlay = document.querySelector(".menu-overlay");
const menuCloseBtn = document.querySelector(".close-menu");
const menuLinks = document.querySelectorAll(".sidebar-links a");

function openMenu() {
    if (!sidebar || !overlay || !menuToggle) return;

    sidebar.classList.add("active");
    overlay.classList.add("active");
    menuToggle.classList.add("active");

    document.body.style.overflow = "hidden";
}

function closeMenu() {
    if (!sidebar || !overlay || !menuToggle) return;

    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    menuToggle.classList.remove("active");

    document.body.style.overflow = "";
}

// Open Menu
if (menuToggle) {
    menuToggle.addEventListener("click", openMenu);
}

// Close Button
if (menuCloseBtn) {
    menuCloseBtn.addEventListener("click", closeMenu);
}

// Overlay Click
if (overlay) {
    overlay.addEventListener("click", closeMenu);
}

// Close on Link Click
menuLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});




// ---------- CUSTOM CURSOR

const cursorDot=document.querySelector(".cursor-dot");
const cursorRing=document.querySelector(".cursor-ring");

let mouseX=0;
let mouseY=0;

let ringX=0;
let ringY=0;

window.addEventListener("mousemove",(e)=>{

mouseX=e.clientX;
mouseY=e.clientY;

cursorDot.style.left=mouseX+"px";
cursorDot.style.top=mouseY+"px";

});

function animateCursor(){

ringX+=(mouseX-ringX)*0.15;
ringY+=(mouseY-ringY)*0.15;

cursorRing.style.left=ringX+"px";
cursorRing.style.top=ringY+"px";

requestAnimationFrame(animateCursor);

}

animateCursor();

/* Hover Effect */

document.querySelectorAll(
'a,button,.btn-primary,.project-card,.service-card,.experience-card,.skill-card'
).forEach(item=>{

item.addEventListener("mouseenter",()=>{

cursorRing.classList.add("hover");
cursorDot.classList.add("hover");

});

item.addEventListener("mouseleave",()=>{

cursorRing.classList.remove("hover");
cursorDot.classList.remove("hover");

});

});


// --------SCROLL TO TOP
/*=========================
SCROLL TO TOP
=========================*/

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){
        scrollTopBtn.classList.add("show");
    }else{
        scrollTopBtn.classList.remove("show");
    }

});

scrollTopBtn.addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

// ---------form submission
const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitBtn = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalText = submitBtn.textContent;

        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();

            if (result.success) {

                submitBtn.textContent = "Message Sent ✓";

                contactForm.reset();

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);

            } else {

                console.error(result);

                submitBtn.textContent = "Try Again";
                submitBtn.disabled = false;
            }

        } catch (error) {

            console.error(error);

            submitBtn.textContent = "Try Again";
            submitBtn.disabled = false;
        }

    });

}
