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

  console.log(isAllAnswered);

  return isAllAnswered;
}

function validateInputsText() {
  let isAllAnswered = true;

  !!document.querySelector('.tab-pane.active input[type="text"]:invalid') && (isAllAnswered = false);

  return isAllAnswered;
}
