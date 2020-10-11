import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#a7ff3e',
      main: '#a7ff3e',
      dark: '#255229',
    }
  },
});

export default theme;