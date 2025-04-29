/* ------------------ Typing Effect ------------------ */
const text = "JOO GA YEONG";
let index = 0;

function typeText() {
  const nameElement = document.getElementById("typing-text");
  if (index < text.length) {
    nameElement.textContent += text[index++];
    setTimeout(typeText, 150);
  } else {
    nameElement.classList.add("no-cursor");
    setTimeout(() => {
      document.querySelector(".container").classList.add("show-nav");
    }, 1000);
  }
}

window.onload = () => {
  setTimeout(typeText, 500);
};

/* ------------------ Modal Open/Close ------------------ */
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add("show");
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove("show");
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.remove("show");
    });
  }
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });
});

/* ------------------ Theme Toggle ------------------ */
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

/* ------------------ Accordion ------------------ */
const accordions = document.querySelectorAll(".accordion");
accordions.forEach((acc) => {
  acc.addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      panel.classList.remove("open");
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.classList.add("open");
    }
  });
});

/* ------------------ Project Section ------------------ */
const projectCards = document.querySelectorAll(".project-card");
const detailBtn = document.getElementById("project-detail-btn");
const instructionText = document.getElementById("project-instruction");

let selectedProjectIndex = -1;

const descriptions = [
  "🍊 제주 맞춤 여행<br>AI 추천 플랫폼",
  "📖 이민자를 위한<br>한국 법률 번역 챗봇",
  "✏️ 난독증 아동을 위한 <br>AI 동화책 생성<br>학습 플랫폼",
];

projectCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    selectedProjectIndex = selectedProjectIndex === index ? -1 : index;
    updateCardStates();
  });
});

function updateCardStates() {
  projectCards.forEach((card, index) => {
    const descDiv = card.querySelector(".project-description-inline");
    if (index === selectedProjectIndex) {
      card.classList.add("active");
      card.style.opacity = "1";
      descDiv.innerHTML = descriptions[index].replace(/\n/g, "<br>");
    } else {
      card.classList.remove("active");
      card.style.opacity = "1";
      descDiv.innerHTML = "";
    }
  });
  instructionText.style.display =
    selectedProjectIndex === -1 ? "block" : "none";
  detailBtn.style.display = selectedProjectIndex === -1 ? "none" : "block";
}

detailBtn.addEventListener("click", () => {
  if (selectedProjectIndex === -1) return;
  const projectIds = [
    "proj1DetailModal",
    "proj2DetailModal",
    "proj3DetailModal",
  ];
  const targetModalId = projectIds[selectedProjectIndex];
  closeModal("projectsModal");
  openModal(targetModalId);
});

/* ------------------ Slide Navigation ------------------ */
const slides = document.querySelectorAll(".slide");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");
let currentSlide = 0;

function updateButtons() {
  prevButton.style.display = currentSlide === 0 ? "none" : "block";
  nextButton.style.display =
    currentSlide === slides.length - 1 ? "none" : "block";
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  updateButtons();
}

nextButton.addEventListener("click", () => {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    showSlide(currentSlide);
  }
});

prevButton.addEventListener("click", () => {
  if (currentSlide > 0) {
    currentSlide--;
    showSlide(currentSlide);
  }
});

showSlide(currentSlide);

/* ------------------ Image Slider ------------------ */
const imageSlides = document.querySelectorAll(".image-slide");
const prevImageBtn = document.getElementById("prevImageBtn");
const nextImageBtn = document.getElementById("nextImageBtn");
const pageImageNumber = document.getElementById("pageImageNumber");
const toggleSlideBtn = document.getElementById("toggleSlideBtn");

let currentImage = 0;
let autoSlideInterval;

function showImageSlide(index) {
  imageSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  pageImageNumber.textContent = `${currentImage + 1}/${imageSlides.length}`;
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentImage = (currentImage + 1) % imageSlides.length;
    showImageSlide(currentImage);
  }, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

toggleSlideBtn.addEventListener("click", () => {
  if (autoSlideInterval) {
    stopAutoSlide();
    toggleSlideBtn.textContent = "▶️";
    autoSlideInterval = null;
  } else {
    startAutoSlide();
    toggleSlideBtn.textContent = "⏸️";
  }
});

nextImageBtn.addEventListener("click", () => {
  currentImage = (currentImage + 1) % imageSlides.length;
  showImageSlide(currentImage);
});

prevImageBtn.addEventListener("click", () => {
  currentImage = (currentImage - 1 + imageSlides.length) % imageSlides.length;
  showImageSlide(currentImage);
});

showImageSlide(currentImage);
startAutoSlide();

/* ------------------ Tab Section ------------------ */
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));
    button.classList.add("active");
    document
      .getElementById(button.getAttribute("data-tab"))
      .classList.add("active");
  });
});

/* ------------------ Inner Accordion ------------------ */
const innerAccordions = document.querySelectorAll(".inner-accordion");
innerAccordions.forEach((btn) => {
  btn.addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    panel.style.display = panel.style.display === "block" ? "none" : "block";
  });
});

/* ------------------ Scroll Spacer Toggle ------------------ */
const accordionButtons = document.querySelectorAll(
  ".accordion, .inner-accordion"
);

accordionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setTimeout(() => {
      const anyOpen = document.querySelector(
        ".panel.open, .inner-panel[style*='block']"
      );
      const currentSlide = btn.closest(".slide");
      const spacer = currentSlide?.querySelector(".scroll-spacer");
      if (anyOpen && spacer) {
        spacer.style.display = "block";
        currentSlide.classList.add("scroll-expanded");
      } else if (spacer) {
        spacer.style.display = "none";
        currentSlide.classList.remove("scroll-expanded");
      }
    }, 300);
  });
});
