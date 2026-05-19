function togglePrice() {
    // 1. Lấy tất cả các phần tử có class là 'price'
    // Lưu ý: getElementsByClassName trả về một danh sách (HTMLCollection)
    const prices = document.getElementsByClassName('price');

    // 2. Dùng vòng lặp để duyệt qua từng cái giá một
    for (let i = 0; i < prices.length; i++) {
        // classList.toggle sẽ tự thêm 'hidden' nếu chưa có, 
        // và xóa 'hidden' nếu đã có rồi.
        prices[i].classList.toggle('hidden');
    }
}