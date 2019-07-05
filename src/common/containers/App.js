import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';

import { fetchCurrentPlayback, fetchAccessInfo } from '../actions'
import Grid from '@material-ui/core/Grid'
import SearchInput from '../components/SearchInput'
import PlayerControls from '../components/PlayerControls'
import SearchResults from '../components/SearchResults'

const styles = {
  containerGrid: {
    height: '100vh',
    padding: '10px'
  },
  searchBar: {
    flexGrow: '0'
  },
  playerControl: {
    flexGrow: '0'
  }
}

export const App = ({classes, getAccessInfo, getPlayingInfo}) => {
  const refreshCurrentPlayback = () => {
    getPlayingInfo()
  }
  useEffect(() => {
    getAccessInfo()
    setInterval(refreshCurrentPlayback, 1000)
  }, [])
  return (
    <Grid 
      container
      direction="column" 
      className={classes.containerGrid}
    >
      <Grid item xs className={classes.searchBar}>
        <SearchInput />
      </Grid>
      <Grid item xs>
        <SearchResults />
      </Grid>
      <Grid item xs className={classes.playerControl}>
        <PlayerControls />
      </Grid>
    </Grid>
  )
}

App.propTypes = {
  classes: PropTypes.object,
  getAccessInfo: PropTypes.func,
  playerFetched: PropTypes.bool,
  getPlayingInfo: PropTypes.func
}


export const mapStateToProps = () => ({
  
});

export const mapDispatchToProps = dispatch => ({
  getAccessInfo: () => dispatch(fetchAccessInfo()),
  getPlayingInfo: () => dispatch(fetchCurrentPlayback())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
