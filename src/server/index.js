import fs from 'fs'
import App from '../common/containers/App';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from '../common/store/configureStore';
import express from 'express';
import qs from 'qs';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import bodyParser from 'body-parser'
import axios from 'axios'
import config from './config'
import deviceTemplate from './templates/device_template'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

var access_info = {}
var public_access_info = {}
var device_selected;

try {
  var contents = fs.readFileSync("accessData.json", 'utf8')
  var parsedData = JSON.parse(contents)
  var currentDate = parseInt(new Date().getTime()/1000)
  var fileDate = parseInt(new Date(parsedData.time)/1000)
  var timeDiff = (currentDate - fileDate)/3600
  if(timeDiff < 1) {
    access_info = parsedData.access_info
    public_access_info = parsedData.public_access_info
    device_selected = parsedData.device_selected
    console.log('Loaded access info from accessData.json')
  }
} catch(err) {
  console.log(`Error opening accessData.json. ${err.code}`)
}



const saveInfoToFile = () => {
  let info = JSON.stringify({
    access_info,
    public_access_info,
    device_selected,
    time: new Date()
  })

  fs.writeFile("accessData.json", info, 'utf8', err => {
    if(err)
      console.log(`Could not save access info to file. Error: ${err}`)

    console.log('Access info saved successfully in accessData.json')
  })
}

const buildRequestBody = (code) => qs.stringify({
	grant_type: 'authorization_code',
	code: code,
	redirect_uri: "http://localhost:3000/setup"
})

const authConfig = () => ({
	headers: {
		'Authorization': `Basic ${config.appAuth}`,
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	},
})

const headerWithToken = () => ({
	headers: {
		'Authorization': 'Bearer ' + access_info.access_token
	}
})

const server = express()

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.disable('x-powered-by')

server.use(express.static(process.env.RAZZLE_PUBLIC_DIR))

server.get('/', (req, res) => {


  // Create a new Redux store instance
  const store = configureStore();

  // Render the component to a string
  const markup = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Grab the initial state from our Redux store
  const finalState = store.getState();

  res.send(`
  <!doctype html>
  <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Razzle Redux Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''}
          ${process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`}
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(finalState)}
        </script>
    </body>
  </html>
  `);
});

server.get('/playing', (req, res) => {
  axios.get('https://api.spotify.com/v1/me/player/currently-playing', headerWithToken())
  .then(response => response.data)
  .then(data => {
    res.send(data)
  })
  .catch(err => console.err(err))
})

server.get('/pause', (req, res) => {
  axios.put(`https://api.spotify.com/v1/me/player/pause?device_id=${device_selected}`, {}, headerWithToken())
  .then(() => res.sendStatus(204))
  .catch(response => console.log(response))
})

server.get('/resume', (req, res) => {
  axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${device_selected}`, {}, headerWithToken())
  .then(() => res.sendStatus(204))
  .catch(response => console.log(response))
})

server.get('/access_info', (req, res) => {
  res.send(public_access_info)
})

server.get('/setup', (req, res) => {
  if(Object.keys(access_info).length === 0) {
    console.log('Access code received. Fetching private access token.')
    axios.post('https://accounts.spotify.com/api/token', buildRequestBody(req.query.code), authConfig())
      .then(response => response.data)
      .then(data => {
        console.log('Fetch complete!')
        access_info = data
        console.log('Saving private access info.')
        res.redirect('https://accounts.spotify.com/es/authorize?client_id=834e47fa5c0c40769a0cae41eb630a6f&response_type=code&state=34fFs29kd09&redirect_uri=http:%2F%2Flocalhost:3000/setup')
      })
      .catch(error => console.log(error))
  } else if(Object.keys(public_access_info).length === 0) {
    console.log('Access code received. Fetching public access token.')
    axios.post('https://accounts.spotify.com/api/token', buildRequestBody(req.query.code), authConfig())
    .then(response => response.data)
    .then(data => {
      console.log('Fetch complete!')
      public_access_info = data
      console.log('Saving public access info.')
      res.redirect('/device');
    })
    .catch(error => console.log(error))
  } else {
    res.send("You are setup")
  }
})

server.get('/device', (req, res) => {
  if(Object.keys(access_info) !== 0 && Object.keys(public_access_info) !== 0 && device_selected === undefined){
    console.log('Fetching devices!')
    axios.get('https://api.spotify.com/v1/me/player/devices', headerWithToken())
    .then(response => response.data)
    .then(data => {
      console.log('Devices fetched!')
      console.log('Rendering device selection template.')
      res.send(deviceTemplate(data));
    })
    .catch(error => console.log(error))
  }
})

server.post('/device', (req, res) => {
  if(device_selected === undefined) {
    console.log(`Selected device ID: ${req.body.device}`)
    device_selected = req.body.device;
    saveInfoToFile()
    console.log('Now you can control spotify from your browser. http://localhost:3000')
    res.redirect('/')
  } else {
    res.send('If you want to change the playing device, please restart PartyQueue server.')
  }
})

export default server;
