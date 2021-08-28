import imask from 'imask';

import hasClass from './utils/has-class';
import validateInputsCurrentTab from './utils/validate-inputs-current-tab';

let nextTabEls, prevTabEls, firstStage, lastStage;

function clientSubscription() {
  const bodyEl = document.querySelector('body');

  bodyEl.dataset.page === 'client-subscription' && (window.onload = init);
}

function init() {
  initValues();
  initTabNavigation();
  initInputs();
}

function initValues() {
  nextTabEls = document.querySelectorAll('.next-tab');
  prevTabEls = document.querySelectorAll('.prev-tab');

  firstStage = document.querySelector('.stage:first-child');
  lastStage = document.querySelector('.stage:last-child');
}

function initTabNavigation() {
  nextTabEls.forEach((nextTabEl) => {
    nextTabEl.addEventListener('click', () => {
      const canPass = validateInputsCurrentTab();

      if (!canPass) return null;

      const nextTab = document.querySelector(
        '.tab-stages > .tab-pane.active'
      ).nextElementSibling;
      const currentTab = document.querySelector(
        '.tab-stages > .tab-pane.active'
      );

      const nextStage =
        document.querySelector('.stage.current').nextElementSibling;
      const currentStage = document.querySelector('.stage.current');

      nextTab.classList.add('active');
      currentTab.classList.remove('active');

      nextStage && nextStage.classList.add('current');
      currentStage.classList.remove('current');
      currentStage.classList.add('active');

      updateVisibleStages();
    });
  });
  prevTabEls.forEach((prevTabEl) => {
    prevTabEl.addEventListener('click', () => {
      const prevTab = document.querySelector(
        '.tab-stages > .tab-pane.active'
      ).previousElementSibling;
      if (!prevTab) return false;

      const currentTab = document.querySelector(
        '.tab-stages > .tab-pane.active'
      );

      const prevStage =
        document.querySelector('.stage.current').previousElementSibling;
      const currentStage = document.querySelector('.stage.current');

      currentTab.classList.remove('active');
      prevTab.classList.add('active');

      currentStage.classList.remove('current');
      prevStage.classList.remove('active');
      prevStage.classList.add('current');

      updateVisibleStages();
    });
  });
}

function updateVisibleStages() {
  const sectionStagesEl = document.querySelector('#section-stages');
  const stagesArea = document.querySelector('.stages');
  const stages = [...stagesArea.querySelectorAll('.stage')];

  const currentStage = stagesArea.querySelector('.stage.current');

  if (!currentStage) return;

  stages.forEach((stageEl) => {
    stageEl.classList.remove('item-visible');
  });

  const previousStage =
    currentStage.previousElementSibling ||
    stagesArea.querySelector('.stage:nth-child(2)');
  let previousPreviousStage =
    previousStage.previousElementSibling ||
    stagesArea.querySelector('.stage:nth-child(3)');
  if (previousPreviousStage === currentStage)
    previousPreviousStage = stagesArea.querySelector('.stage:nth-child(3)');

  const toBeVisibleStages = [
    currentStage,
    previousStage,
    previousPreviousStage,
  ];
  toBeVisibleStages.forEach((stageEl) => {
    stageEl && stageEl.classList.add('item-visible');
  });

  let visibleStages = Array(
    ...stagesArea.querySelectorAll('.stage.item-visible')
  );
  const firstNotVisible = stagesArea.querySelector(
    '.stage:not(.item-visible):not(.active)'
  );

  let allVisibleActive = 0;
  visibleStages.forEach(
    (stage) => hasClass(stage, 'active') && allVisibleActive++
  );

  visibleStages = Array(...stagesArea.querySelectorAll('.stage.item-visible'));
  const isFirstVisible = !!visibleStages.find((stage) => stage === firstStage);
  const isLastVisible = !!visibleStages.find((stage) => stage === lastStage);
  !isFirstVisible
    ? sectionStagesEl.classList.add('remember-left')
    : sectionStagesEl.classList.remove('remember-left');
  !isLastVisible
    ? sectionStagesEl.classList.add('remember-right')
    : sectionStagesEl.classList.remove('remember-right');

  window.scrollTo({
    top: 0,
  });
}

function initInputs() {
  initMask();
  initStateAndCities();
  initDependents();
  initFiles();
}

function initMask() {
  const maskersInputs = [...document.querySelectorAll('input.mask')];

  maskersInputs.forEach((input) =>
    imask(input, {
      mask: input.dataset.mask.split(',').map((mask) => ({ mask })),
    })
  );
}

async function initStateAndCities() {
  const stateSelectEl = document.querySelector('#titular_state');
  const states = await fetchStates();

  states.forEach((state) => {
    const el = document.createElement('option');
    el.value = state.id;
    el.textContent = state.nome;

    stateSelectEl.appendChild(el);
  });

  const citySelectEl = document.querySelector('#titular_city');
  stateSelectEl.addEventListener('change', async ({ target: { value } }) => {
    const placeholderEl = citySelectEl
      .querySelector('option:first-child')
      .cloneNode(true);
    citySelectEl.innerHTML = '';
    citySelectEl.appendChild(placeholderEl);
    const cities = await fetchCities(value);

    cities.forEach((city) => {
      const el = document.createElement('option');
      el.value = city.id;
      el.textContent = city.nome;

      citySelectEl.appendChild(el);
    });
  });
}

async function fetchStates() {
  const res = await fetch(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
  );
  let data = await res.json();

  data = data.sort((a, b) => {
    if (a.sigla > b.sigla) {
      return 1;
    }
    if (a.sigla < b.sigla) {
      return -1;
    }
    return 0;
  });

  return data;
}

async function fetchCities(initials) {
  const res = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${initials}/municipios`
  );
  let data = await res.json();

  data = data.sort((a, b) => {
    if (a.nome > b.nome) {
      return 1;
    }
    if (a.nome < b.nome) {
      return -1;
    }
    return 0;
  });

  return data;
}

function initDependents() {
  new Vue({
    el: '#dependents-area',
    data: {
      dependents: 0,
    },
    methods: {
      handleMasks: function () {
        const maskersInputs = [
          ...document.querySelectorAll('.tab-pane.active input.mask'),
        ];

        maskersInputs.forEach((input) =>
          imask(input, {
            mask: input.dataset.mask.split(',').map((mask) => ({ mask })),
          })
        );
      },
    },
    updated() {
      this.$nextTick(() => {
        this.handleMasks();
      });
    },
    mounted() {
      this.handleMasks();
    },
  });
}

function initFiles() {
  const filesLabelEls = [...document.querySelectorAll('.input-file')];
  filesLabelEls.forEach((el) => {
    el.querySelector(`input[type=file]#${el.htmlFor}`).addEventListener(
      'input',
      ({ target }) => {
        const valuesEl = el.querySelector('.input-values');
        valuesEl.innerHTML = '';

        const files = target.files;

        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          const nameArchEl = document.createElement('span');
          nameArchEl.textContent = file.name;

          valuesEl.appendChild(nameArchEl);
        }
      }
    );
  });
}

export default clientSubscription;
