import bootstrap from 'bootstrap';
import feather from 'feather-icons';
import './utils/toggle-class';

feather.replace();

import clientSubscription from './client-subscription';
import clientDependents from './client-dependents';
import adminDashboard from './admin-dashboard';
import adminSubscribers from './admin-subscribers';
import adminClientSingle from './admin-client-single';

clientSubscription();
clientDependents();
adminDashboard();
adminSubscribers();
adminClientSingle();
