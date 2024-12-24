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
  "🎄🎅✨❄️🎁 Cuối cùng, mùa Giáng sinh năm nay cũng đã đến rồi ❄️ Đây là lần đầu tiên, nhưng không biết có phải là lần cuối cùng hay không ❄️ Biết là em sẽ không thích, anh thấy cũng kì và ngại vô cùng tận, nhưng mà kệ hì 🥹 (Trước khi gửi cho em, anh cũng có hỏi Anh Thư trước là nên hay không ? Và Thư hỏi anh là anh tặng Nhi với tư cách gì ? Nyc, anh em bình thường, người thích Nhi và còn bonus thêm quả nữa là làm gì tốt cho anh trước đi. Mặc dù sợ nhưng thật sự thì hiện tại anh muốn tặng em với tư cách là người thích em, và anh rất muốn tặng em, với lại là nỗ lực của anh nên mong em sẽ nhận hì (Web xấu tí nhé hic, tại anh không giỏi design)... Anh tính nhờ Huy giấu luôn nhưng mà nhiều bí mật thì càng khó chịu, với lại anh biết mình sẽ không nói trực tiếp được với em nên anh quyết định sẽ bày tỏ vài điều ở đây. Anh tặng nhưng không có ý định tán hay gì đâu, chỉ là anh muốn tặng quà giáng sinh cho người anh coi là đặc biệt thôi hi. Sau hôm đó anh đã đọc lại tin nhắn rất nhiều, và giờ anh không cảm thấy nhói lòng nữa vì anh thấy hiện tại vẫn chưa phải lúc, với lại hạnh phúc là của em mà hì, bây giờ anh cần dành nhiều thời gian hơn cho bản thân hi và mong rằng tương lai anh vẫn còn cơ hội hì. Cũng hơn 3 tháng rồi, không biết tại sao nhưng mà anh thích sự vô tư của em nên anh xin lỗi vì giờ còn thích em (nghe phiền vô cùng tận hì). Thực ra thì anh cũng cảm thấy bản thân đã làm em chán bên cạnh lý do phụ huynh và hiện tại cũng có người theo đuổi em nữa nên… Mong là những dịp lễ đặc biệt, nếu rảnh, em sẽ rep tin nhắn anh nhiệt tình nhé 🥹 Sến đến đây thui, nãy giờ sến quá nên giờ chúc đàng hoàng nè!!!) Là một super hero - super woman 🥹, đừng để bệnh làm phiền em, đặc biệt là trong những dịp quan trọng như thế này ❄️ Đừng quên rằng qua ngày lễ và Tết dương này, sẽ có những bài kiểm tra chờ đợi em phía trước 🥹 Thi tốt nhé, cũng đừng cố thức khuya quá, chăm chỉ hơn nhé 🥹 Hôm nay là đêm Giáng sinh đầu tiên mà anh gửi lời chúc đến em. Anh chúc em một Giáng sinh an lành, tràn ngập niềm vui và hạnh phúc ❄️ Hy vọng mùa đông này tuy lạnh nhưng sẽ mang đến cho em những khoảnh khắc ngọt ngào, ấm áp. Merry Christmas and see you again🎄🎅✨❄️🎁";

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
