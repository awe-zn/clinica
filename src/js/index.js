import bootstrap from 'bootstrap';
import feather from 'feather-icons';
import './utils/toggle-class';

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
import benefitCreate from './benefit-create';

clientSubscription();
clientDependents();
adminDashboard();
adminSubscribers();
adminClientSingle();
planCreate();
planEdit();
contractCreate();
contractEdit();
benefitCreate();
