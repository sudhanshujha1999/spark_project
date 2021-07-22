import { RecoilRoot } from 'recoil'
import recoilPersist from 'recoil-persist'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Routes } from './Routes'
import { theme } from './theme'
import { StyledEngineProvider } from '@material-ui/core/styles'
import './App.css'

const { RecoilPersist, updateState } = recoilPersist()

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
      </ThemeProvider>
    </RecoilRoot>
  )
}
