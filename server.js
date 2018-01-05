const express = require('express');
const bodyParser = require('body-parser');
const CORS = require('cors');

const assert = require('assert');
const app = express();
const path = require('path');

const statusCodes = require('./common/statusCodes.js');

 const url =     "https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972"

 app.use(bodyParser.json());
app.use(CORS());

const yelp = require('yelp-fusion');

yelpApiKey = "fdxCcAeDmHioEvb-wH9aWZEDQb6kwFwzrV5XIsbTL1JFqibhkGBwENt7JHVyEelzsAprDeh49q7HWc9M6aW7HAnjvO19XGgeEx3toHPtBaJ4lnPSXBxC2a6JAoVOWnYx"
yelpClientId: "QHs73MIy7tCDkq7icNwBLQ"

const client = yelp.client(yelpApiKey);


app.get('/yelp/:_id',function(req, res) {
  const { _id } = req.params;
  //const search = `https://api.yelp.com/v3/businesses/search?${term}=${type}&latitude=${lat}&longitude=${long}`;
  // console.log('search:', search);
  const searchRequest = {
    id: _id
  };
  client.search(searchRequest).then(response => {
    res.json(response)
    // res.json(response.jsonBody.businesses.filter(y => y.id == _id));
    // const firstResult = response.jsonBody.businesses[0];
    // const prettyJson = JSON.stringify(firstResult, null, 4);
    // console.log(prettyJson);
  }).catch(e => {
    console.log(e);
  });
});

app.get('/yelp',function(req, res) {
  const {term = 'delis', latitude=37.786882, longitude=-122.399972, radius=5000  } = req.query;
  //const search = `https://api.yelp.com/v3/businesses/search?${term}=${type}&latitude=${lat}&longitude=${long}`;
  // console.log('search:', search);
  const searchRequest = {
    term,
    latitude,
    longitude,
    radius
  };
  client.search(searchRequest).then(response => {
    res.json(response);
    // const firstResult = response.jsonBody.businesses[0];
    // const prettyJson = JSON.stringify(firstResult, null, 4);
    // console.log(prettyJson);
  }).catch(e => {
    console.log(e);
  });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
