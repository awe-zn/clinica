const toggleClassEls = [...document.querySelectorAll('.toggle-class')];

toggleClassEls.forEach((el) => {
  el.addEventListener('click', ({ target: { dataset } }) => {
    document
      .querySelector(`${dataset.target}`)
      .classList.toggle(dataset.toggle);
  });
});
