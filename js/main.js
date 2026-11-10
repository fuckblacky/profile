// --- Custom Cursor and its Trail ---

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", function (event) {
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    document.body.classList.add("hide-cursor");
    cursor.style.opacity = "1";
});

// --- Click To Enter ---

const enterscreen = document.querySelector(".enter");
const video = document.querySelector(".video");
const volumeslider = document.querySelector(".volume");
const audio = document.querySelector("audio");

enterscreen.addEventListener("click", function () {
    enterscreen.classList.add("hidden");
    video.volume = Number(volumeslider.value);
    video.muted = false;
    video.play();
});

function updateFill() {
    volumeslider.style.setProperty("--fill", (volumeslider.value * 100) + "%");
}

updateFill(); 

volumeslider.addEventListener("input", function () {
    video.volume = Number(volumeslider.value);
    updateFill();
});

// --- Card Tilt ---

const tilt = document.querySelector(".border");

tilt.addEventListener("mousemove", function (event) {
    // Parameters and location of a card (inside function, so they're always updated)
    const rect = tilt.getBoundingClientRect();

    // center of the card
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // how far is a mouse away from the center
    const offsetX = event.clientX - centerX;
    const offsetY = event.clientY - centerY;

    const maxAngle = 10; // Maximum amount of the degrees it'll tilt to

    const rotateY = (offsetX / (rect.width / 2)) * maxAngle;
    const rotateX = (offsetY / (rect.height / 2)) * maxAngle;

    tilt.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

tilt.addEventListener("mouseleave", function () {
    tilt.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
});

// --- Redirection ---
const links = document.querySelectorAll(".links a");   // All 4 links
const redirlink = document.getElementById("redirlink"); // A room in the window for the page
const redirdialog = document.querySelector(".redir");   // The <dialog> itself
const continuebtn = document.querySelector(".continue");
const cancelbtn = document.querySelector(".cancel");
const closebtn = document.querySelector(".redirclose"); // NEW: the ✕ button
let baselink; // Here is where the clicked link will be saved

links.forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();                                 // Deny instantly opening the page
        baselink = link.href;                                   // Save the link, no 'let' anymore
        redirlink.textContent = baselink.replace("https://", ""); // CHANGED: show it without https://
        redirdialog.showModal();                                // Open the window
    });
});

cancelbtn.addEventListener("click", function () {
    redirdialog.close();
});

closebtn.addEventListener("click", function () { // NEW: ✕ closes the window too
    redirdialog.close();
});

continuebtn.addEventListener("click", function () {
    window.open(baselink, "_blank", "noopener,noreferrer");
    redirdialog.close();
});

// --- Typewriter Effect for Texts ---
const textholder = document.getElementById("textholder");
const textstring = textholder.textContent;
let textcount = 0;
let textback = false;

function typeWriter() {
    // Phase A: Change of the way.
    if (textcount == textstring.length) {
        textback = true;
    }
    if (textcount == 0) {
        textback = false;
    }

    // Phase B: Movement based on the way.
    if (textback) {
        textcount -= 1;
    } else {
        textcount += 1;
    }

    // Always the same column, no matter the way.
    textholder.textContent = textstring.slice(0, textcount) + " $";
}

setInterval(typeWriter, 250);

const bioholder = document.getElementById("bioholder");
const biostring = bioholder.textContent;
let biocount = 0;
let bioback = false;

function biotypeWriter() {
    if (biocount == biostring.length) {
        bioback = true;
    }
    if (biocount == 0) {
        bioback = false;
    }

    if (bioback) {
        biocount -= 1;
    } else {
        biocount += 1;
    }

    bioholder.textContent = " " + biostring.slice(0, biocount);
}

setInterval(biotypeWriter, 180);