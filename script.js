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
const projectCards = document.querySelectorAll(".project-card");
const projectPrevBtn = document.getElementById("project-prev");
const projectNextBtn = document.getElementById("project-next");
const detailBtn = document.getElementById("project-detail-btn");

let currentProjectIndex = 0;

// 카드 표시 업데이트
function updateProjectCards() {
  projectCards.forEach((card, index) => {
    card.classList.remove("project-center-card");
    if (index === currentProjectIndex) {
      card.classList.add("project-center-card");
    }
  });
}

// 프로젝트 상세 모달 열기
function openProjectModal() {
  const centerCard = projectCards[currentProjectIndex];
  const centerId = centerCard.id;

  let detailModalId = "";

  if (centerId === "proj1") detailModalId = "proj1DetailModal";
  else if (centerId === "proj2") detailModalId = "proj2DetailModal";
  else if (centerId === "proj3") detailModalId = "proj3DetailModal";

  if (detailModalId) {
    closeModal("projectsModal"); // 기존 모달 닫고
    openModal(detailModalId); // 상세 모달 열기
  }
}

// 버튼 이벤트 연결
detailBtn.addEventListener("click", openProjectModal);

// 이전/다음 버튼 연결
projectPrevBtn.addEventListener("click", () => {
  currentProjectIndex =
    (currentProjectIndex - 1 + projectCards.length) % projectCards.length;
  updateProjectCards();
});
projectNextBtn.addEventListener("click", () => {
  currentProjectIndex = (currentProjectIndex + 1) % projectCards.length;
  updateProjectCards();
});

// 초기 상태 설정
updateProjectCards();
