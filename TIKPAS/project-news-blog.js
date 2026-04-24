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