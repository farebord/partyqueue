import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import orange from '@material-ui/core/colors/orange';

// Configure Material UI theme
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    accent: orange,
    type: 'light',
  },
});

export default theme;