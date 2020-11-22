import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Routes } from './Routes';
import { theme } from './theme';
import './App.css';

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes />
            </Router>
        </ThemeProvider>
    );
}

