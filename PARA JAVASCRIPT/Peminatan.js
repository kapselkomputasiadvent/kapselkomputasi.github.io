async function loadData() {
    const response = await fetch('Peminatan.txt'); // Load the data file
    const textData = await response.text();
    const rows = textData.trim().split('\n');

    const specializations = [];
    const studentCounts = [];

    rows.forEach(row => {
        const columns = row.split('\t');
        const match = columns[4]?.trim().match(/^(.+?)\s+(\d+)$/);

        if (match) {
            const specialization = match[1].trim();
            const studentCount = parseInt(match[2].trim(), 10);

            // 🔥 FILTER: Check the page context
            if (window.location.pathname.includes('aktuaria.html') && specialization.toLowerCase().includes('aktuaria')) {
                // Filter for "Aktuaria"
                specializations.push(specialization);
                studentCounts.push(studentCount);
            } 
            else if (window.location.pathname.includes('optimasi.html') && specialization.toLowerCase().includes('optimasi')) {
                // Filter for "Optimasi"
                specializations.push(specialization);
                studentCounts.push(studentCount);
            } 
            else if (window.location.pathname.includes('matematika_murni.html') && specialization.toLowerCase().includes('matematika murni')) {
                // Filter for "Matematika Murni"
                specializations.push(specialization);
                studentCounts.push(studentCount);
            } 
            else if (window.location.pathname.includes('analitika_data.html') && specialization.toLowerCase().includes('analitika data')) {
                // Filter for "Analitika Data"
                specializations.push(specialization);
                studentCounts.push(studentCount);
            } 
            else if (!window.location.pathname.includes('aktuaria.html') &&
                     !window.location.pathname.includes('optimasi.html') &&
                     !window.location.pathname.includes('matematika_murni.html') &&
                     !window.location.pathname.includes('analitika_data.html')) {
                // On other pages, show all data
                specializations.push(specialization);
                studentCounts.push(studentCount);
            }
        }
    });

    return { specializations, studentCounts };
}

async function createChart() {
    const { specializations, studentCounts } = await loadData();
    const ctx = document.getElementById('peminatanChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: specializations, // Specialization names
            datasets: [{
                label: 'Number of Students',
                data: studentCounts, // Corresponding student counts
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        color: '#ffffff', 
                        font: { size: 12 }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#ffffff', 
                        font: { size: 12 }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true, 
                    labels: { color: '#ffffff' }
                },
                tooltip: { enabled: true }
            }
        }
    });
}

createChart();





// Back to Top Button Logic
const backToTopBtn = document.getElementById('backToTopBtn');

// Show button when user scrolls down 100px from the top
window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
};



// Scroll to the top when the button is clicked
backToTopBtn.onclick = function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

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