import { RecoilRoot } from 'recoil';
import recoilPersist from 'recoil-persist';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Routes } from './Routes';
import { theme } from './theme';
import './App.css';

const { RecoilPersist, updateState } = recoilPersist();

export const App = () => {
    return (
        <RecoilRoot initializeState={updateState}>
            <RecoilPersist />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Routes />
                </Router>
            </ThemeProvider>
        </RecoilRoot>
    );
}

