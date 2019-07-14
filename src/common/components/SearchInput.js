import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/styles';

const styles = () => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  inputIcon: {
    padding: '0.5rem',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
  },
});


export const SearchInput = ({ classes }) => (
  <Paper className={classes.root}>
    <InputBase
      className={classes.input}
      placeholder="Search..."
      inputProps={{ 'aria-label': 'Search...' }}
    />
    <span className={classes.inputIcon}>
      <SearchIcon />
    </span>
  </Paper>
);

SearchInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const mapStateToProps = () => ({

});

export const mapDispatchToProps = () => ({

});

export default connect(null, mapDispatchToProps)(withStyles(styles)(SearchInput));
