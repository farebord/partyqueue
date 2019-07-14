import 'babel-polyfill';
import axios from 'axios';

export const getCurrentPlayback = headers => axios.get('https://api.spotify.com/v1/me/player/currently-playing', headers)
  .then(response => response)
  .catch(err => err);

export const pauseDevice = (device, headers) => axios.put(`https://api.spotify.com/v1/me/player/pause?device_id=${device}`, {}, headers)
  .then(() => true)
  .catch(err => err);

export const resumeDevice = (device, headers) => axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, {}, headers)
  .then(() => true)
  .catch(err => err);

export const getAccessInfo = (body, authConfig) => axios.post('https://accounts.spotify.com/api/token', body, authConfig)
  .then(response => response)
  .catch(err => err);

export const getDevices = headers => axios.get('https://api.spotify.com/v1/me/player/devices', headers)
  .then(response => response)
  .catch(err => err);
