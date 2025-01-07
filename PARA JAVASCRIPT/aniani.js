let isScrolling;

// Fungsi untuk memuat ulang halaman jika scroll mencapai bagian atas
window.addEventListener('scroll', function () {
    clearTimeout(isScrolling);

    if (window.scrollY === 0) {
        isScrolling = setTimeout(function () {
            window.location.reload();
        }, 100);
    }
});

const backToTopBtn = document.getElementById('backToTopBtn');

// Menampilkan tombol kembali ke atas setelah scroll lebih dari 100px
window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
};

// Menggerakkan scroll ke atas saat tombol "Back To Top" diklik
backToTopBtn.onclick = function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Fungsi untuk memeriksa apakah elemen berada dalam tampilan (viewport)
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");
const message = document.getElementById("message");

// Menutup popup dengan animasi
closeBtn.addEventListener("click", function () {
    popup.classList.remove("show"); 
    popup.classList.add("hide");

    // Sembunyikan popup sepenuhnya setelah animasi selesai (0.5 detik)
    setTimeout(() => {
        popup.style.display = "none";
        popup.classList.remove("hide");
    }, 500);
});

// Countdown muncul saat halaman dimuat
window.onload = function () {
    const examStartDate = new Date("2025-01-06T07:00:00").getTime(); 
    const examEndDate = new Date("2025-01-21T23:59:59").getTime();  
    const now = new Date().getTime();
    const fourDaysAfterExam = examEndDate + 4 * 24 * 60 * 60 * 1000; 
    let messageText = "";

    if (now < examStartDate) {
        const daysLeft = Math.ceil((examStartDate - now) / (1000 * 60 * 60 * 24));
        messageText = `Tersisa <span id="days">${daysLeft}</span> hari lagi!`;
    } 
    else if (now >= examStartDate && now <= examEndDate) {
        const dayOfExam = Math.ceil((now - examStartDate) / (1000 * 60 * 60 * 24)) + 1;
        messageText = `Ujian hari ke-<span id="days">${dayOfExam}</span>`;
    } 
    else if (now > examEndDate && now <= fourDaysAfterExam) {
        messageText = "Ujian telah usai!";
    } 
    else {
        return;
    }

    // Tampilkan popup
    popup.style.display = "flex";
    message.innerHTML = messageText;
    setTimeout(() => popup.classList.add("show"), 50); // Tambahkan animasi muncul
};




// Efek untuk menampilkan kata-kata pada halaman
const words = ["Lulusan Sarjana Matematika Kerjanya Apa Sih?", "Data Analyst", "Aktuaris", "Pengajar", "Ahli Matematika"];
let index = 0;
const textContainer = document.getElementById('textContainer');
let isTextRunning = false;

function showWord() {
    if (!isTextRunning) return;

    textContainer.classList.remove('show');
    textContainer.classList.add('hide');

    setTimeout(() => {
        textContainer.innerHTML = words[index];
        textContainer.classList.remove('hide');
        textContainer.classList.add('show');

        index = (index + 1) % words.length;
    }, 600);

    setTimeout(showWord, 3000);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isTextRunning) {
            isTextRunning = true;
            showWord();
        }
    });
});

const target = document.getElementById('text-section');
observer.observe(target);

// Menampilkan elemen yang masuk viewport saat scroll
document.addEventListener("scroll", function () {
    const fadeInElements = document.querySelectorAll(".section-4 .fade-in-up");
    fadeInElements.forEach((el) => {
        if (isInViewport(el)) {
            el.classList.add("show");
        }
    });
    
    const lineLeft = document.querySelector('.line-left');
    const lineRight = document.querySelector('.line-right');
    const lineContainer = document.querySelector('.line-container');

    if (isInViewport(lineContainer)) {
        lineLeft.classList.add('animate-left');
        lineRight.classList.add('animate-right');
    }
});

///INI DONASI
/// Ambil elemen tombol dan box donasi
const donationButton = document.querySelector(".donation-button");
const donationBox = document.getElementById("donation-box");

// Fungsi untuk toggle (buka/tutup) box donasi
function toggleDonationBox() {
    if (donationBox.style.right === "0px") {
        donationBox.style.right = "-100%"; 
    } else {
        donationBox.style.right = "0px";
    }
}

// Event listener untuk tombol "DONATE NOW"
donationButton.addEventListener("click", toggleDonationBox);


//Pop Up Feedback
// Open Feedback Form
function openFeedback() {
    const feedbackPopup = document.querySelector('.pop-up-feedback');
    feedbackPopup.style.display = 'flex'; // Show the pop-up
    const feedbackForm = document.querySelector('#FeedbackForm');
    feedbackForm.style.width = '500px'; // Enforce consistent size
  }
  
  // Close Feedback Form
  function closeFeedback() {
    const feedbackPopup = document.querySelector('.pop-up-feedback');
    feedbackPopup.style.display = 'none'; // Hide the pop-up
    
    // Reset the form and hide Thank You message when closing the pop-up
    const feedbackForm = document.querySelector('#FeedbackForm');
    feedbackForm.style = '';
    feedbackForm.reset();
    
    const thankYouMessage = document.querySelector('#thankYouMessage');
    thankYouMessage.style.display = 'none';
    
    // Reset margins and other styles if needed
    const inputs = feedbackForm.querySelectorAll('.contact-inputs');
    inputs.forEach(input => {
        input.style.marginBottom = '0px'; 
    });
  }
  
  // Handle form submission and show the Thank You message
  async function handleFeedbackSubmit(event) {
    event.preventDefault();
    
    // Get the form data
    const form = event.target;
    const formData = new FormData(form);
    
    // Send the data to Google Apps Script using Fetch API (AJAX)
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbw3ckK30W_CDyQ4b_yIyuhNe672QNAcPEGt3ZGpYZG29xLkt-67OZovGZ8W5m1IDSCp/exec', {
        method: 'POST',
        body: formData
      });
      
      // If the form is successfully submitted
      if (response.ok) {
        const feedbackForm = document.querySelector('#FeedbackForm');
        const thankYouMessage = document.querySelector('#thankYouMessage');
  
        feedbackForm.style.display = 'none'; 
        thankYouMessage.style.display = 'block'; 
  
        // Optionally, add a delay before closing the popup or resetting the form
        setTimeout(() => {
          closeFeedback(); 
        }, 5000);
      } else {
        alert('There was a problem with your feedback submission. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error. Please try again.');
    }
  
    return false;
  }
  
  // Add the submit event listener
  document.querySelector('#FeedbackForm').addEventListener('submit', handleFeedbackSubmit);