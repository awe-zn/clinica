export default function validateInputsCurrentTab() {
  removeFeedback();

  const radio = validateInputsRadio();
  const text = validateInputsText();

  let isAllAnswered = false;

  radio & text && (isAllAnswered = true);

  !!isAllAnswered && removeFeedback();

  return isAllAnswered;
}

function validateInputsRadio() {
  const currentPane = document.querySelector('.tab-pane.active');
  const notChecked = [
    ...currentPane.querySelectorAll('input[type="radio"]:not(:checked)'),
  ];

  if (!notChecked) return true;

  let isAllAnswered = true;

  notChecked.forEach((el) => {
    const elementSelected = !!currentPane.querySelector(
      `input[name="${el.name}"]:checked`
    );

    !elementSelected && (isAllAnswered = false);
  });

  return isAllAnswered;
}

function validateInputsText() {
  let isAllAnswered = true;
  let inputs = [];

  const currentTabPane = document.querySelector('.tab-pane.active');

  const secondaryCurrentTabPane =
    currentTabPane.querySelector('.tab-pane.active');

  if (secondaryCurrentTabPane) {
    const newInputs = [
      ...secondaryCurrentTabPane.querySelectorAll(
        'input:invalid, select:invalid'
      ),
    ];
    inputs.push(...newInputs);

    !!newInputs.length && (isAllAnswered = false);
  }

  if (!secondaryCurrentTabPane) {
    const newInputs = [
      ...currentTabPane.querySelectorAll('input:invalid, select:invalid'),
    ];
    inputs.push(...newInputs);

    !!newInputs.length && (isAllAnswered = false);
  }

  inputs.forEach((input) => {
    currentTabPane
      .querySelector(`.input-feedback[data-target="#${input.id}"]`)
      ?.classList.add('show');

    console.log(input);
  });

  return isAllAnswered;
}

function removeFeedback() {
  [...document.querySelectorAll('.input-feedback.show')].forEach((input) =>
    input.classList.remove('show')
  );
}
