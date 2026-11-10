/**
 * js/contact.js
 * Contact Form Validation, Feedback & WhatsApp Link Generator
 * SS Peter and Paul Catholic Church, Ugbolu
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('parishContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('senderName');
    const emailInput = document.getElementById('senderEmail');
    const phoneInput = document.getElementById('senderPhone');
    const categoryInput = document.getElementById('inquiryCategory');
    const messageInput = document.getElementById('senderMessage');

    // Reset previous errors
    form.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));

    if (!nameInput.value.trim()) {
      nameInput.classList.add('is-invalid');
      isValid = false;
    }

    if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
      emailInput.classList.add('is-invalid');
      isValid = false;
    }

    if (!phoneInput.value.trim()) {
      phoneInput.classList.add('is-invalid');
      isValid = false;
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageInput.classList.add('is-invalid');
      isValid = false;
    }

    if (!isValid) {
      if (window.showToast) window.showToast('Please check the highlighted fields.', 'error');
      return;
    }

    // Generate reference code
    const refCode = 'SSPPU-' + Math.floor(100000 + Math.random() * 900000);

    // Show success modal or confirmation card
    const formPanel = form.closest('.contact-form-panel');
    if (formPanel) {
      formPanel.innerHTML = `
        <div style="text-align:center; padding:2rem 1rem;">
          <div style="width:64px; height:64px; border-radius:50%; background:#DCFCE7; color:#166534; font-size:2rem; display:grid; place-items:center; margin:0 auto 1.25rem;">
            ✓
          </div>
          <h3 style="font-size:1.5rem; color:var(--burgundy-900); margin-bottom:0.5rem;">Enquiry Submitted</h3>
          <p style="font-size:0.95rem; color:var(--text-muted); margin-bottom:1.25rem;">
            Thank you, <strong>${nameInput.value.trim()}</strong>. Your message regarding <em>${categoryInput.value}</em> has been registered under reference code:
          </p>
          <div style="background:var(--cream-100); border:1px dashed var(--gold-500); padding:0.75rem; border-radius:var(--radius-sm); font-weight:800; font-family:monospace; font-size:1.15rem; color:var(--burgundy-800); margin-bottom:1.5rem;">
            ${refCode}
          </div>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:2rem;">
            (DEMO SYSTEM: In production, this notification is forwarded securely to the Parish Secretariat of SS Peter and Paul, Ugbolu, Catholic Diocese of Issele-Uku).
          </p>
          <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
            <a href="https://wa.me/2348000000000?text=${encodeURIComponent(`Hello SS Peter and Paul Catholic Church Ugbolu, I submitted enquiry Ref: ${refCode}`)}" target="_blank" rel="noopener noreferrer" class="btn btn-gold">
              💬 Continue on WhatsApp
            </a>
            <button class="btn btn-outline-burgundy" onclick="window.location.reload()">
              Submit Another Inquiry
            </button>
          </div>
        </div>
      `;
    }

    if (window.showToast) window.showToast('Enquiry received successfully!', 'success');
  });
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
