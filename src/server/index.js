import fs from 'fs';
import qs from 'qs';
import express from 'express';
import serialize from 'serialize-javascript';
import bodyParser from 'body-parser';

import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

import { ThemeProvider, ServerStyleSheets } from '@material-ui/styles';
import theme from '../common/theme';

import configureStore from '../common/store/configureStore';

import {
  getCurrentPlayback, pauseDevice, resumeDevice, getAccessInfo, getDevices,
} from './apiFunctions';

import config from './config';
import deviceTemplate from './templates/device_template';
import App from '../common/containers/App';

/* eslint-disable import/no-dynamic-require */
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

let accessInfo = {};
let publicAccessInfo = {};
let deviceSelected;

try {
  const contents = fs.readFileSync('accessData.json', 'utf8');
  const parsedData = JSON.parse(contents);
  const currentDate = parseInt(new Date().getTime() / 1000, 10);
  const fileDate = parseInt(new Date(parsedData.time) / 1000, 10);
  const timeDiff = (currentDate - fileDate) / 3600;
  if (timeDiff < 1) {
    /* eslint-disable prefer-destructuring */
    accessInfo = parsedData.accessInfo;
    publicAccessInfo = parsedData.publicAccessInfo;
    deviceSelected = parsedData.deviceSelected;
    console.log('Loaded access info from accessData.json');
  }
} catch (err) {
  console.log(`Error opening accessData.json. ${err.code}`);
}


const saveInfoToFile = () => {
  const info = JSON.stringify({
    accessInfo,
    publicAccessInfo,
    deviceSelected,
    time: new Date(),
  });

  fs.writeFile('accessData.json', info, 'utf8', (err) => {
    if (err) { console.log(`Could not save access info to file. Error: ${err}`); }

    console.log('Access info saved successfully in accessData.json');
  });
};

const buildRequestBody = code => qs.stringify({
  grant_type: 'authorization_code',
  code,
  redirect_uri: 'http://localhost:3000/setup',
});

const authData = Buffer.from(`${config.clientKey}:${config.secretKey}`).toString('base64');

const authConfig = () => ({
  headers: {
    Authorization: `Basic ${authData}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
});

const headerWithToken = () => ({
  headers: {
    Authorization: `Bearer ${accessInfo.access_token}`,
  },
});

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.disable('x-powered-by');

server.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

server.get('/', (req, res) => {
  const sheets = new ServerStyleSheets();

  const store = configureStore();

  // Render the component to a string
  const markup = renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>,
    ),
  );

  const css = sheets.toString();

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
  const response = await getCurrentPlayback(headerWithToken());
  if (response.isAxiosError) console.log(response);
  res.send(response.data);
});

server.get('/pause', async (req, res) => {
  const response = await pauseDevice(deviceSelected, headerWithToken());
  if (response.isAxiosError) console.log(response);
  else res.sendStatus(204);
});

server.get('/resume', async (req, res) => {
  const response = await resumeDevice(deviceSelected, headerWithToken());
  if (response.isAxiosError) console.log(response);
  else res.sendStatus(204);
});

server.get('/accessInfo', (req, res) => {
  res.send(publicAccessInfo);
});

server.get('/setup', async (req, res) => {
  if (Object.keys(accessInfo).length === 0) {
    console.log('Access code received. Fetching private access token.');
    const response = await getAccessInfo(buildRequestBody(req.query.code), authConfig());
    console.log(response);
    if (response.isAxiosError) console.log(response);
    else {
      console.log('Fetch complete!');
      accessInfo = response.data;
      console.log('Saving private access info.');
      res.redirect('https://accounts.spotify.com/es/authorize?client_id=834e47fa5c0c40769a0cae41eb630a6f&response_type=code&state=34fFs29kd09&redirect_uri=http:%2F%2Flocalhost:3000/setup');
    }
  } else if (Object.keys(publicAccessInfo).length === 0) {
    console.log('Access code received. Fetching public access token.');
    const response = await getAccessInfo(buildRequestBody(req.query.code), authConfig());
    console.log(response);
    if (response.isAxiosError) console.log(response);
    else {
      console.log('Fetch complete!');
      publicAccessInfo = response.data;
      console.log('Saving public access info.');
      res.redirect('/device');
    }
  } else {
    console.log('You are already setup.');
    res.redirect('/');
  }
});

server.get('/device', async (req, res) => {
  if (Object.keys(accessInfo) !== 0
      && Object.keys(publicAccessInfo) !== 0
      && deviceSelected === undefined) {
    console.log('Fetching devices!');
    const response = await getDevices(headerWithToken());
    if (response.isAxiosError) console.log(response);
    else {
      console.log('Devices fetched!');
      console.log('Rendering device selection template.');
      res.send(deviceTemplate(response.data));
    }
  }
});

server.post('/device', (req, res) => {
  if (deviceSelected === undefined) {
    console.log(`Selected device ID: ${req.body.device}`);
    deviceSelected = req.body.device;
    saveInfoToFile();
    console.log('Now you can control spotify from your browser. http://localhost:3000');
    res.redirect('/');
  } else {
    res.send('If you want to change the playing device, please restart PartyQueue server.');
  }
});

export default server;
