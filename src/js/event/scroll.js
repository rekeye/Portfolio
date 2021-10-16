//this file creates an event listener handling smooth scrolling of anchors

export default (() =>
  document.querySelectorAll('a[href^="#"]').forEach((anchor) =>
    anchor.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = anchor.getAttribute("href");
      const target = document.querySelector(targetId);

      const headerOffset = 120;
      const targetPosition = target.getBoundingClientRect().top;
      const offsetPosition = targetPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    })
  ))();
