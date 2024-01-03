import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '58px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`

// Create a theme instance.
const theme = extendTheme({
  trello:{
    appBarHeight : APP_BAR_HEIGHT,
    boardBarHeight : BOARD_BAR_HEIGHT,
    boardContentHeight : BOARD_CONTENT_HEIGHT
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#3498db'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#ecf0f1'
        }
      }
    }
    // bun: {
    //   palette: {
    //     primary: {
    //       main: '#ecf0f1'
    //     }
    //   }
    // }
  },
  // overide all atributes
  components: {
    // css thanh kéo ngang
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '5px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdc3c7',
            borderRadius: '8px'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem'
        } )
      }
    },
    // text of input
    MuiInputLabel: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    // Override Typography
    MuiTypography: {
      styleOverrides: {
        root: {
          // chỉ ghi đề những Typography của card (Ngoại trừ title của Column)
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.main,
            fontSize: '0.875rem',
            '.MuiOutlinedInput-notchedOutline' : {
              // set border input
              borderColor: theme.palette.primary.light
            },
            // hover vào
            '$:hover' : {
              '.MuiOutlinedInput-notchedOutline' : {
                // set border input
                borderColor: theme.palette.primary.main
              }
            },
            '& fieldset': {
              borderWidth: '1px !important'
            }
          }
        }
      }
    }
  }

})

export default theme