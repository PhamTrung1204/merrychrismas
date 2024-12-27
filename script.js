const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Tạo các bông tuyết
const snowflakes = Array.from({ length: 150 }).map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 3 + 2,
  speed: Math.random() * 3 + 1,
  angle: Math.random() * Math.PI * 2,
  opacity: Math.random() * 0.8 + 0.2,
}));

// Hàm vẽ bông tuyết 6 cánh
function drawSnowflake(flake) {
  ctx.save();
  ctx.translate(flake.x, flake.y);
  ctx.rotate(flake.angle);
  ctx.globalAlpha = flake.opacity;

  ctx.strokeStyle = "white";
  ctx.lineWidth = 1.5;

  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -flake.radius);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, -flake.radius * 0.6);
    ctx.lineTo(-flake.radius * 0.2, -flake.radius * 0.8);
    ctx.moveTo(0, -flake.radius * 0.6);
    ctx.lineTo(flake.radius * 0.2, -flake.radius * 0.8);
    ctx.stroke();

    ctx.rotate((Math.PI * 2) / 6);
  }

  ctx.restore();
}

function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snowflakes.forEach((flake) => {
    drawSnowflake(flake);
  });
}

function updateSnowflakes() {
  snowflakes.forEach((flake) => {
    flake.y += flake.speed;
    flake.x += Math.sin(flake.y / 50) * 1;
    flake.angle += 0.01;

    if (flake.y > canvas.height) {
      flake.y = -flake.radius;
      flake.x = Math.random() * canvas.width;
    }
  });
}

function animateSnow() {
  drawSnowflakes();
  updateSnowflakes();
  requestAnimationFrame(animateSnow);
}

animateSnow();

const keySound = new Audio("key-press-sound.mp3");
const audio = new Audio("love-is-official-mv.mp3");
audio.loop = true;
audio.volume = 0.5;

let isUserClicked = false;

// Lấy các phần tử HTML
const treeImage = document.querySelector(".tree img");
const modal = document.getElementById("wish-modal");
const closeModal = document.getElementById("close-modal");
const wishMessage = document.getElementById("wish-message");

// Lời chúc
const message =
  "Nếu em mở lại web này thì em sẽ thấy. Không biết em phải cố tình không nhưng mà hiện tại chắc anh không nên nói chuyện với em. Biết là không nên tặng ạ nhưng mà cũng đã làm rồi. Anh đã gom hết những dịp có thể tặng vào 1 lần rồi. Vì anh biết đằng nào em cũng sẽ nói thế. Và anh nghĩ nếu anh không tìm đến em trước thì em cũng không tìm đến anh đâu hì. Sống tốt nhé. Cảm ơn lời chúc từ em.";

// Hàm chạy lời chúc và phát nhạc
function playWish() {
  modal.style.display = "block";

  if (wishMessage.textContent.length === message.length) {
    // Lời chúc đã hoàn thành, chỉ hiện lại modal
    closeModal.style.display = "block";
    return;
  }

  // Nếu lời chúc chưa chạy xong, tiếp tục chạy hiệu ứng
  wishMessage.textContent = "";
  let i = 0;
  closeModal.style.display = "none";

  audio.play();

  const typingEffect = setInterval(() => {
    if (i < message.length) {
      wishMessage.textContent += message.charAt(i);
      keySound.play();
      i++;
    } else {
      clearInterval(typingEffect);
      closeModal.style.display = "block";
      keySound.pause();
      keySound.currentTime = 0;
    }
  }, 100);
}

// Hiển thị modal khi click vào ảnh
treeImage.addEventListener("click", () => {
  isUserClicked = true; // Đánh dấu người dùng đã tương tác
  playWish();
});

// Đóng modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
// Tạo con trỏ chính
const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

// Theo dõi vị trí chuột
window.addEventListener("mousemove", (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

// Hiệu ứng click
window.addEventListener("mousedown", () => {
  cursor.classList.add("click");
  setTimeout(() => cursor.classList.remove("click"), 300); // Gỡ hiệu ứng sau 300ms
});

// Hiệu ứng hover
const interactiveElements = document.querySelectorAll("button, img, a");
interactiveElements.forEach((element) => {
  element.addEventListener("mouseover", () => {
    cursor.classList.add("hover");
  });

  element.addEventListener("mouseout", () => {
    cursor.classList.remove("hover");
  });
});

// Thêm hiệu ứng lấp lánh
setInterval(() => {
  cursor.classList.add("sparkle");
  setTimeout(() => cursor.classList.remove("sparkle"), 1000); // Lặp lại ánh sáng
}, 3000);
document.querySelector(".tree img").addEventListener("click", () => {
  const guideText = document.getElementById("guide-text");
  guideText.textContent = "❄️ YNhi à ❄️"; // Thay đổi nội dung
  guideText.classList.add("glow"); // Thêm lớp hiệu ứng phát sáng
});
