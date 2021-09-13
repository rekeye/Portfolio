//this file creates an event listener handling smooth scrolling of anchors

export default (() =>
  document.querySelectorAll('a[href^="#"]').forEach((anchor) =>
    anchor.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(anchor.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    })
  ))();
