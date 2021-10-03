import { RecoilRoot } from "recoil";
import recoilPersist from "recoil-persist";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Routes } from "./Routes";
import { theme } from "./theme";
import { StyledEngineProvider } from "@material-ui/core/styles";
import "./App.css";

const { RecoilPersist, updateState } = recoilPersist();

export const App = () => {
    return (
        <RecoilRoot initializeState={updateState}>
            <RecoilPersist />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <StyledEngineProvider injectFirst>
                    {/* Your component tree. Now you can override Material-UI's styles. */}
                    <Router>
                        <Routes />
                    </Router>
                </StyledEngineProvider>
                {/* can move it to one fine and then import it */}
                {/*  svg-graphic */}
                <svg width={0} height={0}>
                    <linearGradient id='colorInactive' x1={1} y1={0} x2={1} y2={1}>
                        {/* <stop offset={0} stopColor='rgba(180,93,255,1)' />
                        <stop offset={1} stopColor='rgba(248,105,255,1)' /> */}
                        <stop offset={0} stopColor='rgba(150,150,150,1)' />
                        <stop offset={1} stopColor='rgba(255,255,255,1)' />
                    </linearGradient>
                </svg>
                <svg width={0} height={0}>
                    <linearGradient id='activeColor' x1={1} y1={0} x2={1} y2={1}>
                        <stop offset={0} stopColor='rgba(241,184,74,1)' />
                        <stop offset={1} stopColor='rgba(207,113,8,1)' />
                    </linearGradient>
                </svg>
                {/*  svg-graphic */}
            </ThemeProvider>
        </RecoilRoot>
    );
};
