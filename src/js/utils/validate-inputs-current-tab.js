export default function validateInputsCurrentTab() {
  const radio = validateInputsRadio();
  const text = validateInputsText();

  let isAllAnswered = false;

  radio & text && (isAllAnswered = true);

  return isAllAnswered;
}

function validateInputsRadio() {
  const currentPane = document.querySelector('.tab-pane.active');
  const notChecked = [...currentPane.querySelectorAll('input[type="radio"]:not(:checked)')];

  if (!notChecked) return true;

  let isAllAnswered = true;

  notChecked.forEach((el) => {
    const elementSelected = !!currentPane.querySelector(`input[name="${el.name}"]:checked`);

    !elementSelected && (isAllAnswered = false);
  });

  return isAllAnswered;
}

function validateInputsText() {
  let isAllAnswered = true;

  const currentTabPane = document.querySelector('.tab-pane.active');

  const secondaryCurrentTabPane = currentTabPane.querySelector('.tab-pane.active');

  if (secondaryCurrentTabPane) {
    !!secondaryCurrentTabPane.querySelector('input:invalid, select:invalid') && (isAllAnswered = false);
  }

  !secondaryCurrentTabPane &&
    !!currentTabPane.querySelector('input:invalid, select:invalid') &&
    (isAllAnswered = false);

  return isAllAnswered;
}
