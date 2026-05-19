let showOnlyVeg = false; // Biến trạng thái để theo dõi đang lọc hay không

function filterMenu() {
    // 1. Lấy tất cả các món ăn bằng ClassName
    const items = document.getElementsByClassName('menu-item');
    const btn = document.getElementById('filter-btn');
    
    // Đảo ngược trạng thái lọc
    showOnlyVeg = !showOnlyVeg;

    // 2. Duyệt qua từng món ăn
    for (let i = 0; i < items.length; i++) {
        const isVeg = items[i].getAttribute('data-veg') === 'true';

        if (showOnlyVeg) {
            // Nếu đang bật lọc: chỉ hiện món chay, ẩn món mặn
            if (isVeg) {
                items[i].style.display = 'flex';
            } else {
                items[i].style.display = 'none';
            }
            btn.innerText = "Show All Menu";
        } else {
            // Nếu tắt lọc: hiện lại tất cả
            items[i].style.display = 'flex';
            btn.innerText = "Show Vegetarian Only";
        }
    }
}