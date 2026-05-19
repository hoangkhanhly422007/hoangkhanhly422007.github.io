document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CẬP NHẬT DỮ LIỆU ĐẤU GIÁ MỚI ---
    const auctionItems = [
        { 
            id: 1, 
            name: "VÉ VIP ERAS TOUR - TAYLOR SWIFT", 
            price: "25.000.000đ", 
            time: 86400, 
            img: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14" 
        },
        { 
            id: 2, 
            name: "ÁO SIGNATURE ORIGINAL BTS", 
            price: "1.500.000đ", 
            time: 43200, 
            img: "https://tse3.mm.bing.net/th/id/OIP.XleMtIp8PeJhf5NRCTASCAHaHa?w=600&h=600&rs=1&pid=ImgDetMain&o=7&rm=3" 
        },
        { 
            id: 3, 
            name: "LIGHTSTICK J97 (PHIÊN BẢN GIỚI HẠN)", 
            price: "2.200.000đ", 
            time: 49500, 
            img: "https://th.bing.com/th/id/OIP.WGSjj0SxoNvSKBgk_OCeIwHaFR?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" 
        }
    ];


    // --- 2. QUẢN LÝ CHUYỂN TRANG ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-content');

    navLinks.forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-page');
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            link.classList.add('active');
            const targetPage = document.getElementById(target + '-page');
            if (targetPage) targetPage.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    });

    // --- 3. RENDER ĐẤU GIÁ MỚI ---
    const auctionContainer = document.getElementById('auction-container');
    if (auctionContainer) {
        auctionContainer.innerHTML = auctionItems.map(item => `
            <div class="glass-card rounded-[2.5rem] overflow-hidden group border border-white/10 shadow-2xl">
                <div class="relative h-64 overflow-hidden">
                    <img src="${item.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#FFD700] border border-[#FFD700]/30">RARE ITEM</div>
                </div>
                <div class="p-8">
                    <h3 class="text-xl font-bold mb-2 text-white">${item.name}</h3>
                    <div class="flex justify-between items-end">
                        <div>
                            <p class="text-[10px] opacity-50 uppercase mb-1">Giá hiện tại</p>
                            <p class="text-2xl font-black text-cyan-400">${item.price}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-[10px] opacity-50 mb-1">Kết thúc sau</p>
                            <p class="font-mono font-bold text-[#FF69B4] auction-time" data-time="${item.time}">00:00:00</p>
                        </div>
                    </div>
                    <button type="button" class="w-full mt-6 py-4 rounded-2xl font-bold bg-white text-black hover:bg-[#FFD700] transition-all uppercase text-sm">Đấu giá ngay</button>
                </div>
            </div>
        `).join('');
    }

    // Logic đếm ngược (Giữ nguyên)
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

    // --- 4. LOGIC CHAT (Bản chuẩn fix lỗi Enter) ---
    const chatBtn = document.getElementById('chat-btn');
    const chatInput = document.querySelector('#chat-page input');
    const chatMessages = document.getElementById('chat-messages');

    if (chatBtn && chatInput) {
        const sendMsg = () => {
            const val = chatInput.value.trim();
            if (val !== "") {
                const msg = document.createElement('div');
                msg.className = "bg-[#FF69B4]/20 p-3 rounded-2xl rounded-tr-none ml-auto w-fit max-w-[80%] border border-[#FF69B4]/30 mb-2";
                msg.innerHTML = `<p>${val}</p>`;
                chatMessages.appendChild(msg);
                chatInput.value = "";
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        };
        chatBtn.onclick = (e) => { e.preventDefault(); sendMsg(); };
        chatInput.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                sendMsg();
            }
        };
    }

    // --- FIX LỖI BLOG ĐĂNG BÀI ---
    const blogModal = document.getElementById('blog-modal');
    const btnOpen = document.getElementById('btn-open-blog');
    const btnClose = document.getElementById('btn-close-blog');
    const btnPost = document.getElementById('btn-post-blog');
    const blogContainer = document.getElementById('blog-container');
    const imageInput = document.getElementById('blog-image-input');

    // Hàm tạo giao diện Blog (Tao đã fix để nó không bị lỗi nếu không có ảnh)
    const createBlogHTML = (t, c, time, img) => `
        <div class="glass-card p-6 rounded-3xl border-l-4 border-cyan-400 mb-6 animate-fade-in shadow-xl">
            <h4 class="text-xl font-bold text-cyan-400 mb-2">${t}</h4>
            <p class="text-sm opacity-80 mb-4 leading-relaxed">${c}</p>
            ${img ? `<img src="${img}" class="rounded-2xl w-full h-64 object-cover mb-4 border border-white/10 shadow-lg">` : ''}
            <div class="flex items-center gap-2 mt-4">
                <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-blue-500"></div>
                <p class="text-[10px] opacity-40 uppercase tracking-widest">${time} • Bởi Bạn</p>
            </div>
        </div>`;

    if (btnOpen) btnOpen.onclick = () => blogModal.classList.remove('hidden');
    if (btnClose) btnClose.onclick = () => blogModal.classList.add('hidden');

    if (btnPost) {
        btnPost.onclick = () => {
            const titleEl = document.getElementById('blog-title-input');
            const contentEl = document.getElementById('blog-content-input');
            
            // Check xem các ô nhập có tồn tại không để tránh lỗi trắng trang
            if (!titleEl || !contentEl) {
                console.error("Thiếu ID blog-title-input hoặc blog-content-input trong HTML!");
                return;
            }

            const tit = titleEl.value.trim();
            const con = contentEl.value.trim();
            const file = imageInput ? imageInput.files[0] : null; 
            
            if (tit && con) {
                let tempImgUrl = "";
                if (file) {
                    tempImgUrl = URL.createObjectURL(file); // Tạo link ảnh tạm
                }

                const now = new Date().toLocaleString('vi-VN');
                
                // Đẩy bài mới lên đầu
                blogContainer.insertAdjacentHTML('afterbegin', createBlogHTML(tit, con, now, tempImgUrl));
                
                // Reset Form
                blogModal.classList.add('hidden');
                titleEl.value = "";
                contentEl.value = "";
                if (imageInput) imageInput.value = "";
                
                console.log("Đăng bài thành công!");
            } else {
                alert("Mày phải nhập đủ Tiêu đề và Nội dung nhé!");
            }
        };
    }
});