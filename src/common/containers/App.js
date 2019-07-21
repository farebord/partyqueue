import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

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

export const App = ({
  getAccessInfo, getPlayingInfo, imageCover,
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
        <div className="middleContainer" style={{ backgroundImage: `url(${imageCover})` }} />
        <div className="tracksContainer">
          <List className="nextTracks">
            {nextTracksMock.map((item => (
              <ListItem key={item.id}>
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
      <div className="imageContainer" style={{ backgroundImage: `url(${imageCover})` }} />
    </div>
  );
};

App.propTypes = {
  /* Function that fetches public access token for using Spotify API */
  getAccessInfo: PropTypes.func,
  /* Function that fetched current playback information  */
  getPlayingInfo: PropTypes.func,
  /* Album cover of the song that is currently being listen */
  imageCover: PropTypes.string,
};

App.defaultProps = {
  getPlayingInfo: () => {},
  getAccessInfo: () => {},
  imageCover: '',
};


export const mapStateToProps = ({ player }) => ({
  imageCover: player.item && player.item.album.images[0].url,
});

export const mapDispatchToProps = dispatch => ({
  getAccessInfo: () => dispatch(fetchAccessInfo()),
  getPlayingInfo: () => dispatch(fetchCurrentPlayback()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
