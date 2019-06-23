import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';

import { fetchCurrentPlayback, fetchAccessInfo } from '../actions'
import Grid from '@material-ui/core/Grid'
import SearchInput from '../components/SearchInput'
import PlayerControls from '../components/PlayerControls';

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

export const App = ({classes, getInitialData}) => {
  useEffect(() => {
    getInitialData()
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

      </Grid>
      <Grid item xs className={classes.playerControl}>
        <PlayerControls />
      </Grid>
    </Grid>
  )
}

App.propTypes = {
  classes: PropTypes.object,
  getInitialData: PropTypes.func,
  playerFetched: PropTypes.bool
}


export const mapStateToProps = () => ({
  
});

export const mapDispatchToProps = dispatch => ({
  getInitialData: () => {
    dispatch(fetchAccessInfo())
    dispatch(fetchCurrentPlayback())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
