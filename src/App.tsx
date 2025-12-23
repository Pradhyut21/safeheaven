import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SnackbarProvider } from 'notistack';

// Theme
import theme from './theme/theme';

// Layout
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import NewInspectionPage from './pages/NewInspectionPage';
import PropertyReportsPage from './pages/PropertyReportsPage';
import RegulatorViewPage from './pages/RegulatorViewPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SnackbarProvider 
          maxSnack={3} 
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={5000}
        >
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="new-inspection" element={<NewInspectionPage />} />
                <Route path="reports" element={<PropertyReportsPage />} />
                <Route path="regulator" element={<RegulatorViewPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Router>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
