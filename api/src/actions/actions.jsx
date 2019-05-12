import axios from 'axios';

export const GET_YELPS = 'GET_YELPS';
export const GET_YELP = 'GET_YELP';

const debug = (process.env.NODE_ENV !== 'production');
const server = debug ? 'http://localhost:5001' : 'https://foodreview-yelp.herokuapp.com';

export const getYelps = (text, geo, radius) => {
  const query = `?term=${text.replace(/\s+/,'+')}&latitude=${geo.latitude}
  &longitude=${geo.longitude}&radius=${radius}`
  // console.log(`getYelps query: ${query}`);
  const promise = axios.get(`${server}/yelp${query}`);
  return {
    type: GET_YELPS,
    payload: promise
  };
};
export const getYelp =  ( _id) => {
  console.log(`getYelp id ${_id}`)
  const promise = axios.get(`${server}/yelp/${_id}`);
  return {
    type: GET_YELP,
    payload: promise
  };
};


