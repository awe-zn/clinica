import hasClass from './utils/has-class';

let tabEls, firstStage, lastStage;

const clientSubscription = () => {
  const bodyEl = document.querySelector('body');

  bodyEl.dataset.page === 'client-subscription' && (window.onload = init);
};

function init() {
  initValues();
  initTabNavigation();
}

function initValues() {
  tabEls = document.querySelectorAll('.next-tab');

  firstStage = document.querySelector('.stage:first-child');
  lastStage = document.querySelector('.stage:last-child');
}

function initTabNavigation() {
  tabEls.forEach((tabEl) => {
    tabEl.addEventListener('click', () => {
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

export default clientSubscription;
