import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { switchPlaying } from '../actions'

import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    controls: {
      flexGrow: '0',
      padding: '0 10px'
    },
    songInfo: {

    },
    loadingProgress: {
        margin: '10px',
        color: 'white'
    },
    songName: {

    },
    songArtists: {

    },
    songProgress: {

    }
  }

const renderButtonIcon = (loading, isPlaying, classes) =>{
    if(loading)
        return <CircularProgress size="small" className={classes.loadingProgress} />
    if(isPlaying)
        return <PauseIcon />
    else
        return <PlayIcon />
}

const getArtists = artistList => artistList.map(artist => artist.name).join(', ')

const getTimeFromMs = ms => {
    const minutes = Math.floor(ms / 60000)
    const seconds = ((ms % 60000) / 1000).toFixed(0)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export const getProgress = (progress, duration) => `${getTimeFromMs(progress)} / ${getTimeFromMs(duration)}`
  

export const PlayerControls = ({progress, songInfo, classes, isPlaying, pauseResumePlayer, loading}) =>
    <React.Fragment>
        {songInfo &&
        <Grid container>
            <Grid item className={classes.controls} xs>
                <Fab size="small" color="secondary" aria-label="Add" onClick={pauseResumePlayer}>
                    {renderButtonIcon(loading, isPlaying, classes)}
                </Fab>
            </Grid>
            <Grid container item direction="column" xs justify="center">
                <Grid item className={classes.songName}>{songInfo.name}</Grid>
                <Grid item className={classes.songArtists}>{getArtists(songInfo.artists)}</Grid>
            </Grid>
            <Grid item container justify="center" alignItems="center" className={classes.songProgress}>
                {getProgress(progress, songInfo.duration_ms)}
            </Grid>
        </Grid>
        }
    </React.Fragment>

PlayerControls.propTypes = {
    progress: PropTypes.number,
    songInfo: PropTypes.object,
    classes: PropTypes.object,
    isPlaying: PropTypes.bool,
    switchPlaying: PropTypes.func,
    loading: PropTypes.bool,
}

export const mapStateToProps = ({player}) => ({
    progress: player.progress_ms,
    songInfo: player.item,
    isPlaying: player.is_playing,
    loading: player.playbackSwitching,
})

export const mapDispatchToProps = dispatch => ({
    pauseResumePlayer: () => dispatch(switchPlaying())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlayerControls));