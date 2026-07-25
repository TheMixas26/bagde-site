document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');
  if(!toggle || !links || !overlay) return;

  function closeMenu(){
    links.classList.remove('open');
    overlay.classList.remove('open');
    toggle.classList.remove('open');
  }
  function toggleMenu(){
    links.classList.toggle('open');
    overlay.classList.toggle('open');
    toggle.classList.toggle('open');
  }

  toggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);
  links.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', closeMenu);
  });
});
