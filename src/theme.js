import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trello:{
    appBarHeight : '58px',
    boardBarHeight : '58px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#ff5252'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#ff5252'
        }
      }
    }
  },
  // overide all atributes
  components: {
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