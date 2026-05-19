// 1. Tóm lấy các thẻ cần dùng
const passwordInput = document.getElementById('password');
const strengthMeter = document.getElementById('strength-meter');
const strengthText = document.getElementById('strength-text');

// 2. Lắng nghe sự kiện khi người dùng gõ vào ô mật khẩu
passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let strength = ""; // Biến để lưu trạng thái yếu/trung bình/mạnh

    // Kiểm tra nếu có nhập chữ
    if (val.length > 0) {
        // Biểu thức chính quy (Regex) để kiểm tra: có chữ và có số
        const hasLetter = /[a-zA-Z]/.test(val);
        const hasNumber = /[0-9]/.test(val);

        // Logic phân loại:
        if (val.length < 6 || !(hasLetter && hasNumber)) {
            strength = "weak";
            strengthText.innerText = "Yếu";
        } else if (val.length <= 10) {
            strength = "medium";
            strengthText.innerText = "Trung bình";
        } else {
            strength = "strong";
            strengthText.innerText = "Mạnh";
        }
    } else {
        strengthText.innerText = "Chưa nhập";
    }

    // 3. Thay đổi giao diện bằng cách đổi Class (CSS sẽ tự đổi màu/độ dài)
    strengthMeter.className = strength; 
    strengthText.className = strength;
});
// Tóm cái form để chặn load lại trang
const regForm = document.getElementById('regform');

regForm.addEventListener('submit', (e) => {
    e.preventDefault(); // CHẶN trang web load lại (Đây là bí kíp Real-time)

    // 1. Lấy thời gian hiện tại
    const now = new Date();
    const timeString = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    const dateString = now.toLocaleDateString('vi-VN');

    // 2. Hiển thị nội dung vào Pop-up
    document.getElementById('popup-message').innerText = "Register Successfully!";
    document.getElementById('popup-time').innerText = "At: " + timeString + " - " + dateString;

    // 3. Hiện Pop-up
    document.getElementById('success-popup').style.display = "flex";
});

// Hàm đóng pop-up
function closePopup() {
    document.getElementById('success-popup').style.display = "none";
    regForm.reset(); // Xóa sạch dữ liệu form sau khi xong
}