document.getElementById('register-btn-header').addEventListener('click', (event) => {
    event.preventDefault(); // Mencegah reload halaman
    console.log('Register button clicked');
    document.getElementById('auth-container').style.display = 'block';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
});

document.getElementById('register-btn').addEventListener('click', async () => {
    // Ambil nilai dari input form
    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();

    // Log data untuk memastikan nilai input benar
    console.log('Data to send:', { username, email, password });

    // Validasi input di sisi frontend
    if (!username || !email || !password) {
        alert('Please fill all fields');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email }),
        });

        if (response.ok) {
            const responseData = await response.json();
            alert('Registration successful!');
            console.log('Response from server:', responseData);
            document.getElementById('auth-container').style.display = 'none';
        } else {
            const errorData = await response.json();
            console.error('Error response from server:', errorData);
            alert(`Registration failed: ${errorData.error || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed: Could not connect to the server');
    }
});

document.getElementById('close-auth').addEventListener('click', () => {
    const authContainer = document.getElementById('auth-container');
    authContainer.style.animation = 'popupFadeOut 0.5s forwards';
    setTimeout(() => {
        authContainer.style.display = 'none';
        authContainer.style.animation = ''; // Reset animasi
    }, 500); // Tunggu hingga animasi selesai
});