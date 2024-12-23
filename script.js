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
  "❄️ Cuối cùng, mùa Giáng sinh năm nay cũng đã về ❄️ Đây là lần đầu tiên, nhưng không biết có phải là lần cuối cùng hay không ❄️ Biết là em sẽ không thích, nhưng mà kệ hì 🥹 (Trước khi gửi cho em, anh cũng có hỏi Anh Thư trước là nên hay không ? Và Thư hỏi anh là anh tặng Nhi với tư cách gì ? Nyc, anh em bình thường, người thích Nhi và còn bonus thêm quả nữa là làm gì tốt cho anh trước đi. Thật sự thì hiện tại anh muốn tặng em với tư cách là người thích em, sợ mỗi tình huống em trả quà thôi.... Anh tính nhờ Huy giấu luôn nhưng mà nhiều bí mật thì càng khó chịu nên anh quyết định sẽ bày tỏ ở đây. Hiện tại anh không có ý định tán lại hay gì với em đâu, vì anh vẫn còn hoài nghi về bản thân là làm em chán và hiện tại cũng có người đang theo đuổi em nữa, anh biết mỗi A8 thôi hì. Anh không muốn tạo áp lực gì cho em đâu, chỉ là anh muốn bản thân có cơ hội để quen em nếu còn cơ hội trong tương lai thôi, ngày mà cả 2 trưởng thành hơn và có thể tự quyết định mọi việc. Và anh muốn nghĩ đến bản thân mình nhiều hơn trong 2 năm tới. Giống như Trung Kiên, anh muốn được giống như vậy, khi phụ huynh biết đang quen thì mừng rỡ chứ không phải là quát mắng, cãi nhau. Anh đã đọc lại đoạn tin nhắn giữa anh và em hôm đó rất nhiều lần, càng đọc anh càng ngẫm và hiện tại anh đã không thấy nhói nữa. Không phải vì không yêu em nữa mà anh biết là hiện tại chưa phải là thời điểm thích hợp cho việc đó. Anh không coi đây là áp lực, anh coi đây là động lực để anh cố gắng mỗi ngày. Em có hỏi anh tết khom về hả? Anh không phải quên trả lời đâu mà vì về hay không về khác gì đâu hì. Thật ra thì Tết anh phải về Nghệ An rồi. Mong là mỗi dịp lễ em sẽ rep tin nhắn anh nhiệt tình nhé. Hic nãy giờ sến quá nên giờ chúc đàng hoàng nè!!!) Luôn giữ gìn sức khỏe, đừng để bệnh làm phiền em, đặc biệt là trong những dịp quan trọng như thế này ❄️ Mong em luôn khỏe mạnh và đừng quên rằng qua ngày lễ và Tết dương này, sẽ có những bài kiểm tra chờ đợi em phía trước 🥹 Thi tốt nhé 🥹 Anh chúc em một Giáng sinh an lành, tràn ngập niềm vui và hạnh phúc ❄️ Hy vọng mùa đông này tuy lạnh nhưng sẽ mang đến cho em những khoảnh khắc ngọt ngào, ấm áp. 🎄🎅✨❄️🎁";

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
