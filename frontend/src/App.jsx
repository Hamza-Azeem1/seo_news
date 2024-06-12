import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { theme } from './Theme';
import { SnackbarProvider } from 'notistack';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Router from './routes';
import './App.css';

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <SnackbarProvider
            autoHideDuration={3000}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
          >
            <ErrorBoundary title="SEO News">
              <Router />
            </ErrorBoundary>
          </SnackbarProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
