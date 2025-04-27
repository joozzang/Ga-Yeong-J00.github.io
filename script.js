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
const detailBtn = document.getElementById("project-detail-btn");
const instructionText = document.getElementById("project-instruction");

let selectedProjectIndex = -1;

const descriptions = [
  "AI 기반 제주 맞춤 여행 추천 플랫폼",
  "이민자를 위한 한국 법률 번역 챗봇",
  "난독증 아동을 위한 AI 기반 동화책 생성 학습 플랫폼",
];

projectCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    selectedProjectIndex = index;
    updateCardStates();
  });
});

// 카드 스타일 & 설명 업데이트
function updateCardStates() {
  projectCards.forEach((card, index) => {
    const descDiv = card.querySelector(".project-description-inline");

    if (index === selectedProjectIndex) {
      card.classList.add("active");
      descDiv.textContent = descriptions[index];
    } else {
      card.classList.remove("active");
      descDiv.textContent = "";
    }
  });

  // ✅ 클릭했으면 안내문구 숨기고, detail 버튼 보이게
  instructionText.style.display = "none";
  detailBtn.style.display = "block";
}

// 자세히 보기 버튼
detailBtn.addEventListener("click", () => {
  if (selectedProjectIndex === -1) {
    // 클릭 안 했으면 그냥 아무것도 안함
    return;
  }

  const projectIds = [
    "proj1DetailModal",
    "proj2DetailModal",
    "proj3DetailModal",
  ];
  const targetModalId = projectIds[selectedProjectIndex];

  closeModal("projectsModal");
  openModal(targetModalId);
});
