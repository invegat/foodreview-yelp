//import React from 'react';
import { connect } from 'react-redux';
import Yelp from './Yelp'
import {getYelp} from '../actions'


const mapStateToProps = (state, ownProps) => {
  console.log(`ownProps keys: ${Object.keys(ownProps)}`);
  console.log(`state keys: ${Object.keys(state)}`);
  return {
    data: state.yelps
  }
}

  const mapDispatchToProps = (dispatch,ownProps) => {
    return {
      fetchYelp: (ownProps) => dispatch(getYelp(ownProps._id, ownProps.geo))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Yelp);
