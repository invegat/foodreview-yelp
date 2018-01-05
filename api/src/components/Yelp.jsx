import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

export default class Yelp extends Component {
  constructor(props) {
    super(props);
    // console.log('Yelp props.match.url', props.match.url);
    // console.log('Yelp props.data', props.data);
    // this.state = {
    //   data: props.data.filter(y => y.id === props.match.url.substring(7))[0]
    // };
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
   // console.log(`componentDidMount id: ${this.props.match.url.substring(7)}`)
   // console.log(`data keys: ${Object.keys(this.state.data)}`);
   this.props.fetchYelp(this.props.match.url.substring(7))
   .then(data => {
//    console.log(`data keys: ${Object.keys(data.payload.data.jsonBody.businesses[0])}`);
     this.setState({
       data: data.payload.data.jsonBody.businesses[0]
     });
   })
    /*
    Yelp.jsx:17 data keys: id,name,image_url,is_closed,url,review_count,categories,rating,coordinates,transactions,price,location,phone,display_phone,distance
    console.log('Yelp componentDidMount:', this.props.match.url);
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log('navigator succeeded');
        this.setState({
          geo: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
        console.log(`geo.latitude: ${position.coords.latitude}   geo.longitude: ${ position.coords.longitude}`);
        this.props.fetchYelp({_id: this.props.match.url.substring(7),geo: {latitude: position.coords.latitude, longitude: position.coords.longitude }})
        .then( props => {
          console.log('Yelp data:', props.payload.data.jsonBody.businesses);
          this.setState({
            data: props.payload.data.jsonBody.businesses.filter(y => y.id === this.props.match.url.substring(7))[0]
          })
        })
      },
      error => {
        console.log('navigator failed error:', error);
        this.setState({
          geo: { latitute: 37.786882, longitude: -122.399972 }
        });
        this.props.fetchYelp({_id: this.props.match.url.substring(7),geo: {latitude:  37.786882, longitude:  -122.399972}})
        .then( data => {
          console.log('Yelp data:', data);
          this.setState({
            data
          })
        })
      }
    );
 */
  }
  render() {
    // keys: id,name,image_url,is_closed,url,review_count,categories,rating,coordinates,transactions,price,location,phone,display_phone,distance
    //       id,name,image_url,is_closed,url,review_count,categories,rating,coordinates,transactions,price,location,phone,display_phone,distance
    return (
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
          { this.state.data.url ? <Link to={this.state.data.url} target="_blank">Yelp Business URL</Link> : null} 
        </div>
        <div>
          reviews: {this.state.review_count || 0} rating: {this.state.data.rating} distance(miles) {(this.state.data.distance / 1609.34).toFixed(2)} 
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
          
        <button>
          <Link to="/">Back to List</Link>
        </button>
      </form>
    );
  }
}
