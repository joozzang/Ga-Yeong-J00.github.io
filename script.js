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

// ESC 키로 모달 닫기
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.remove("show");
    });
  }
});

// 바깥 클릭하면 모달 닫기
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
const accordionButtons = document.querySelectorAll(".accordion");

accordionButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const panel = this.nextElementSibling;

    accordionButtons.forEach((otherBtn) => {
      if (otherBtn !== this) {
        otherBtn.classList.remove("active");
        const otherPanel = otherBtn.nextElementSibling;
        otherPanel.style.maxHeight = null;
        otherPanel.classList.remove("open");
      }
    });

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

/* ------------------ Project Section ------------------ */
const projectCards = document.querySelectorAll(".project-card");
const detailBtn = document.getElementById("project-detail-btn");
const instructionText = document.getElementById("project-instruction");

let selectedProjectIndex = -1;

const descriptions = [
  "🍊 제주 AI 맞춤 여행 추천 플랫폼",
  "📖 이민자를 위한 한국 법률 번역 챗봇",
  "✏️ 난독증 아동을 위한 AI 동화책 생성 학습 플랫폼",
];

// 카드 클릭 이벤트
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
      descDiv.innerHTML = descriptions[index].replace(/\n/g, "<br>"); // ✅ 줄바꿈 반영
    } else {
      card.classList.remove("active");
      descDiv.innerHTML = "";
    }
  });

  instructionText.style.display = "none";
  detailBtn.style.display = "block";
}

// 자세히 보기 버튼 클릭 시
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
