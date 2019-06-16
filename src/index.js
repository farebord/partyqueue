import express from 'express';
import open from 'open';


let app = require('./server').default;

if (module.hot) {
  module.hot.accept('./server', function() {
    console.log('🔁  HMR Reloading `./server`...');
    try {
      app = require('./server').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, function(err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> Started on port ${port}`);
    console.log('Opening Spotify authorization site.')
    open('https://accounts.spotify.com/es/authorize?client_id=834e47fa5c0c40769a0cae41eb630a6f&scope=user-read-currently-playing user-read-playback-state user-modify-playback-state&response_type=code&state=34fFs29kd09&redirect_uri=http://localhost:3000/setup')
  });
