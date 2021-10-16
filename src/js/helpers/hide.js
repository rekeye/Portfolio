const hide = (elArray) =>
  elArray.forEach((el) => {
    if (el.nodeName === "HTML") return;
    el.classList.add("hidden");
  });

export default hide;
