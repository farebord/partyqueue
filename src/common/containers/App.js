import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { fetchCurrentPlayback, fetchAccessInfo } from '../actions';
import SearchInput from '../components/SearchInput';
import PlayerControls from '../components/PlayerControls';
import SearchResults from '../components/SearchResults';


const styles = {
  containerGrid: {
    height: '100vh',
    padding: '10px',
  },
  searchBar: {
    flexGrow: '0',
  },
  playerControl: {
    flexGrow: '0',
  },
  containerGridWithImage: {
    height: '100vh',
  },
  imageContainer: {
    padding: 0,
    margin: 0,
  },
  albumImage: {
    objectFit: 'contain',
  },
};

export const App = ({
  classes, getAccessInfo, getPlayingInfo, imageCover,
}) => {
  const refreshCurrentPlayback = () => {
    getPlayingInfo();
  };
  useEffect(() => {
    getAccessInfo();
    setInterval(refreshCurrentPlayback, 1000);
  }, []);
  return (
    <React.Fragment>
      <Hidden lgUp>
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
      </Hidden>
      <Hidden mdDown>
        <Grid
          container
          direction="row"
          className={classes.containerGridWithImage}
        >
          <Grid
            xs
            item
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
          <Grid
            xs
            item
            container
            className={classes.imageContainer}
            alignItems="center"
            justify="center"
          >
            <img alt="" src={imageCover} className={classes.albumImage} />
          </Grid>
        </Grid>
      </Hidden>
    </React.Fragment>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
  getAccessInfo: PropTypes.func,
  getPlayingInfo: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
