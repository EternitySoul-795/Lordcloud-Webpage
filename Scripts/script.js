//  =================================================

const tabs = document.querySelectorAll(".tab");
const bgImage = document.querySelector("#bgImage");
const title = document.querySelector(".hover-text");
const txtTitle = document.querySelector(".title");
const animatedTitle = document.querySelector(".btext");
const desc = document.querySelector(".desc");

const data = [
    { 
        name: "Minecraft", 
        bname: "minecraft",
        desc: "Create, explore, and survive alone or with friends in Minecraft.", 
        img: "Images/cloud_images/minecraft2.jpg" 
    },
    { 
        name: "Rust",
        bname: "rust",
        desc: "Try to survive, build huge bases, and join forces with fellow players to fend off relentless raids in Rust.", 
        img: "Images/cloud_images/rust.png" 
    },
    { 
        name: "Palworld",
        bname: "palworld",
        desc: "Tame and train creatures in a world full of action, crafting, and battles.", 
        img: "Images/cloud_images/palworld2.png" 
    },
    { 
        name: "Valheim", 
        bname: "valheim",
        desc: "Survive and thrive in a brutal Viking afterlife full of monsters and myth.", 
        img: "Images/cloud_images/valheim.jpg" 
    },
    { 
        name: "Terraria", 
        bname: "terraria",
        desc: "Dig, fight, build, and explore in this action-packed adventure sandbox.", 
        img: "Images/cloud_images/terraria.jpg" 
    }
];


let current = 0;

function activateTab(i) {
    tabs.forEach(tab => tab.classList.remove("active"));
    tabs[i].classList.add("active");

    animatedTitle.innerHTML = `${data[i].bname}`;
    title.innerHTML = `${data[i].name}`;
    
    title.style.animation = "none";
    void title.offsetWidth; // trigger reflow
    title.style.animation = "revealText 2s ease forwards";
    desc.textContent = data[i].desc;
    bgImage.style.backgroundImage = `url('${data[i].img}')`;



    // Restart animation on title
    title.classList.remove("animate");
    void title.offsetWidth; // force reflow
    title.classList.add("animate");

    // Restart animation on animatedTitle
    animatedTitle.classList.remove("animate");
    void animatedTitle.offsetWidth; // force reflow
    animatedTitle.classList.add("animate");

    // Restart animation on txtTitle
    txtTitle.classList.remove("animate");
    void txtTitle.offsetWidth; // force reflow
    txtTitle.classList.add("animate");

    // Restart animation on price
    const price = document.querySelector(".price");
    price.classList.remove("animate");
    void price.offsetWidth; // force reflow
    price.classList.add("animate");

    // Restart animation on desc
    desc.classList.remove("animate");
    void desc.offsetWidth; // force reflow
    desc.classList.add("animate");

    // Restart animation on tag
    const tag = document.querySelector(".tag");
    tag.classList.remove("animate");
    void tag.offsetWidth; // force reflow
    tag.classList.add("animate");

    // Restart animation on start button
    const startButton = document.querySelector(".start-button");
    startButton.classList.remove("animate");
    void startButton.offsetWidth; // force reflow
    startButton.classList.add("animate");

    // Restart animation on vline
    const vline = document.querySelector(".vline");
    vline.classList.remove("animate");
    void vline.offsetWidth; // force reflow
    vline.classList.add("animate");
}


tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
    current = i;
    activateTab(i);
    });
});

setInterval(() => {
    current = (current + 1) % tabs.length;
    activateTab(current);
}, 5000);



// ----------------------------------------------------------------

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}


let activeDropdown = null;

function toggleDropdown(selector) {
  const dropdown = document.querySelector(selector);
  if (!dropdown) return;

  const isAlreadyOpen = dropdown.style.display === "block";

  // Close all dropdowns
  document.querySelectorAll(".dropdown-list, .dropdown-panel").forEach(panel => {
    panel.style.display = "none";
  });

  // Toggle target
  if (!isAlreadyOpen) {
    dropdown.style.display = "block";
    activeDropdown = dropdown;
  } else {
    activeDropdown = null;
  }
}

