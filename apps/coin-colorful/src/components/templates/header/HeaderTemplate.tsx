import Menu from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Theme,
  Toolbar
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTranslations } from 'next-intl'

import { CtfNavigationGql } from '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-navigation/ctf-navigation-gql'
import { Link } from '@guy-romelle-magayano/coin-colorful/components/shared'
import Logo from '@guy-romelle-magayano/coin-colorful/components/svg/icons/colorful-coin-logo.svg'
import {
  THEME_CONTAINER_WIDTH,
  THEME_HEADER_HEIGHT,
  THEME_HEADER_HEIGHT_MD
} from '@guy-romelle-magayano/coin-colorful/configs'
import { Div } from '@guy-romelle-magayano/react-components/server'

const useStyles = makeStyles((theme: Theme) => ({
  appbar: {
    boxShadow: '0 2px 6px #00000021'
  },
  toolbar: {
    height: THEME_HEADER_HEIGHT_MD,
    [theme.breakpoints.up('md')]: {
      height: THEME_HEADER_HEIGHT
    }
  },
  toolbarContent: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between'
  },
  logo: {
    display: 'block',
    maxWidth: '120px',
    height: 'auto'
  },
  menuWrapper: {
    alignItems: 'center',
    display: 'flex'
  },
  accountMenu: {
    alignItems: 'center',
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0
  },

  accountMenuItem: {
    '& + &': {
      marginLeft: theme.spacing(8),

      [theme.breakpoints.up('lg')]: {
        marginLeft: theme.spacing(10)
      }
    },
    '& .MuiButton-startIcon': {
      marginRight: '0.4rem'
    },
    '& .MuiButton-iconSizeSmall > :first-child': {
      fontSize: '1.5rem'
    }
  },
  corporateLogo: {
    display: 'block',
    height: 'auto',
    width: '113px'
  }
}))

export type HeaderPropsProps = {
  isMenuOpen?: boolean
  onMenuClick?: () => any
}

const HeaderTemplate = ({ onMenuClick, isMenuOpen }: HeaderPropsProps) => {
  const t = useTranslations(),
    classes = useStyles()

  return (
    <AppBar position="sticky" color="secondary" className={classes.appbar}>
      <Toolbar>
        <Container
          className={classes.toolbarContent}
          disableGutters
          maxWidth={false}
          style={{
            maxWidth: `${THEME_CONTAINER_WIDTH / 10}rem`
          }}
        >
          <Link href="/" withoutMaterial title={t('common.homepage')}>
            <Logo className={classes.corporateLogo} />
          </Link>
          <Box display={{ xs: 'none', md: 'block' }}>
            <Div className={classes.menuWrapper}>
              <CtfNavigationGql />
            </Div>
          </Box>
        </Container>

        <Box display={{ md: 'none' }}>
          <IconButton
            title={t('navigation.mobileMenuButton')}
            onClick={() => onMenuClick?.()}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-haspopup="dialog"
          >
            <Menu />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

HeaderTemplate.displayName = 'HeaderTemplate'

export default HeaderTemplate
