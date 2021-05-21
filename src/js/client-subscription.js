import imask from 'imask';

import hasClass from './utils/has-class';
import validateInputsCurrentTab from './utils/validate-inputs-current-tab';

let tabEls, firstStage, lastStage;

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
  tabEls = document.querySelectorAll('.next-tab');

  firstStage = document.querySelector('.stage:first-child');
  lastStage = document.querySelector('.stage:last-child');
}

function initTabNavigation() {
  tabEls.forEach((tabEl) => {
    tabEl.addEventListener('click', () => {
      const canPass = validateInputsCurrentTab();

      if (!canPass) return null;

      const nextTab = document.querySelector('.tab-pane.active + *');
      const currentTab = document.querySelector('.tab-pane.active');

      const nextStage = document.querySelector('.stage.current + *');
      const currentStage = document.querySelector('.stage.current');

      nextTab.classList.add('active');
      currentTab.classList.remove('active');

      nextStage && nextStage.classList.add('current');
      currentStage.classList.remove('current');
      currentStage.classList.add('active');

      updateVisibleStages();
    });
  });
}

function updateVisibleStages() {
  const sectionStagesEl = document.querySelector('#section-stages');
  const stagesArea = document.querySelector('.stages');
  let visibleStages = Array(...stagesArea.querySelectorAll('.stage.item-visible'));
  const firstNotVisible = stagesArea.querySelector('.stage:not(.item-visible):not(.active)');

  let allVisibleActive = 0;
  visibleStages.forEach((stage) => hasClass(stage, 'active') && allVisibleActive++);
  firstNotVisible &&
    allVisibleActive === 3 &&
    (() => {
      visibleStages[0].classList.remove('item-visible');

      firstNotVisible.classList.add('item-visible');
    })();

  visibleStages = Array(...stagesArea.querySelectorAll('.stage.item-visible'));
  const isFirstVisible = !!visibleStages.find((stage) => stage === firstStage);
  const isLastVisible = !!visibleStages.find((stage) => stage === lastStage);
  !isFirstVisible ? sectionStagesEl.classList.add('remember-left') : sectionStagesEl.classList.remove('remember-left');
  !isLastVisible ? sectionStagesEl.classList.add('remember-right') : sectionStagesEl.classList.remove('remember-right');
}

function initInputs() {
  initMask();
  initStateAndCities();
  initDependents();
}

function initMask() {
  const maskersInputs = [...document.querySelectorAll('input.mask')];

  maskersInputs.forEach((input) => imask(input, { mask: input.dataset.mask.split(',').map((mask) => ({ mask })) }));
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
    const placeholderEl = citySelectEl.querySelector('option:first-child').cloneNode(true);
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
  const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
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
  const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${initials}/municipios`);
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
        const maskersInputs = [...document.querySelectorAll('.tab-pane.active input.mask')];

        maskersInputs.forEach((input) =>
          imask(input, { mask: input.dataset.mask.split(',').map((mask) => ({ mask })) })
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

export default clientSubscription;
