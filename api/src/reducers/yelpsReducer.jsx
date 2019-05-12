import * as Actions from '../actions';

export default (state = [], action) => {
  // console.log('action.geo', action.geo)
  // if (action.payload) console.log(`yelps reducer action payload.data: ${action.payload.data.jsonBody.businesses} action.type: ${action.type}`);
  switch (action.type) {
    case Actions.GET_YELPS:
      return action.payload.data.jsonBody.businesses
    default:
      return state;
  }
};
