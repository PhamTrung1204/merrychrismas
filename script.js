const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Tạo các bông tuyết
const snowflakes = Array.from({ length: 150 }).map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 3 + 2, // Kích thước bông tuyết
  speed: Math.random() * 3 + 1,
  angle: Math.random() * Math.PI * 2, // Góc quay
  opacity: Math.random() * 0.8 + 0.2, // Độ trong suốt
}));

// Hàm vẽ bông tuyết 6 cánh
function drawSnowflake(flake) {
  ctx.save();
  ctx.translate(flake.x, flake.y);
  ctx.rotate(flake.angle);
  ctx.globalAlpha = flake.opacity;

  ctx.strokeStyle = "white";
  ctx.lineWidth = 1.5;

  // Vẽ 6 cánh
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -flake.radius); // Vẽ đường thẳng từ tâm ra ngoài
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, -flake.radius * 0.6);
    ctx.lineTo(-flake.radius * 0.2, -flake.radius * 0.8); // Nhánh phụ bên trái
    ctx.moveTo(0, -flake.radius * 0.6);
    ctx.lineTo(flake.radius * 0.2, -flake.radius * 0.8); // Nhánh phụ bên phải
    ctx.stroke();

    ctx.rotate((Math.PI * 2) / 6); // Xoay để vẽ cánh tiếp theo
  }

  ctx.restore();
}

// Hàm vẽ tất cả bông tuyết
function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snowflakes.forEach((flake) => {
    drawSnowflake(flake);
  });
}

// Cập nhật vị trí và góc quay của bông tuyết
function updateSnowflakes() {
  snowflakes.forEach((flake) => {
    flake.y += flake.speed;
    flake.x += Math.sin(flake.y / 50) * 1; // Hiệu ứng trôi ngang
    flake.angle += 0.01; // Xoay nhẹ bông tuyết

    if (flake.y > canvas.height) {
      flake.y = -flake.radius;
      flake.x = Math.random() * canvas.width;
    }
  });
}

// Hàm hoạt ảnh
function animateSnow() {
  drawSnowflakes();
  updateSnowflakes();
  requestAnimationFrame(animateSnow);
}

animateSnow();

// Thêm âm thanh gõ phím
const keySound = new Audio("key-press-sound.mp3");

// Phát nhạc Giáng Sinh
const audio = new Audio("love-is-official-mv.mp3"); // Thay bằng đường dẫn chính xác
audio.loop = true;
audio.volume = 0.5; // Âm lượng 50%

// Tự động phát nhạc sau khi trang tải xong
window.addEventListener("DOMContentLoaded", () => {
  const playMusicButton = document.createElement("button");
  playMusicButton.textContent = "🎵";

  // Thiết lập vị trí và kiểu dáng
  playMusicButton.style.position = "fixed";
  playMusicButton.style.bottom = "10px";
  playMusicButton.style.left = "50%";
  playMusicButton.style.transform = "translateX(-50%)";
  playMusicButton.style.padding = "15px 25px";
  playMusicButton.style.fontSize = "1.5rem";
  playMusicButton.style.color = "#fff";
  playMusicButton.style.backgroundColor = "#fff"; // Màu cam đậm để nổi bật
  playMusicButton.style.border = "none";
  playMusicButton.style.borderRadius = "50%"; // Nút hình tròn để thêm phần mềm mại
  playMusicButton.style.cursor = "pointer";
  playMusicButton.style.boxShadow = "0 8px 20px rgba(255, 99, 71, 0.7)"; // Ánh sáng mềm mại
  playMusicButton.style.transition = "transform 0.3s, box-shadow 0.3s"; // Hiệu ứng chuyển động

  // Hiệu ứng hover khi di chuột vào nút
  playMusicButton.addEventListener("mouseover", () => {
    playMusicButton.style.transform = "scale(1.1)"; // Phóng to nút
    playMusicButton.style.boxShadow = "0 15px 25px rgba(255, 99, 71, 0.9)"; // Tạo hiệu ứng bóng mượt
  });

  // Hiệu ứng khi di chuột ra khỏi nút
  playMusicButton.addEventListener("mouseleave", () => {
    playMusicButton.style.transform = "scale(1)"; // Trở lại kích thước ban đầu
    playMusicButton.style.boxShadow = "0 8px 20px rgba(255, 99, 71, 0.7)"; // Trở lại bóng gốc
  });

  playMusicButton.addEventListener("click", () => {
    audio
      .play()
      .then(() => {
        playMusicButton.style.display = "none"; // Ẩn nút sau khi nhạc phát
      })
      .catch((error) => {
        console.error("Error playing audio:", error);
      });
  });

  document.body.appendChild(playMusicButton);
});

// Lấy các phần tử HTML
const treeImage = document.querySelector(".tree img");
const modal = document.getElementById("wish-modal");
const closeModal = document.getElementById("close-modal");
const wishMessage = document.getElementById("wish-message");

// Lời chúc
const message =
  "❄️ Cuối cùng, mùa Giáng sinh năm nay cũng đã về ❄️ Đây là lần đầu tiên, nhưng không biết có phải là lần cuối cùng hay không ❄️ Biết là em sẽ không thích nên anh xin lỗi trước nhé, nhưng mà kệ hì 🥹 (Ngại cực nhưng kệ) Luôn giữ gìn sức khỏe, đừng để bệnh làm phiền em, đặc biệt là trong những dịp quan trọng như thế này. Mong em luôn khỏe mạnh và đừng quên rằng qua ngày lễ và Tết dương này, sẽ có những bài kiểm tra chờ đợi em phía trước 🥹 Thi tốt nhé 🥹 Anh chúc em một Giáng sinh an lành, tràn ngập niềm vui và hạnh phúc. Hy vọng mùa đông này tuy lạnh nhưng sẽ mang đến cho em những khoảnh khắc ngọt ngào, ấm áp. 🎄🎅✨❄️🎁";

// Hiển thị modal khi click vào ảnh
treeImage.addEventListener("click", () => {
  wishMessage.textContent = ""; // Xóa nội dung cũ
  modal.style.display = "block";
  let i = 0;

  // Ẩn nút đóng modal khi bắt đầu chạy chữ
  closeModal.style.display = "none";

  // Hiệu ứng chạy chữ
  const typingEffect = setInterval(() => {
    if (i < message.length) {
      wishMessage.textContent += message.charAt(i);
      keySound.play(); // Phát âm thanh gõ phím
      i++;
    } else {
      clearInterval(typingEffect); // Dừng hiệu ứng sau khi chạy xong
      closeModal.style.display = "block"; // Hiển thị nút đóng modal khi hiệu ứng hoàn tất

      // Dừng nhạc gõ phím sau khi chạy xong
      keySound.pause();
      keySound.currentTime = 0;
    }
  }, 100); // Tốc độ chạy chữ
});

// Đóng modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
