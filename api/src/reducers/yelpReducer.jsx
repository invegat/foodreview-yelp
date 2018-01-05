import * as Actions from '../actions'

export default (state = [], action) => {
    if (action.payload && action.type === Actions.GET_YELP) console.log(`yelp reducer action payload.data: ${action.payload.data.jsonBody.businesses} action.type: ${action.type}`);
    switch(action.type) {
        case Actions.GET_YELP:
            return action.payload.data.jsonBody.businesses      
        default:
            return state
    }
}

// https://foodreview-yelp.herokuapp.com/yelp?term=tacos&latitude=25.745933&longitude=-80.30449569999999&radius=8046
// https://foodreview-yelp.herokuapp.com/yelp?term=tacos&latitude=37.786882&longitude=-122.399972&radius=5000