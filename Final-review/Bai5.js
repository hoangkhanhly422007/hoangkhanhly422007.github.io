function switchTab(evt, tabId) {
    // 1. Ẩn tất cả nội dung tab kèm class active
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(c => c.classList.remove('active'));

    // 2. Xóa trạng thái active của tất cả các nút bấm
    const links = document.querySelectorAll('.tab-link');
    links.forEach(l => l.classList.remove('active'));

    // 3. Hiển thị tab được chọn
    document.getElementById(tabId).classList.add('active');

    // 4. Đánh dấu nút bấm hiện tại là active
    evt.currentTarget.classList.add('active');
}