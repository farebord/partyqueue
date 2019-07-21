import React from 'react';
import { connect } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

import './SearchInput.scss';

export const SearchInput = () => (
  <Paper className="fieldContainer">
    <InputBase
      className="searchInput"
      placeholder="Search..."
      inputProps={{ 'aria-label': 'Search...' }}
      fullWidth
    />
    <span className="inputIcon">
      <SearchIcon />
    </span>
  </Paper>
);

SearchInput.propTypes = {

};

export const mapStateToProps = () => ({

});

export const mapDispatchToProps = () => ({

});

export default connect(null, mapDispatchToProps)(SearchInput);
