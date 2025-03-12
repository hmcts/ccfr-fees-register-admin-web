function styleActiveLink() {
  const navLinks = document.querySelectorAll('div.header-proposition ul.custom-header-ul a');
  navLinks.forEach((anchor) => {
    if (anchor.href === window.location.href || anchor.href.includes('draft') && window.location.href.includes('draft')) {
      anchor.style.color = '#1d8feb';
    }
    else
    {
      anchor.style.color = 'white';
    }
  });
}
