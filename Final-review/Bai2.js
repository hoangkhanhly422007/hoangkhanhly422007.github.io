function changeColor() {
    // 1. Tìm cái bảng bằng ID
    const table = document.getElementById("priceTable");

    // 2. "Bật/Tắt" cái lớp màu đỏ
    // Nếu bảng đang đen -> nó thêm class 'red-text' -> bảng thành đỏ
    // Nếu bảng đang đỏ -> nó xóa class 'red-text' -> bảng về đen (mặc định)
    table.classList.toggle("red-text");
}