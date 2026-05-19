// Bước 1: Tóm lấy cái Form
const subForm = document.getElementById('subForm');
const msg = document.getElementById('msg');

subForm.addEventListener('submit', function(e) {
    // Bước 2: Chặn load trang để xử lý
    e.preventDefault();

    // Bước 3: Lấy giá trị cơ bản
    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('emailAddr').value.trim();
    
    // Bước 4: Kiểm tra Email (Yêu cầu: phải có @ và domain)
    // Dùng indexOf để tìm vị trí ký tự. Nếu không có sẽ trả về -1
    const hasAt = email.indexOf('@') > 0; 
    const hasDot = email.lastIndexOf('.') > email.indexOf('@') + 1;

    // Bước 5: Kiểm tra Checkbox (Yêu cầu: ít nhất 1 cái được chọn)
    // Lấy tất cả checkbox có class là 'interest'
    const interests = document.querySelectorAll('.interest');
    let checkedCount = 0;
    
    // Duyệt qua danh sách, đứa nào được .checked thì tăng biến đếm
    interests.forEach(item => {
        if (item.checked) checkedCount++;
    });

    // Bước 6: Tổng hợp điều kiện (Validation)
    if (name === "") {
        showError("Please enter your name!");
    } else if (!hasAt || !hasDot) {
        showError("Invalid email format (need @ and domain)!");
    } else if (checkedCount === 0) {
        showError("Please select at least one interest!");
    } else {
        // Bước 7: Thành công (Yêu cầu 4)
        msg.innerText = "Success! Thank you for subscribing.";
        msg.style.color = "green";
        subForm.reset();
    }
});

// Hàm phụ để hiển thị lỗi cho gọn code
function showError(text) {
    msg.innerText = text;
    msg.style.color = "red";
}
function resetEverything() {
    // 1. Tóm lấy cái form và reset toàn bộ input
    const subForm = document.getElementById('subForm');
    subForm.reset(); 

    // 2. Xóa dòng thông báo "Thank you..."
    const msg = document.getElementById('msg');
    msg.innerText = "";
}