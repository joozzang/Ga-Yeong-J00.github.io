const text = "JOO GA YEONG";
let index = 0;

function typeText() {
  const nameElement = document.getElementById("typing-text");

  if (index < text.length) {
    nameElement.textContent += text[index];
    index++;
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

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add("show");
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove("show");
}

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.remove("show");
    });
  }
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });
});
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
const accordionButtons = document.querySelectorAll(".accordion");

accordionButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const panel = this.nextElementSibling;

    // 1. 모든 다른 버튼과 패널 닫기
    accordionButtons.forEach((otherBtn) => {
      if (otherBtn !== this) {
        otherBtn.classList.remove("active");
        const otherPanel = otherBtn.nextElementSibling;
        otherPanel.style.maxHeight = null;
        otherPanel.classList.remove("open");
      }
    });

    // 2. 현재 클릭한 버튼 & 패널 토글
    this.classList.toggle("active");

    if (panel.classList.contains("open")) {
      panel.style.maxHeight = null;
      panel.classList.remove("open");
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.classList.add("open");
    }
  });
});
