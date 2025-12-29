'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const backToTop = document.getElementById('backToTop');
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const messageEl = document.getElementById('message');
  const charCounter = document.getElementById('charCounter');
  const submitBtn = document.getElementById('submitBtn');
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const phoneEl = document.getElementById('phone');
  const subjectEl = document.getElementById('subject');
  const inquiryEl = document.getElementById('inquiry');
  const consentEl = document.getElementById('consent');
  const honeypot = document.getElementById('company');
  const preferredRadios = document.querySelectorAll('input[name="preferred"]');

  const FORM_ENDPOINT = ''; 
  const setStatus = (type, text) => {
    if (!status) return;
    const cls = type === 'success' ? 'alert-success' : 'alert-error';
    status.innerHTML = `<div class="alert ${cls}">${text}</div>`;
  };

  const clearStatus = () => {
    if (status) status.innerHTML = '';
  };

  const setLoading = (isLoading) => {
    if (!submitBtn) return;
    submitBtn.classList.toggle('loading', isLoading);
    submitBtn.disabled = isLoading;
    form?.setAttribute('aria-busy', String(isLoading));
  };

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  function applyTheme(mode) {
    root.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
    const icon = themeToggle?.querySelector('i');
    if (icon) icon.className = mode === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', mode === 'dark' ? '#0b1220' : '#4f46e5');
  }


  const toggleBackToTop = () => {
    if (!backToTop) return;
    if (window.scrollY > 300) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  };
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop);
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  if (messageEl && charCounter) {
    const maxLen = messageEl.getAttribute('maxlength') ? parseInt(messageEl.getAttribute('maxlength'), 10) : 500;
    const updateCounter = () => {
      charCounter.textContent = `${messageEl.value.length} / ${maxLen}`;
    };
    messageEl.addEventListener('input', updateCounter);
    updateCounter();
  }

  try {
    const savedName = localStorage.getItem('contact_name');
    const savedEmail = localStorage.getItem('contact_email');
    if (savedName && nameEl) nameEl.value = savedName;
    if (savedEmail && emailEl) emailEl.value = savedEmail;

    nameEl?.addEventListener('change', () => localStorage.setItem('contact_name', nameEl.value.trim()));
    emailEl?.addEventListener('change', () => localStorage.setItem('contact_email', emailEl.value.trim()));
  } catch {
  }

  const updatePhoneRequirement = () => {
    const preferred = [...preferredRadios].find(r => r.checked)?.value || 'email';
    if (!phoneEl) return;
    if (preferred === 'phone') {
      phoneEl.required = true;
      phoneEl.setAttribute('aria-required', 'true');
    } else {
      phoneEl.required = false;
      phoneEl.removeAttribute('aria-required');
    }
  };
  preferredRadios.forEach(radio => radio.addEventListener('change', updatePhoneRequirement));
  updatePhoneRequirement();

  inquiryEl?.addEventListener('change', () => {
    if (!subjectEl) return;
    const map = {
      support: 'Issue with my account or product',
      sales: 'Pricing, quote, or purchase inquiry',
      partnership: 'Let’s collaborate',
      feedback: 'Share product feedback',
      other: 'How can we help?'
    };
    subjectEl.placeholder = map[inquiryEl.value] || 'How can we help?';
  });

  form?.addEventListener('input', clearStatus);
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearStatus();

    if (honeypot && honeypot.value.trim() !== '') {
      setStatus('success', 'Thanks! Your message has been received.');
      form.reset();
      messageEl && (messageEl.value = '');
      if (charCounter) charCounter.textContent = '0 / 500';
      return;
    }

    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid && firstInvalid.focus) firstInvalid.focus();
      form.reportValidity?.();
      setStatus('error', 'Please fix the highlighted fields and try again.');
      return;
    }

    const data = formToJSON(new FormData(form));

    try {
      setLoading(true);

      if (FORM_ENDPOINT) {
        const resp = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!resp.ok) {
          const text = await safeText(resp);
          throw new Error(text || `Request failed (${resp.status})`);
        }
      } else {
        await sleep(1000);
      }

      setStatus('success', 'Thank you! Your message has been sent. We’ll get back to you soon.');
      const nameVal = nameEl?.value || '';
      const emailVal = emailEl?.value || '';
      form.reset();
      if (nameEl) nameEl.value = nameVal;
      if (emailEl) emailEl.value = emailVal;
      updatePhoneRequirement();
      if (charCounter) charCounter.textContent = '0 / 500';
    } catch (err) {
      console.error(err);
      setStatus('error', 'Sorry, something went wrong while sending your message. Please try again.');
    } finally {
      setLoading(false);
    }
  });

  function formToJSON(formData) {
    const obj = {};
    for (const [key, value] of formData.entries()) {
      if (key === 'company') continue;
      obj[key] = value;
    }
    obj.timestamp = new Date().toISOString();
    obj.userAgent = navigator.userAgent;
    return obj;
  }

  async function safeText(resp) {
    try {
      return await resp.text();
    } catch {
      return '';
    }
  }
});