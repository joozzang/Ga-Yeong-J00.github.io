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
  if (modal) {
    modal.classList.remove("show");

    const projectModals = [
      "proj1DetailModal",
      "proj2DetailModal",
      "proj3DetailModal",
    ];
    if (projectModals.includes(id)) {
      openModal("projectsModal");
    }
  }
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
function initAccordions(scope = document) {
  const accordions = scope.querySelectorAll(".accordion");
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
}

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

/* ------------------ Slide Navigation (Multi Modal) ------------------ */ function setupSlideNavigation(
  modalId,
  prevId,
  nextId,
  slideClass,
  socialSlideId = null
) {
  const modal = document.getElementById(modalId);
  const slides = modal.querySelectorAll(slideClass);
  const nextButton = modal.querySelector(`#${nextId}`);
  const prevButton = modal.querySelector(`#${prevId}`);
  const linkIcons = modal.querySelector(".link-icons");
  let currentSlide = 0;

  function updateButtons() {
    if (!prevButton || !nextButton) return;
    prevButton.style.display = currentSlide === 0 ? "none" : "block";
    nextButton.style.display =
      currentSlide === slides.length - 1 ? "none" : "block";
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
    });
    const target = slides[index];
    if (target) {
      target.classList.add("active");

      // ✅ 해당 슬라이드 내부 accordion 다시 init
      initAccordions(target);

      // ✅ 소셜 아이콘은 특정 페이지에서만 보이게
      if (linkIcons && socialSlideId) {
        linkIcons.style.display = target.id === socialSlideId ? "flex" : "none";
      }
    }

    updateButtons();
  }

  if (nextButton && prevButton) {
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
  }

  showSlide(currentSlide);
}

setupSlideNavigation(
  "proj1DetailModal",
  "jejuPrevButton",
  "jejuNextButton",
  ".slide",
  "jejuPage1"
);
setupSlideNavigation(
  "proj2DetailModal",
  "lawprevButton",
  "lawnextButton",
  ".slide",
  "lawpage1"
);
setupSlideNavigation(
  "proj3DetailModal",
  "prevButton",
  "nextButton",
  ".slide",
  "page1"
);

/* ------------------ Image Sliders ------------------ */
function setupImageSlider(modalId, imagePrefix) {
  const modal = document.getElementById(modalId);
  const imageSlides = modal.querySelectorAll(".image-slide");
  const prevImageBtn = modal.querySelector(`#${imagePrefix}prevImageBtn`);
  const nextImageBtn = modal.querySelector(`#${imagePrefix}nextImageBtn`);
  const pageImageNumber = modal.querySelector(`#${imagePrefix}pageImageNumber`);
  const toggleSlideBtn = modal.querySelector(`#${imagePrefix}toggleSlideBtn`);

  let currentImage = 0;
  let autoSlideInterval;

  function showImageSlide(index) {
    imageSlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    if (pageImageNumber)
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

  if (toggleSlideBtn) {
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
  }

  if (nextImageBtn) {
    nextImageBtn.addEventListener("click", () => {
      currentImage = (currentImage + 1) % imageSlides.length;
      showImageSlide(currentImage);
    });
  }

  if (prevImageBtn) {
    prevImageBtn.addEventListener("click", () => {
      currentImage =
        (currentImage - 1 + imageSlides.length) % imageSlides.length;
      showImageSlide(currentImage);
    });
  }

  showImageSlide(currentImage);
  startAutoSlide();
}

setupImageSlider("proj1DetailModal", "jeju");
setupImageSlider("proj2DetailModal", "law");
setupImageSlider("proj3DetailModal", "");

/* ------------------ Tab Section ------------------ */
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabGroup = button.closest(".tab-container");
    const buttonsInGroup = tabGroup.querySelectorAll(".tab-button");
    const contentsInGroup = tabGroup.querySelectorAll(".tab-content");

    buttonsInGroup.forEach((btn) => btn.classList.remove("active"));
    contentsInGroup.forEach((content) => content.classList.remove("active"));

    button.classList.add("active");
    const targetTab = button.getAttribute("data-tab");
    tabGroup.querySelector(`#${targetTab}`).classList.add("active");
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

const openProblemModalButtons = document.querySelectorAll(
  ".open-problem-modal"
);
const closeProblemModalButtons = document.querySelectorAll(
  ".problem-modal-close"
);
const projectModal = document.getElementById("proj3DetailModal");

openProblemModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-target");
    const modal = document.getElementById(target);

    if (projectModal) {
      projectModal.classList.remove("show");
    }

    if (modal) {
      modal.classList.add("show");
    }
  });
});

closeProblemModalButtons.forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    const modal = closeBtn.closest(".problem-modal");

    if (modal) {
      modal.classList.remove("show");
    }

    if (projectModal) {
      projectModal.classList.add("show");
    }
  });
});

window.addEventListener("click", (e) => {
  document.querySelectorAll(".modal").forEach((modal) => {
    if (e.target === modal) {
      modal.classList.remove("show");

      const projectModals = [
        "proj1DetailModal",
        "proj2DetailModal",
        "proj3DetailModal",
      ];
      if (projectModals.includes(modal.id)) {
        openModal("projectsModal");
      }
      if (modal.id === "microModal" || modal.id === "oledModal") {
        openModal("experienceModal");
      }
    }
  });
  const modals = document.querySelectorAll(".problem-modal");
  modals.forEach((modal) => {
    if (e.target === modal) {
      modal.classList.remove("show");

      if (projectModal) {
        projectModal.classList.add("show");
      }
    }
  });
});
