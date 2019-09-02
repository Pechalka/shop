function scrollToSection(key) {
  var section = document.getElementById(key);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

window.onload = function(e){ 
  var menuItems = document.querySelectorAll('.menu1 a');
  menuItems.forEach(function(menu){
    menu.addEventListener('click', function(e) {
      e.preventDefault();

      var key = event.target.dataset.key;
      scrollToSection(key);
      
      history.pushState({}, null, event.target.href);
    });
  })

  var key = window.location.pathname.replace('/', '');
  scrollToSection(key);
}