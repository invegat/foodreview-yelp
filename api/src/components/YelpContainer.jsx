//import React from 'react';
import { connect } from 'react-redux';
import Yelp from './Yelp'
import { getYelp } from '../actions'


// const mapStateToProps = (state, ownProps) => {
//   console.log(`ownProps keys: ${Object.keys(ownProps)}`);
//   console.log(`state keys: ${Object.keys(state)}`);
//   return {
//     data: state.yelps
//   }
// }

// const mapStateToProps = (state) => {

//   return {
//     lng: state.longitude,
//     lat: state.latituder
//   }
// }


const mapDispatchToProps = (dispatch) => {
  return {
    fetchYelp: (_id) => dispatch(getYelp(_id))
  }
}
export default connect(null, mapDispatchToProps)(Yelp);
