// ===== SMOOTH SCROLL NAVIGATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll para los links del navbar
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});

// ===== INTERSECTION OBSERVER PARA ANIMACIONES =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar todos los elementos con clase fade-up
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-up');
  fadeElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });
});

// ===== STICKY SECTION TITLES =====
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const allTitles = document.querySelectorAll('.section-title-sticky');
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const windowCenter = scrollY + windowHeight / 2;
    
    let closestTitle = null;
    let closestDistance = Infinity;
    
    // Encontrar la sección más cercana al centro de la pantalla
    allTitles.forEach(title => {
      const section = title.closest('.section-container');
      if (!section) return;
      
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionCenter = sectionTop + (sectionBottom - sectionTop) / 2;
      
      const distanceToCenter = Math.abs(windowCenter - sectionCenter);
      
      // Si esta sección está visible y es la más cercana
      if (sectionBottom > scrollY && sectionTop < scrollY + windowHeight) {
        if (distanceToCenter < closestDistance) {
          closestDistance = distanceToCenter;
          closestTitle = title;
        }
      }
    });
    
    // Apagar todos los títulos excepto el más cercano
    allTitles.forEach(title => {
      if (title === closestTitle) {
        title.style.opacity = '1';
      } else {
        title.style.opacity = '0';
      }
    });
  }, 10);
});

// ===== PARALLAX EFFECT (Optional) =====
let parallaxTimeout;
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
  }

  // Parallax effect for section titles
  clearTimeout(parallaxTimeout);
  parallaxTimeout = setTimeout(() => {
    const sectionTitles = document.querySelectorAll('.section-hero-title');
    sectionTitles.forEach(title => {
      const rect = title.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const titleOffset = title.offsetTop;
      const distance = titleOffset - scrolled - window.innerHeight / 2;
      
      // Parallax movement
      title.style.transform = `translateY(${distance * 0.1}px)`;
      
      // Update gradient opacity based on scroll
      const beforeElement = title.querySelector('::before') || title;
      const opacity = Math.max(0, Math.min(1, 1 - (distance / window.innerHeight)));
      if (title.style.setProperty) {
        title.style.setProperty('--gradient-opacity', opacity);
      }
    });
  }, 10);
}, { passive: true });

// ===== NAVBAR ACTIVE STATE =====
window.addEventListener('scroll', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('[id^="hero"], [id^="work"], [id^="services"], [id^="experience"], [id^="about"], [id^="contact"]');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 150) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === currentSection) {
      link.classList.add('active');
    }
  });
});

// ===== COPY EMAIL TO CLIPBOARD =====
document.addEventListener('DOMContentLoaded', () => {
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  
  emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const email = link.getAttribute('href').replace('mailto:', '');
      navigator.clipboard.writeText(email).then(() => {
        const originalText = link.innerHTML;
        link.innerHTML = '📧 Copied!';
        setTimeout(() => {
          link.innerHTML = originalText;
        }, 2000);
      });
    });
  });
});
