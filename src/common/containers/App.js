import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ImageLoader from 'react-loading-image';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import CircularProgress from '@material-ui/core/CircularProgress';

import SearchInput from '../components/SearchInput';
import PlayerControls from '../components/PlayerControls';

import { fetchCurrentPlayback, fetchAccessInfo } from '../actions';

import './App.scss';

const artistMock = {
  name: 'Next track',
  artists: 'Artist1, Artist2',
};

const listMock = new Array(10).fill(artistMock);

const nextTracksMock = listMock.map((item, index) => ({ id: index, ...item }));

const LoadingImage = ({ source, className, alt, classNameCircular }) => (
  <ImageLoader
    loading={() => <CircularProgress className={classNameCircular} />}
    src={source}
    alt={alt}
    image={({ src }) => <img src={src} className={className} alt={alt} />}
  />
);

LoadingImage.propTypes = {
  source: PropTypes.string.isRequired,
  className: PropTypes.string,
  alt: PropTypes.string.isRequired,
  classNameCircular: PropTypes.string,
};

LoadingImage.defaultProps = {
  className: '',
  classNameCircular: '',
};

export const App = ({
  getAccessInfo, getPlayingInfo, imageCoverBig, imageCoverMedium,
}) => {
  const refreshCurrentPlayback = () => {
    getPlayingInfo();
  };
  useEffect(() => {
    getAccessInfo();
    setInterval(refreshCurrentPlayback, 1000);
  }, []);
  return (
    <div className="wrapper">
      <div className="playerContainer">
        <div className="searchContainer">
          <SearchInput />
        </div>
        <div className="middleContainer">
          <LoadingImage className="albumBig" classNameCircular="circularBig" source={imageCoverBig} alt="Album" />
          <LoadingImage className="albumMedium" classNameCircular="circularMedium" source={imageCoverMedium} alt="Album" />
        </div>
        <div className="tracksContainer">
          <List className="nextTracks">
            {nextTracksMock.map((item => (
              <ListItem className="trackItem" key={item.id}>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.artists} />
              </ListItem>
            )))}
          </List>
        </div>
        <div className="controlContainer">
          <PlayerControls />
        </div>
      </div>
      <div className="imageContainer">
        <LoadingImage className="albumRightBig" source={imageCoverBig} alt="Album" />
      </div>
    </div>
  );
};

App.propTypes = {
  /* Function that fetches public access token for using Spotify API */
  getAccessInfo: PropTypes.func,
  /* Function that fetched current playback information  */
  getPlayingInfo: PropTypes.func,
  /* Album covers  of the song that is currently being listen */
  imageCoverBig: PropTypes.string,
  imageCoverMedium: PropTypes.string,
};

App.defaultProps = {
  getPlayingInfo: () => {},
  getAccessInfo: () => {},
  imageCoverBig: '',
  imageCoverMedium: '',
};


export const mapStateToProps = ({ player }) => ({
  imageCoverBig: player.item && player.item.album.images[0].url,
  imageCoverMedium: player.item && player.item.album.images[1].url,
});

export const mapDispatchToProps = dispatch => ({
  getAccessInfo: () => dispatch(fetchAccessInfo()),
  getPlayingInfo: () => dispatch(fetchCurrentPlayback()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
