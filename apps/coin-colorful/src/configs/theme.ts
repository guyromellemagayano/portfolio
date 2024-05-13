import { createTheme } from '@mui/material/styles'
import { TypographyStyleOptions } from '@mui/material/styles/createTypography'

import { isNotNullOrUndefined } from '@guy-romelle-magayano/react-utils'

export const THEME_CONTAINER_WIDTH = 1260
export const THEME_SPACER = 5
export const THEME_HEADER_HEIGHT = '9rem'
export const THEME_HEADER_HEIGHT_MD = '8rem'

export type TColorConfig = {
  headlineColor: string
  textColor: string
  backgroundColor: string
  buttonColor: 'primary' | 'secondary'
}

// Configuration object for color palettes.
const colorConfigs: { [key: string]: TColorConfig } = {
  'palette-1. White (#FFFFFF)': {
    headlineColor: '#1B273A',
    textColor: '#414D63',
    backgroundColor: '#fff',
    buttonColor: 'primary'
  },
  'palette-7. Black (#000000)': {
    headlineColor: '#fff',
    textColor: '#bbb',
    backgroundColor: '#000',
    buttonColor: 'secondary'
  },
  'palette-2. White Smoke (#FCFCFC)': {
    headlineColor: '#1B273A',
    textColor: '#414D63',
    backgroundColor: '#fcfcfc',
    buttonColor: 'primary'
  },
  'palette-3. Light Gray (#F4F4F4)': {
    headlineColor: '#000',
    textColor: '#000',
    backgroundColor: '#f4f4f4',
    buttonColor: 'primary'
  },
  'palette-4. Gray (#EAEAEA)': {
    headlineColor: '#000',
    textColor: '#000',
    backgroundColor: '#eaeaea',
    buttonColor: 'primary'
  },
  'palette-5. Steel Gray (#BBBBBB)': {
    headlineColor: '#000',
    textColor: '#000',
    backgroundColor: '#bbbbbb',
    buttonColor: 'primary'
  },
  'palette-6. Dark Gray (#797979)': {
    headlineColor: '#fff',
    textColor: '#fff',
    backgroundColor: '#797979',
    buttonColor: 'secondary'
  }
}

/**
 * Retrieves the color configuration from the specified palette.
 * @param palette - The name of the palette.
 * @returns The color configuration for the specified palette.
 */
export const getColorConfigFromPalette = (palette: string): TColorConfig => {
  if (!isNotNullOrUndefined(colorConfigs[`palette-${palette}`])) {
    return colorConfigs[`palette-${palette}`]
  }

  return colorConfigs[`palette-${palette}`]
}

// The colorful theme configuration.
const colorfulTheme = createTheme({
  spacing: THEME_SPACER,
  typography: {
    fontFamily: `'Red Hat Display', sans-serif`,
    htmlFontSize: 10,
    caption: {
      fontSize: '1.5rem',
      opacity: 0.6
    } as TypographyStyleOptions & { opacity: number }
  },
  palette: {
    text: {
      primary: '#000'
    },
    primary: {
      main: '#000'
    },
    secondary: {
      main: '#fff'
    },
    background: {
      default: 'white'
    }
  },

  components: {
    MuiToolbar: {
      styleOverrides: {
        gutters: {
          '@media (min-width: 600px)': {
            paddingLeft: '30px',
            paddingRight: '30px'
          },
          '@media (min-width: 1280px)': {
            paddingLeft: '75px',
            paddingRight: '75px'
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        underlineHover: {
          '&:hover': {
            textDecoration: 'underline'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          textDecoration: 'none',
          boxShadow: 'none',
          fontSize: '2.1rem',
          lineHeight: 1.52,
          fontWeight: 500,
          transition:
            'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, color 0.2s ease-in-out'
        },
        contained: {
          borderRadius: '9px',
          boxShadow: 'none',
          padding: '1.1rem 2.4rem',

          '&:hover, &:focus': {
            boxShadow: '0px 3px 6px #00000029',
            transform: 'translateY(-4px)'
          }
        },

        containedSecondary: {
          '&:hover, &:focus': {
            backgroundColor: '#fff'
          }
        },

        containedSizeSmall: {
          fontSize: '1.8rem',
          lineHeight: 1.801,
          padding: '0 1.4rem'
        },

        text: {
          padding: 0,

          '&:hover, &:focus': {
            backgroundColor: 'transparent',
            transform: 'translateY(-4px)'
          }
        },

        textPrimary: {
          '&:hover, &:focus': {
            backgroundColor: 'transparent'
          }
        },

        textSecondary: {
          '&:hover, &:focus': {
            backgroundColor: 'transparent'
          }
        },

        textSizeSmall: {
          fontSize: '1.8rem',
          lineHeight: 1.801,
          padding: 0
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-input': {
            padding: `1.35rem 1.4rem`
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#f2f2f2'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '10px',
          minHeight: '100%'
        },
        body: {
          minHeight: '100%',
          '.is-scroll-locked': {
            overflow: 'hidden'
          },
          '#__next': {
            display: 'flex',
            flexDirection: 'column'
          }
        }
      }
    }
  }
})

colorfulTheme.typography.body1 = {
  ...colorfulTheme.typography.body1,
  fontSize: '1.8rem',
  lineHeight: 1.571
}
colorfulTheme.typography.body2 = {
  ...colorfulTheme.typography.body2,
  fontSize: '2rem',
  lineHeight: 1.571
}

colorfulTheme.typography.h1 = {
  ...colorfulTheme.typography.h1,
  fontSize: '3.8rem',
  lineHeight: 1.089,
  fontWeight: 600
}
colorfulTheme.typography.h2 = {
  ...colorfulTheme.typography.h2,
  fontSize: '3rem',
  lineHeight: 1.086,
  fontWeight: 600
}
colorfulTheme.typography.h3 = {
  ...colorfulTheme.typography.h3,
  fontSize: '2.1rem',
  lineHeight: 1.08,
  fontWeight: 600
}
colorfulTheme.typography.h4 = {
  ...colorfulTheme.typography.h4,
  fontSize: '2.1rem',
  lineHeight: 1.08,
  fontWeight: 600
}
colorfulTheme.typography.h5 = {
  ...colorfulTheme.typography.h5,
  fontSize: '2.1rem',
  lineHeight: 1.08,
  fontWeight: 600
}
colorfulTheme.typography.h6 = {
  ...colorfulTheme.typography.h6,
  fontSize: '2.1rem',
  lineHeight: 1.08,
  fontWeight: 600
}
colorfulTheme.mixins.toolbar = {
  ...colorfulTheme.mixins.toolbar,
  height: THEME_HEADER_HEIGHT_MD,
  [colorfulTheme.breakpoints.up('md')]: {
    height: '9rem'
  }
}

export default colorfulTheme