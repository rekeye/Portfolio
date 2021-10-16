//this file sticks the navbar to the top of the page on scroll below offset value

const stickyNav = () => {
  const header = document.querySelector(".header");
  const offset = header.offsetTop;

  const handleScroll = () => {
    if (window.scrollY > offset) {
      header.classList.add("header--sticky");
    } else {
      header.classList.remove("header--sticky");
    }
  };

  window.onscroll = () => handleScroll();
};

export default stickyNav;
