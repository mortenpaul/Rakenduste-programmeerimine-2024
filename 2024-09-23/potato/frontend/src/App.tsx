import { red } from '@mui/material/colors';
import './App.css';
import Cats from './components/Cats';
import Todos from './components/Todo';
import { Box, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{
      display: 'flex', 
      flexDirection: { xs: 'column', md: 'row' }, 
      width: '100vw', 
      height: '100vh',
      padding: 2
    }}>
    
      <Box sx={{
        flex: 1, 
        padding: 2, 
        borderRight: { md: '1px solid #ddd' }, 
        overflowY: 'auto', 
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Cats />
      </Box>

      <Box sx={{
        flex: 1, 
        padding: 2, 
        overflowY: 'auto', 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Todos />
      </Box>
    </Box>
    </ThemeProvider>
  );
}

export default App;