import axios from 'axios';

export const GET_YELPS = 'GET_YELPS';
export const GET_YELP = 'GET_YELP';



export const getYelps = (text, geo, radius) => {
  const query = `?term=${text.replace(/\s+/,'+')}&latitude=${geo.latitude}
  &longitude=${geo.longitude}&radius=${radius}`
  // console.log(`getYelps query: ${query}`);
  const promise = axios.get(`https://foodreview-yelp.herokuapp.com/yelp${query}`);
  return {
    type: GET_YELPS,
    payload: promise
  };
};
export const getYelp =  ( _id) => {
  const promise = axios.get(`https://foodreview-yelp.herokuapp.com/yelp/${_id}`);
  return {
    type: GET_YELP,
    payload: promise
  };
};


