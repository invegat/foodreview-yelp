import { combineReducers } from 'redux';
import yelps from './yelpsReducer';
import yelp from './yelpReducer';

const rootReducer = combineReducers({
  yelps, yelp
});

export default rootReducer;