window.addEventListener("click", function (e) {
  // If the clicked element is not inside a dropdown or button
  if (
    !e.target.closest("dropdown-list") &&
    !e.target.closest(".dropdown-panel") &&
    !e.target.closest(".dropdownbtn") &&
    !e.target.closest(".dropdown-toggle") &&
    !e.target.closest("button") &&
    !e.target.closest("[data-dropdown-trigger]")
  ) {
    document.querySelectorAll(".dropdown-list, .dropdown-panel").forEach(panel => {
      panel.style.display = "none";
    });
    activeDropdown = null;
  }
});



// Section 5 ---------------------------------------------

const track = document.getElementById('carousel-track');
const carouselWrapper = document.querySelector('.carousel-wrapper');

let visibleCards;
let index = 0;
let totalOriginal;
let cardWidthPercent;
let isPaused = false;
let autoplayInterval;

// Helper: Clear all clones
function clearClones() {
  [...track.querySelectorAll('.clone')].forEach(clone => clone.remove());
}

// Helper: Clone first and last cards
function createClones() {
  const cards = Array.from(track.children);
  totalOriginal = cards.length;
  cards.slice(0, visibleCards).forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('clone');
    track.appendChild(clone);
  });
  cards.slice(-visibleCards).reverse().forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('clone');
    track.insertBefore(clone, track.firstChild);
  });
}

// Helper: Set visible cards based on screen width
function getVisibleCards() {
  if (window.innerWidth < 900) return 1;
  if (window.innerWidth < 1000) return 2;
  return 3;
}

// Update carousel dimensions
function updateCarousel() {
  clearClones();
  visibleCards = getVisibleCards();
  const cards = Array.from(track.querySelectorAll('.card-sec5:not(.clone)'));
  cardWidthPercent = 100 / visibleCards;
  track.style.transition = 'none';

  // Set width of each card
  [...track.children].forEach(card => {
    card.style.flex = `0 0 ${cardWidthPercent}%`;
  });

  createClones();

  index = visibleCards;
  track.style.transform = `translateX(-${index * cardWidthPercent}%)`;
}

// Move carousel left/right
function moveCarousel(direction) {
  if (isPaused) return;

  index += direction;
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${index * cardWidthPercent}%)`;

  setTimeout(() => {
    if (index >= track.children.length - visibleCards) {
      track.style.transition = 'none';
      index = visibleCards;
      track.style.transform = `translateX(-${index * cardWidthPercent}%)`;
    }
    if (index < visibleCards) {
      track.style.transition = 'none';
      index = track.children.length - visibleCards * 2;
      track.style.transform = `translateX(-${index * cardWidthPercent}%)`;
    }
  }, 510);
}

// Start autoplay
function startAutoplay() {
  clearInterval(autoplayInterval);
  autoplayInterval = setInterval(() => moveCarousel(1), 3000);
}

// Pause/resume on hover
carouselWrapper.addEventListener('mouseenter', () => isPaused = true);
carouselWrapper.addEventListener('mouseleave', () => isPaused = false);

// Initial setup
window.addEventListener('load', () => {
  updateCarousel();
  startAutoplay();
});

// Recalculate on resize
window.addEventListener('resize', () => {
  updateCarousel();
});




// faq.js ---------------------------


function toggleFaq() {
    const faq = event.currentTarget;
    faq.classList.toggle("active");
    const answer = faq.querySelector(".faq-answer");
    const icon = faq.querySelector(".icon");
    icon.textContent = faq.classList.contains("active") ? "-" : "+";
    if (faq.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
        answer.style.maxHeight = "0px";
    }
}

const container = document.querySelector('.gaming-background');

for (let i = 0; i < 100; i++) {
  const p = document.createElement('span');
  p.className = 'particle';

  // Random size and position
  const size = Math.random() * 4 + 2;
  p.style.width = `${size}px`;
  p.style.height = `${size}px`;
  p.style.left = `${Math.random() * 100}vw`;
  p.style.top = `${Math.random() * 100}vh`;
  p.style.animationDelay = `${Math.random() * 0}s`;
  p.style.animationDuration = `${5 + Math.random() * 5}s`;

  container.appendChild(p);
}




activateTab(current);