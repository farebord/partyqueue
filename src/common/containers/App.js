import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid'
import SearchInput from '../components/SearchInput'

const styles = {
  containerGrid: {
    height: '100vh',
    padding: '10px'
  }
}

class App extends React.Component { 
  componentDidMount(){
    console.log(this.props)
  }
  render() {
    return (
      <Grid container className={this.props.classes.containerGrid}>
        <Grid item xs={12}>
          <SearchInput />
        </Grid>
        <Grid item xs={12}>

        </Grid>
        <Grid item xs={12}>

        </Grid>
      </Grid>
    )
  }
}


const mapStateToProps = () => ({
  
});

const mapDispatchToProps = dispatch => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
