// 1. Lấy đối tượng form
const contactForm = document.getElementById('contactForm');
const feedback = document.getElementById('feedback');

// 2. Lắng nghe sự kiện "submit" của form
contactForm.addEventListener('submit', function(e) {
    // CHẶN trang web load lại để xử lý bằng JS
    e.preventDefault();

    // 3. Lấy giá trị từ các trường (dùng .value và .trim() để bỏ khoảng trắng)
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // 4. Kiểm tra Validation (Yêu cầu 4)
    if (name === "" || email === "" || message === "") {
        // Nếu có trường bị trống
        feedback.innerText = "Please fill in all fields!";
        feedback.style.color = "red";
    } else {
        // Nếu tất cả đã đầy đủ
        feedback.innerText = "Success! Your message has been sent.";
        feedback.style.color = "green";

        // Xóa sạch form sau khi gửi thành công
        contactForm.reset();
    }
});