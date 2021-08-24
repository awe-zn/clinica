import bootstrap from 'bootstrap';
import feather from 'feather-icons';
import './utils/toggle-class';
import noUiSlider from 'nouislider';

const slidersEl = [...document.querySelectorAll('.slider')];
slidersEl.forEach((sliderEl) => {
  noUiSlider.create(sliderEl, {
    range: {
      min: 1300,
      max: 3250,
    },

    step: 150,

    // Handles start at ...
    start: [1450, 2050, 2350, 3000],

    // ... must be at least 300 apart
    margin: 300,

    // ... but no more than 600
    limit: 600,

    // Display colored bars between handles
    connect: true,

    // Put '0' at the bottom of the slider
    direction: 'rtl',
    orientation: 'vertical',

    // Move handle on tap, bars are draggable
    behaviour: 'tap-drag',
    tooltips: true,
    format: wNumb({
      decimals: 0,
    }),

    // Show a scale with the slider
    pips: {
      mode: 'steps',
      stepped: true,
      density: 4,
    },
  });
});

feather.replace();

import clientSubscription from './client-subscription';
import clientDependents from './client-dependents';
import adminDashboard from './admin-dashboard';
import adminSubscribers from './admin-subscribers';
import adminClientSingle from './admin-client-single';
import planCreate from './plan-create';
import planEdit from './plan-edit';
import contractCreate from './contract-create';
import contractEdit from './contract-edit';

clientSubscription();
clientDependents();
adminDashboard();
adminSubscribers();
adminClientSingle();
planCreate();
planEdit();
contractCreate();
contractEdit();
