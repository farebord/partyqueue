import fs from 'fs'
import qs from 'qs';
import express from 'express';
import serialize from 'serialize-javascript';
import bodyParser from 'body-parser'

import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

import axios from 'axios'
import theme from '../common/theme';
import { ThemeProvider, ServerStyleSheets } from '@material-ui/styles';

import configureStore from '../common/store/configureStore';

import { getCurrentPlayback, pauseDevice, resumeDevice, getAccessInfo, getDevices } from './apiFunctions'

import config from './config'
import deviceTemplate from './templates/device_template'
import App from '../common/containers/App';

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

const authData = Buffer.from(`${config.clientKey}:${config.secretKey}`).toString('base64')

const authConfig = () => ({
	headers: {
		'Authorization': `Basic ${authData}`,
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

  const sheets = new ServerStyleSheets();

  const store = configureStore();

  // Render the component to a string
  const markup = renderToString(
      sheets.collect(<ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>)
  );
  
  const css = sheets.toString()

  // Grab the initial state from our Redux store
  const finalState = store.getState();

  res.send(`
  <!doctype html>
  <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>PartyQueue</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css" />
        ${assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''}
          ${process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`}
        <style id="jss-server-side">${css}</style>
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

server.get('/playing', async (req, res) => {
  const response = await getCurrentPlayback(headerWithToken())
  if(response.isAxiosError) console.log(response)
  res.send(response.data)
})

server.get('/pause', async (req, res) => {
  const response = await pauseDevice(device_selected, headerWithToken())
  if(response.isAxiosError) console.log(response)
  else res.sendStatus(204)
})

server.get('/resume', async (req, res) => {
  const response = await resumeDevice(device_selected, headerWithToken())
  if(response.isAxiosError) console.log(response)
  else res.sendStatus(204)
})

server.get('/access_info', (req, res) => {
  res.send(public_access_info)
})

server.get('/setup', async (req, res) => {
  if(Object.keys(access_info).length === 0) {
    console.log('Access code received. Fetching private access token.')
    const response = await getAccessInfo(buildRequestBody(req.query.code), authConfig())
    if(response.isAxiosError) console.log(response)
    else {
      console.log('Fetch complete!')
      access_info = response.data
      console.log('Saving private access info.')
        res.redirect('https://accounts.spotify.com/es/authorize?client_id=834e47fa5c0c40769a0cae41eb630a6f&response_type=code&state=34fFs29kd09&redirect_uri=http:%2F%2Flocalhost:3000/setup')
    }
  } else if(Object.keys(public_access_info).length === 0) {
    console.log('Access code received. Fetching public access token.')
    const response = await getAccessInfo(buildRequestBody(req.query.code), authConfig())
    if(response.isAxiosError) console.log(response)
    else {
      console.log('Fetch complete!')
      public_access_info = response.data
      console.log('Saving public access info.')
        res.redirect('/device')
    }
  } else {
    console.log('You are already setup.')
    res.redirect('/')
  }
})

server.get('/device', async (req, res) => {
  if(Object.keys(access_info) !== 0 && Object.keys(public_access_info) !== 0 && device_selected === undefined){
    console.log('Fetching devices!')
    const response = await getDevices(headerWithToken())
    if(response.isAxiosError) console.log(response)
    else {
      console.log('Devices fetched!')
      console.log('Rendering device selection template.')
      res.send(deviceTemplate(response.data));
    }
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
