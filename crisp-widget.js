// Fungsi untuk memuat widget Crisp
const loadCrisp = () => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "7a4473ff-d349-4a06-8755-da7f305faef1"; // Ganti dengan Website ID Anda
    (function () {
        const d = document;
        const s = d.createElement("script");
        s.src = "https://client.crisp.chat/l.js";
        s.async = 1;
        d.getElementsByTagName("head")[0].appendChild(s);
    })();
};

// Pengecekan login untuk memuat Crisp
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    if (token) {
        console.log('User is logged in. Loading Crisp widget...');
        loadCrisp(); // Muat Crisp jika pengguna login
    } else {
        console.log('User is not logged in. Crisp widget will not load.');
    }
});
