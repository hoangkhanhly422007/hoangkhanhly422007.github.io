document.addEventListener('DOMContentLoaded', () => {
    // --- 1. QUẢN LÝ CHUYỂN TRANG ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-content');

    navLinks.forEach(link => {
        link.onclick = () => {
            const target = link.getAttribute('data-page');
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            link.classList.add('active');
            document.getElementById(target + '-page').classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    });

    // --- 2. LOGIC BLOG (FIX LỖI ENTER) ---
    const blogModal = document.getElementById('blog-modal');
    const btnOpen = document.getElementById('btn-open-blog');
    const btnClose = document.getElementById('btn-close-blog');
    const btnPost = document.getElementById('btn-post-blog');
    const blogContainer = document.getElementById('blog-container');

    function createBlogHTML(title, content, time) {
        return `
            <div class="glass-card p-6 rounded-3xl border-l-4 border-[#FF69B4] mb-6 animate-fade-in">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-blue-500 flex items-center justify-center font-bold text-xs text-white">ME</div>
                    <div><p class="font-bold text-cyan-400">${title}</p><p class="text-[10px] opacity-50">${time}</p></div>
                </div>
                <p class="text-sm leading-relaxed">${content}</p>
            </div>`;
    }

    // Load blog từ máy
    const savedBlogs = JSON.parse(localStorage.getItem('tikpas_blogs')) || [];
    savedBlogs.forEach(b => blogContainer.insertAdjacentHTML('beforeend', createBlogHTML(b.title, b.content, b.time)));

    if (btnOpen) btnOpen.onclick = (e) => { e.preventDefault(); blogModal.classList.remove('hidden'); };
    if (btnClose) btnClose.onclick = (e) => { e.preventDefault(); blogModal.classList.add('hidden'); };

    if (btnPost) {
        btnPost.onclick = (e) => {
            e.preventDefault(); // Chặn Enter làm reset trang
            const tInput = document.getElementById('blog-title-input');
            const cInput = document.getElementById('blog-content-input');
            if (tInput.value.trim() && cInput.value.trim()) {
                const now = new Date().toLocaleString('vi-VN');
                const newB = { title: tInput.value, content: cInput.value, time: now };
                savedBlogs.unshift(newB);
                localStorage.setItem('tikpas_blogs', JSON.stringify(savedBlogs));
                blogContainer.insertAdjacentHTML('afterbegin', createBlogHTML(newB.title, newB.content, now));
                tInput.value = ""; cInput.value = "";
                blogModal.classList.add('hidden');
            }
        };
    }

    // --- 3. LOGIC CHAT (FIX LỖI ENTER MỞ BLOG) ---
    const chatBtn = document.getElementById('chat-btn');
    const chatInput = document.querySelector('#chat-page input');
    const chatMessages = document.getElementById('chat-messages');

    if (chatBtn && chatInput) {
        // Xử lý nút Gửi
        chatBtn.onclick = (e) => {
            e.preventDefault();
            if (chatInput.value.trim() !== "") {
                const msg = document.createElement('div');
                msg.className = "bg-[#FF69B4]/20 p-3 rounded-2xl rounded-tr-none ml-auto w-fit max-w-[80%] border border-[#FF69B4]/30 mb-2 animate-fade-in";
                msg.innerHTML = `<p>${chatInput.value}</p>`;
                chatMessages.appendChild(msg);
                chatInput.value = "";
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        };

        // Bắt sự kiện Enter riêng cho ô Chat
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Chặn không cho Enter kích hoạt nút Blog
                e.stopPropagation(); // Không cho lan ra ngoài
                chatBtn.click();
            }
        });
    }
});
// --- 0. DỮ LIỆU ĐẤU GIÁ (LẤY LẠI ĐÂY) ---
    const auctionItems = [
        { id: 1, name: "VÉ VIP ERAS TOUR", price: "15.000.000đ", time: 3600, img: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14" },
        { id: 2, name: "ÁO SIGNATURE NEON", price: "500.000đ", time: 1800, img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27" },
        { id: 3, name: "LIGHTSTICK LIMITED", price: "1.200.000đ", time: 600, img: "https://vietnamnet.vn/10-thang-mua-lightstick-cua-jack-fan-mat-tien-va-niem-tin-luat-su-len-tieng-2406512.htmlhttps://images.unsplash.com/photo-1514525253361-bee243870eb2" }
    ];

    const auctionContainer = document.getElementById('auction-container');

    if (auctionContainer) {
        auctionContainer.innerHTML = auctionItems.map(item => `
            <div class="glass-card rounded-[2.5rem] overflow-hidden group border border-white/10">
                <div class="relative h-64">
                    <img src="${item.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#FFD700] border border-[#FFD700]/30">
                        RARE ITEM
                    </div>
                </div>
                <div class="p-8">
                    <h3 class="text-xl font-bold mb-2 text-white">${item.name}</h3>
                    <div class="flex justify-between items-end">
                        <div>
                            <p class="text-[10px] opacity-50 uppercase tracking-widest mb-1">Giá hiện tại</p>
                            <p class="text-2xl font-black text-cyan-400">${item.price}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-[10px] opacity-50 mb-1">Kết thúc sau</p>
                            <p class="font-mono font-bold text-[#FF69B4] auction-time" data-time="${item.time}">00:00:00</p>
                        </div>
                    </div>
                    <button class="w-full mt-6 py-4 rounded-2xl font-bold bg-white text-black hover:bg-[#FFD700] transition-all uppercase text-sm tracking-tighter">Đặt giá ngay</button>
                </div>
            </div>
        `).join('');
    }

    // Hàm đếm ngược cho đấu giá
    setInterval(() => {
        document.querySelectorAll('.auction-time').forEach(el => {
            let time = parseInt(el.getAttribute('data-time'));
            if (time > 0) {
                time--;
                el.setAttribute('data-time', time);
                const h = Math.floor(time / 3600);
                const m = Math.floor((time % 3600) / 60);
                const s = time % 60;
                el.innerText = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            } else {
                el.innerText = "HẾT GIỜ";
                el.classList.add('text-red-500');
            }
        });
    }, 1000);