function styleActiveLink() {
  const navLinks = document.querySelectorAll('div.header-proposition ul.custom-header-ul a');
  navLinks.forEach((anchor) => {
    console.log(anchor);
    if (anchor.href === window.location.href) {
      anchor.style.color = '#1d8feb';
    } else {
      anchor.style.color = 'white';
    }
  });
}
