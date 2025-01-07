// Navaigation Bar
var navLinks = document.getElementById("navLinks");
function showMenu(){
    navLinks.style.right = "0";
}
function hideMenu(){
    navLinks.style.right = "-200px";
}

// Program Kerja
// Select relevant HTML elements
const filterButtons = document.querySelectorAll("#filter-buttons button");
const filterableCards = document.querySelectorAll("#filterable-cards .card");

// Function to filter cards based on filter buttons
const filterCards = (e) => {
    document.querySelector("#filter-buttons .active").classList.remove("active");
    e.target.classList.add("active");

    filterableCards.forEach(card => {
        // show the card if it matches the clicked filter or show all cards if "all" filter is clicked
        if(card.dataset.name === e.target.dataset.filter || e.target.dataset.filter === "all") {
            return card.classList.replace("hide", "show");
        }
        card.classList.add("hide");
    });
}

filterButtons.forEach(button => button.addEventListener("click", filterCards));


//CHART
const apiUrl = 'https://script.google.com/macros/s/AKfycbxCS-Wed_HwH-_MMC8n4Pm0e5TnsKuNb6REXP124XqTSjkonIEfKu5B2uGtZJArFk19/exec'; // Ganti dengan URL API Anda

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Ambil data untuk bidang
        const bidang = data.map(row => row.JABATAN);
        const bidangFrequencies = calculateFrequencies(bidang);

        // Ambil data untuk angkatan
        const angkatan = data.map(row => row.ANGKATAN);
        const angkatanFrequencies = calculateFrequencies(angkatan);

        // Siapkan data untuk grafik
        createBarChart(Object.keys(bidangFrequencies), Object.values(bidangFrequencies));
        createPieChart(Object.keys(angkatanFrequencies), Object.values(angkatanFrequencies));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function calculateFrequencies(array) {
    const frequency = {};
    array.forEach(item => {
        frequency[item] = (frequency[item] || 0) + 1;
    });
    return frequency;
}

function createBarChart(labels, dataset) {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Jumlah Mahasiswa per Bidang',
                data: dataset,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createPieChart(labels, dataset) {
    const ctx = document.getElementById('pieChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: dataset,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
}

fetchData();

//Testimonials
var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: '.swiper-pagination'
    }
})


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
    feedbackForm.reset(); // Reset the form fields
    
    const thankYouMessage = document.querySelector('#thankYouMessage');
    thankYouMessage.style.display = 'none'; // Hide the Thank You message
    
    // Reset margins and other styles if needed
    const inputs = feedbackForm.querySelectorAll('.contact-inputs');
    inputs.forEach(input => {
        input.style.marginBottom = '0px'; // Ensure margin is restored
    });
  }
  
  // Handle form submission and show the Thank You message
  async function handleFeedbackSubmit(event) {
    event.preventDefault(); // Prevent page reload on form submit
    
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
  
        feedbackForm.style.display = 'none'; // Hide the feedback form
        thankYouMessage.style.display = 'block'; // Show the Thank You message
  
        // Optionally, add a delay before closing the popup or resetting the form
        setTimeout(() => {
          closeFeedback(); // Close the pop-up after a delay (e.g., 5 seconds)
        }, 5000);
      } else {
        alert('There was a problem with your feedback submission. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error. Please try again.');
    }
  
    return false; // Prevent default form submission
  }
  
  // Add the submit event listener
  document.querySelector('#FeedbackForm').addEventListener('submit', handleFeedbackSubmit);


///INI DONASI
/// Ambil elemen tombol dan box donasi
const donationButton = document.querySelector(".donation-button");
const donationBox = document.getElementById("donation-box");

// Fungsi untuk toggle (buka/tutup) box donasi
function toggleDonationBox() {
    if (donationBox.style.right === "0px") {
        donationBox.style.right = "-100%"; // Sembunyikan popup ke kanan
    } else {
        donationBox.style.right = "0px"; // Tampilkan popup dari kanan ke kiri
    }
}

// Event listener untuk tombol "DONATE NOW"
donationButton.addEventListener("click", toggleDonationBox);
///SAMPE DONASI SINI


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