import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import geodist from 'geodist';

import '../index.css';
// var geodist = require('geodist')

export default class Yelp extends Component {
  constructor(props) {
    super(props);
    // console.log('Yelp props.match.url', props.match.url);
    // console.log('Yelp props.data', props.data);
    // this.state = {
    //   data: props.data.filter(y => y.id === props.match.url.substring(7))[0]
    // };
    this.state = {
      data: {},
      geo: null
    }
  }

  componentDidMount() {
    console.log(`current route is ${this.props.location.pathname}`)
    // console.log(`componentDidMount id: ${this.props.match.url.substring(7)}`)
    // console.log(`data keys: ${Object.keys(this.state.data)}`);
    this.props.fetchYelp(this.props.location.pathname.substring(7))
      .then(data => {
        //    console.log(`data keys: ${Object.keys(data.payload.data.jsonBody.businesses[0])}`);

        this.setState({
          data: data.payload.data.jsonBody
        }, () => {
          console.log('yelp data distance', this.props.location.state.distance)
        })
      })

  }
  render() {
    // keys: id,name,image_url,is_closed,url,review_count,categories,rating,coordinates,transactions,price,location,phone,display_phone,distance
    //       id,name,image_url,is_closed,url,review_count,categories,rating,coordinates,transactions,price,location,phone,display_phone,distance
    console.log('business url', this.state.data.url)
    return (
      this.state.data.url ?
        <form
          onSubmit={e => {
            //e.preventDefault();
            /*
            console.log(
              `name:${this.name.value}  age:${this.age.value} email:${this.email
                .value}`
            );
            */
          }}
        >

          <img
            id='detailUrl'
            src={this.state.data.image_url}
            alt="business"
            height="500"
            width="500"
          />
          <div>
            {this.state.data.name} is{' '}
            {this.state.data.isClosed ? 'Closed' : 'Open'}
          </div>
          <div>
            {this.state.data.url ? <a href={this.state.data.url} target="_blank" rel="noopener noreferrer" >Yelp Business URL</a> : null}
          </div>
          <div>
            reviews: {this.state.data.review_count || 0} rating: {this.state.data.rating}&nbsp;
          distance(miles): {(this.props.location.state.distance / 1609.34).toFixed(2)}
          </div>

          <div className="table">
            <ul id="categories">
              {this.state.data.categories ? this.state.data.categories.map(c => {
                return <li key={c.alias}>{c.title}</li>;
              }) : null}
            </ul>
          </div>

          <div>Price {this.state.data.price}   Phone {this.state.data.display_phone}  </div>
          <div></div>
          <div></div>
          <div>
            <ul id='address'> Address
            {this.state.data.location ? this.state.data.location.display_address.map(a => {
              return <li key={a}>{a}</li>
            }) : null}
            </ul>
          </div>
          <div>Yelp Id {this.state.data.id}</div>

          <button id='backToList'>
            <Link to="/">Back to List</Link>
          </button>
        </form>
        :
        <div></div>
    );
  }
}
