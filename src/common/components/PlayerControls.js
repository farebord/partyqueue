import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import CircularProgress from '@material-ui/core/CircularProgress';
import { switchPlaying } from '../actions';

import './PlayerControls.scss';

const renderButtonIcon = (loading, isPlaying) => {
  if (loading) { return <CircularProgress size="small" className="loadingProgress" />; }
  if (isPlaying) { return <PauseIcon />; }
  return <PlayIcon />;
};

const getArtists = artistList => artistList.map(artist => artist.name).join(', ');

/**
 * getTimeFromMs takes a number in ms and returns string in format MM:SS
 * @param {number} ms Number representing milliseconds
 * @return {string} Returns a string formated as MM:SS
 */
const getTimeFromMs = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const getProgress = (progress, duration) => `${getTimeFromMs(progress)} / ${getTimeFromMs(duration)}`;

export const PlayerControls = ({
  progress, songInfo, isPlaying, pauseResumePlayer, loading,
}) => (
  <React.Fragment>
    {songInfo && (
      <div className="playerControl">
        <div className="controls">
          <Fab size="small" color="secondary" aria-label="Add" onClick={pauseResumePlayer}>
            {renderButtonIcon(loading, isPlaying)}
          </Fab>
        </div>
        <div className="songInfo">
          <div className="songName">{songInfo.name}</div>
          <div className="songArtists">{getArtists(songInfo.artists)}</div>
        </div>
        <div className="songProgress">
          {getProgress(progress, songInfo.duration_ms)}
        </div>
      </div>
    )}
  </React.Fragment>
);

PlayerControls.propTypes = {
  /* The progress of the song expressed in milliseconds */
  progress: PropTypes.number,
  /* Spotify Item object that contains all the information of a song */
  songInfo: PropTypes.object,
  /* Boolean that says whether the song is being played or not */
  isPlaying: PropTypes.bool,
  /* Boolean that says if the pause/resume action is happening  */
  loading: PropTypes.bool,
  /* Function that toggles pause to the song being played. */
  pauseResumePlayer: PropTypes.func,
};

PlayerControls.defaultProps = {
  progress: null,
  loading: true,
  isPlaying: false,
  songInfo: null,
  pauseResumePlayer: () => {},
};

export const mapStateToProps = ({ player }) => ({
  progress: player.progress_ms,
  songInfo: player.item,
  isPlaying: player.is_playing,
  loading: player.playbackSwitching,
});

export const mapDispatchToProps = dispatch => ({
  pauseResumePlayer: () => dispatch(switchPlaying()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls);
