import imask from 'imask';

function adminSubscribers() {
  const bodyEl = document.querySelector('body');

  bodyEl.dataset.page === 'subscribers-admin' && (window.onload = init);
}

function init() {
  initMask();
}

function initMask() {
  const maskersInputs = [...document.querySelectorAll('input.mask')];

  maskersInputs.forEach((input) =>
    imask(input, {
      mask: input.dataset.mask.split(',').map((mask) => ({ mask })),
    })
  );
}

export default adminSubscribers;
