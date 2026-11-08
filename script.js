// ⚠️ APNI GF KA BIRTH YEAR YAHAN DAALO
const CORRECT_PIN = "2008"; // <-- change karo

// ===== LOCK SCREEN =====
const lockScreen = document.getElementById("lockScreen");
const mainScreen = document.getElementById("mainScreen");
const pinInput = document.getElementById("pinInput");
const unlockBtn = document.getElementById("unlockBtn");
const pinError = document.getElementById("pinError");

unlockBtn.addEventListener("click", checkPin);
pinInput.addEventListener("keypress", e => { 
  if (e.key === "Enter") checkPin(); 
});

function checkPin() {
  if (pinInput.value === CORRECT_PIN) {
    lockScreen.classList.remove("active");
    mainScreen.classList.add("active");
    startHearts();
    burstConfetti(120);
  } else {
    pinError.textContent = "Oops! Try again, my love 😢";
    pinInput.classList.add("shake");
    setTimeout(() => pinInput.classList.remove("shake"), 500);
    pinInput.value = "";
  }
}

// ===== FLOATING HEARTS =====
function startHearts() {
  const container = document.getElementById("hearts-container");
  const hearts = ["💖","💕","❤️","💗","💝","🌹","✨","💞"];
  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = hearts[Math.floor(Math.random()*hearts.length)];
    h.style.left = Math.random()*100 + "vw";
    h.style.fontSize = (18 + Math.random()*22) + "px";
    h.style.animationDuration = (6 + Math.random()*6) + "s";
    container.appendChild(h);
    setTimeout(() => h.remove(), 12000);
  }, 450);
}

// ===== MODAL =====
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
document.querySelector(".close").onclick = () => modal.classList.remove("show");

// ===== SURPRISE CONTENT (BADA) =====
const surprises = {
  poem: {
    title: "💌 A Poem For You",
    text: "Tumhari muskurahat mein ek jahaan basta hai,\nTumhare bina ye dil har pal tarsata hai.\nChaand bhi sharma jaaye tumse dekh kar,\nMeri duniya tum ho, tumse hai sab kuch shuru.\n\nChandni raaton mein tumhara naam leta hoon,\nHar dua mein bas tumhe hi maangta hoon.\nZindagi bhar tumhara saath chahiye mujhe,\nTum ho toh sab kuch hai, warna kuch bhi nahi.\n\n— Sirf tumhare liye ❤️"
  },
  compliment: {
    title: "🌹 A Compliment",
    text: "Tumhari aankhon mein poori duniya ka noor hai. Tum jitni pyari ho, utni hi zyada special ho meri life mein. Tumhari hansi meri sabse badi khushi hai. Sach mein, main bahut lucky hoon jo tum meri life mein ho. Tum ho toh sab kuch hai. 💕"
  },
  memory: {
    title: "💭 Our Memory",
    text: "Yaad hai jab hum pehli baar mile the? Woh pal aaj bhi mere dil mein fresh hai. Us din se aaj tak, har moment tumhare saath magical raha hai. Tumhare saath bitaya har lamha meri zindagi ki sabse pyari yaad hai. Aur bahut si yaadein banani hain tumhare saath. ✨"
  },
  wish: {
    title: "🎂 Birthday Wish",
    text: "Happy Birthday meri jaan! 🎉 Khuda tumhe har khushi de, tumhari har wish poori ho. Tum hamesha aisi hi muskurati raho. Tumhari zindagi mein sirf khushiyan aayein, koi gham na aaye. Main hamesha tumhare saath hoon, har pal, har mod pe. I love you so much. 💖"
  },
  question: {
    title: "❓ A Question",
    text: "Kya tum bhi mujhse utna hi pyaar karti ho jitna main tumse karta hoon? 🥺 Just kidding — mujhe pata hai tum karti ho. Tumhari aankhein sab keh deti hain. Main sirf itna kehna chahta hoon ki tum meri duniya ho. 💕"
  },
  secret: {
    title: "🔐 A Secret",
    text: "Kabhi kabhi main sochta hoon... ki agar tum na hoti, toh meri life kitni boring hoti. Tum meri life ka best part ho. Tumse milne se pehle mujhe nahi pata tha ki pyaar kaisa hota hai. Ab jaanta hoon — aur woh tum ho. 💗"
  }
};

document.querySelectorAll(".surprise-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.surprise;
    const data = surprises[key];
    if (data) {
      modalTitle.textContent = data.title;
      modalText.innerText = data.text;
      modal.classList.add("show");
      burstConfetti(25);
    }
  });
});

// ===== PHOTO CLICK =====
document.querySelectorAll(".photo-card").forEach(card => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title;
    modalText.innerText = card.dataset.msg;
    modal.classList.add("show");
    burstConfetti(20);
  });
});

// ===== FINAL BUTTON =====
document.getElementById("finalBtn").addEventListener("click", () => {
  modalTitle.textContent = "🎆 One Last Thing...";
  modalText.innerText = "You are the best thing that ever happened to me. Happy Birthday again, my love. Here's to forever together. 💕🎂✨";
  modal.classList.add("show");
  burstConfetti(180);
});

// ===== CONFETTI =====
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let confettiPieces = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function burstConfetti(count = 80) {
  const colors = ["#ff6a88","#ff99ac","#a1c4fd","#ffd93d","#6bcB77","#ff3b5c","#ffb3c6"];
  for (let i = 0; i < count; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: -20,
      r: Math.random() * 7 + 3,
      color: colors[Math.floor(Math.random()*colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1,
      rot: Math.random() * 360,
      rotSpeed: Math.random() * 6 - 3
    });
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces.forEach((p, i) => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.rot += p.rotSpeed;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot * Math.PI / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.r, -p.r, p.r*2, p.r*2);
    ctx.restore();
    if (p.y > canvas.height + 20) confettiPieces.splice(i, 1);
  });
  requestAnimationFrame(animateConfetti);
}
animateConfetti();