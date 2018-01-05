//import React from 'react';
import { connect } from 'react-redux';
import Yelps from './Yelps'
import {getYelps} from '../actions'
const mapStateToProps = (state) => {
    return {
      yelps: state.yelps
    }
  }
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      fetchYelps: (ownProps) => dispatch(getYelps(ownProps.text, ownProps.geo, ownProps.radius)), 
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps )(Yelps);


