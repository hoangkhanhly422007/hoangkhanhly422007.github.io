function calculateAverage() {
    // 1. Sử dụng querySelectorAll() để lấy tất cả các ô nhập điểm
    const inputs = document.querySelectorAll('.grade-input');
    let total = 0;
    let count = inputs.length;

    // 2. Duyệt qua từng input để cộng dồn điểm
    inputs.forEach(input => {
        // Chuyển giá trị từ text sang Number để cộng
        total += Number(input.value);
    });

    // 3. Tính trung bình
    const average = total / count;

    // 4. Hiển thị kết quả (lấy 2 chữ số thập phân cho đẹp)
    document.getElementById('display-result').innerText = "Average Grade: " + average.toFixed(2);
    
    // Thêm tí màu sắc cho sinh động: Dưới 5 hiện đỏ, trên 5 hiện xanh
    const resultElement = document.getElementById('display-result');
    resultElement.style.color = (average >= 5) ? "green" : "red";
}