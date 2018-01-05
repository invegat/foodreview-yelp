import React, { Component } from 'react';

//import Movie from './Movie';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../index.css';
import { Link } from 'react-router-dom';
class Yelps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yelps: [],
      text: '',
      geo: {},
      radius: 0
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log('navigator succeeded');
        this.setState({
          geo: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          radius: 5,
          text: 'tacos'
        });
      },
      error => {
        console.log('navigator failed error:', error);
        this.setState({
          geo: { latitute: 37.786882, longitude: -122.399972 },
          radius: 5,
          text: 'tacos'
        });
      }
    );
  }
  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        id: 'image',
        Header: 'Image',
        accessor:  d => {
          //console.log(`d:${d}`);
          return <img src={d.image_url} alt="business" height="100" width="100" />
        }
      },
      {
        id: 'reviewCount',
        Header: 'Review Count',
        accessor: 'review_count'
      },
      {
        id: 'rating',
        Header: 'Rating',
        accessor: 'rating'
      },
      {
        id: 'detail',
        Header: 'Show Detail',
        accessor: d => (
          <Link to={`/yelps/${d.id}`} data={d}  >
            {d.name}
          </Link>
        )
      }
    ];

    return (
      <div>
        <form
          onSubmit={e => {
            console.log('form onSubmit text:', this.state.text);
            e.preventDefault();
            this.props
              .fetchYelps({
                text: this.state.text,
                geo: this.state.geo,
                radius: Math.round(Number(this.state.radius) * 1609.34)
              })
              .then(
                props => {
                  // console.log('yelps props.payload.data', props.payload.data.jsonBody.businesses);
                  this.setState({
                    yelps: props.payload.data.jsonBody.businesses
                  });
                },
                () => {
                  // console.log('Mounted State:', this.state);
                }
              );
          }}
        >
          <label>
            {'Radius in miles'}
            <input
              type="text"
              pattern="[0-9]*"
              value={this.state.radius}
              onChange={(event) => {
                this.setState({
                  radius: event.target.value
                })
              }}
            />
          </label>
          <label>
            {`
            search text (food - example: 'tacos') and/or (business - example:
            'Taco Bell') and/or (type - example: 'restaurant') `}
            <input type="text" value={this.state.text} onChange={event => {
              this.setState({
                text: event.target.value
              })
            }} />
          </label>
          <button type="submit">Submit</button>
        </form>
        <ReactTable
          className="-highlight"
          defaultPageSize={15}
          data={this.props.yelps}
          columns={columns}
        />
      </div>
    );
  }
}

export default Yelps;
