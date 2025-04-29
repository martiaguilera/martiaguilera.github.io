document.addEventListener('DOMContentLoaded', () => {
  // Check if the device is mobile
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    const mobileMessageDiv = document.createElement('div');
    mobileMessageDiv.id = 'mobile-message';
    mobileMessageDiv.style.position = 'fixed';
    mobileMessageDiv.style.top = '50%';
    mobileMessageDiv.style.left = '50%';
    mobileMessageDiv.style.transform = 'translate(-50%, -50%)';
    mobileMessageDiv.style.textAlign = 'center';
    mobileMessageDiv.style.backgroundColor = 'white'; 
    mobileMessageDiv.style.padding = '20px';
    mobileMessageDiv.style.border = '2px solid black'; 
    mobileMessageDiv.style.zIndex = '1000'; // To ensure it's on top
    mobileMessageDiv.innerHTML = '<h2>Esta página solo está disponible en ordenador</h2><p style="font-size: 50px;">💻</p>'; 
    document.body.appendChild(mobileMessageDiv);
  }

  const messages = [
    "console.log('Hola, soy Martí');",
    "console.log('Estudiante de 2º SMR especializado en desarrollo web');",
    "console.log('Bienvenido a mi portfolio');"
  ];

  let index = 0;
  const typingSpeed = 100;
  const terminalEffect = document.querySelector('.typing');

  function typeMessage(message, callback) {
    let charIndex = 0;
    terminalEffect.textContent = '';

    function typeChar() {
      if (charIndex < message.length) {
        terminalEffect.textContent += message.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, typingSpeed);
      } else {
        setTimeout(callback, 1500);
      }
    }
    typeChar();
  }

  function loopMessages() {
    typeMessage(messages[index], () => {
      index = (index + 1) % messages.length;
      loopMessages();
    });
  }

  loopMessages();
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
    });
  }
});

const emailElement = document.getElementById('email');
const copyStatus = document.getElementById('copy-status');

emailElement.addEventListener('click', () => {
  navigator.clipboard.writeText(emailElement.textContent).then(() => {
    copyStatus.textContent = '✅ copied';
    setTimeout(() => {
      copyStatus.textContent = '📋 copy';
    }, 2000);
  });
});

const aboutSection = document.querySelector('.about-me');
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

if (aboutSection) {
  observer.observe(aboutSection);
}
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

projectCards.forEach(card => {
  projectObserver.observe(card);
});
const experienceCards = document.querySelectorAll('.experience-cards .card');
const experienceObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

experienceCards.forEach(card => {
  experienceObserver.observe(card);
});
const certificationCards = document.querySelectorAll('.certification-card');
const certificationObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

certificationCards.forEach(card => {
  certificationObserver.observe(card);
});
