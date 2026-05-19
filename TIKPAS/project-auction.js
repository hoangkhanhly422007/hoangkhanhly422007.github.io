document.addEventListener('DOMContentLoaded', () => {
    console.log("JS đã sẵn sàng!");

    // --- 1. LOGIC ĐẾM NGƯỢC (BẢN FIX TRIỆT ĐỂ) ---
    let timeLeft = 7200; // 2 tiếng (tính bằng giây)
    const countdownEl = document.getElementById('countdown');

    if (countdownEl) {
        const updateTimer = () => {
            if (timeLeft <= 0) {
                countdownEl.innerText = "HẾT GIỜ";
                clearInterval(timerInterval);
                return;
            }

            timeLeft--;
            const h = Math.floor(timeLeft / 3600).toString().padStart(2, '0');
            const m = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0');
            const s = (timeLeft % 60).toString().padStart(2, '0');
            
            countdownEl.innerText = `${h}:${m}:${s}`;
        };

        // Chạy ngay lập tức để không bị khựng 1 giây đầu
        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);
    } else {
        console.error("LỖI: Không tìm thấy thẻ có id là 'countdown' trong HTML!");
    }

    // --- 2. ĐỊNH DẠNG TIỀN TỆ (DẤU CHẤM) ---
    const bidInput = document.getElementById('bid-input');
    if (bidInput) {
        const formatValue = (val) => {
            let n = val.replace(/\D/g, "");
            return n.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        };

        // Format giá trị có sẵn lúc đầu
        bidInput.value = formatValue(bidInput.value);

        bidInput.addEventListener('input', (e) => {
            e.target.value = formatValue(e.target.value);
        });
    }

    // --- 3. LOGIC BLOG (ĐĂNG BÀI) ---
    const btnPost = document.getElementById('btn-post-blog');
    if (btnPost) {
        btnPost.onclick = () => {
            const tit = document.getElementById('blog-title-input').value;
            const con = document.getElementById('blog-content-input').value;
            const imgInput = document.getElementById('blog-image-input');
            const container = document.getElementById('blog-container');

            if (tit && con) {
                const imgUrl = imgInput.files[0] ? URL.createObjectURL(imgInput.files[0]) : "";
                const postHTML = `
                    <div class="glass-card p-4 rounded-xl border-l-4 border-[#FF69B4] mb-4 animate-fade-in">
                        <h4 class="font-bold text-cyan-400">${tit}</h4>
                        <p class="text-xs opacity-80">${con}</p>
                        ${imgUrl ? `<img src="${imgUrl}" class="w-full h-32 object-cover rounded-lg mt-2">` : ""}
                    </div>`;
                container.insertAdjacentHTML('afterbegin', postHTML);
                document.getElementById('blog-modal').classList.add('hidden');
            } else {
                alert("Mày nhập thiếu rồi!");
            }
        };
    }
});