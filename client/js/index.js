// Smooth scroll for "Get Started" button
document.addEventListener('DOMContentLoaded', () => {
  const getStartedBtn = document.querySelector('.btn-primary');
  if(getStartedBtn){
    getStartedBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const featuresSection = document.querySelector('#features');
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
