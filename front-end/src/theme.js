import { createTheme } from '@material-ui/core/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7289da',
    },
    secondary: {
      main: '#ffd369',
    },
    background: {
      paper: '#171717',
      default: '#222831',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Helvetica',
      'Arial',
      'Josefin Sans',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'unset',
        },
        elevation2: {
          boxShadow: '0px 3px 15px rgba(139,21,178,0.3)',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        primary: {
          backgroundImage:
            'linear-gradient(to right, #895cf2 0%, #ffabf4 50%, #895cf2 100%)',
          color: '#fafafa',
          transition: 'all 0.5s ease-out',
          backgroundSize: '300% 300%',
          '&:hover': {
            backgroundPosition: 'right center',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          letterSpacing: '1.2px',
          '&.Mui-disabled': {
            backgroundImage: 'none',
          },
        },
        containedPrimary: {
          backgroundImage:
            'linear-gradient(to right, #895cf2 0%, #ffabf4 50%, #895cf2 100%)',
          color: '#fafafa',
          transition: 'all 0.5s ease-out',
          backgroundSize: '300% 300%',
          '&:hover': {
            backgroundPosition: 'right center',
          },
        },
        containedSecondary: {
          backgroundImage:
            'linear-gradient(to right, #f6d365 0%, #fda085 51%, #f6d365 100%)',
          color: '#000',
          transition: 'all 0.5s ease-out',
          backgroundSize: '300% 300%',
          '&:hover': {
            backgroundPosition: 'right center',
          },
        },
      },
    },
  },
})

// GLOBAL DELETE BUTTON
// backgroundImage: "linear-gradient(to right, #eb3941, #f15e64, #e14e53, #e2373f)",
// backgroundSize: "300% 300%",
// color: "#fafafa",
// transition: "all 0.5s ease-out",
// "&:hover": {
//     backgroundPosition: "right center",
// },
