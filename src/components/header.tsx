import Link from 'next/link';
import React from 'react'
import { AppBar, Grid, Typography, Toolbar, Button, Hidden, IconButton, Popover, Paper, TextField } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { HeaderNav } from './header-nav';
import { Search } from '@material-ui/icons';

export interface IHeaderProps {
  me: { id: string; karma: number } | undefined;
  currentUrl: string;
  isNavVisible: boolean;
  title: string;
  blank?: boolean
}

export function Header(props: IHeaderProps): JSX.Element {
  const { currentUrl, isNavVisible, me, title, blank = false } = props;
  const [showMenu, setShowMenu] = React.useState(false)

  return (
    <React.Fragment>
      <AppBar color='secondary'>
        <Toolbar style={{ height: 'auto', overflowWrap: 'break-word' }}>
          <Grid container justify="space-between" spacing={3} wrap="wrap">
            <Grid container item style={{ flex: 1, alignSelf: 'center' }} spacing={1}>
              <Grid item>
                <Link href="/">
                  <a>
                    <img
                      src="/static/y18.gif"
                      style={{
                        border: '1px',
                        borderColor: 'white',
                        borderStyle: 'solid',
                        height: '36px',
                        width: '36px',
                      }}
                    />
                  </a>
                </Link>
              </Grid>
              <Grid item style={{ flex: 1, alignSelf: 'center' }}>
                <Typography color="textPrimary" style={{ fontWeight: 400 }}>
                  {title}
                </Typography>
              </Grid>
            </Grid>
            <Hidden smDown>
              <Grid item style={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                {isNavVisible && (
                  <HeaderNav currentUrl={currentUrl} />
                )}
                {blank || <Grid item>
                  <form method="get" action="//hn.algolia.com/" style={{ textAlign: 'center' }}>
                    <TextField
                      type="text"
                      name="q"
                      InputProps={{
                        startAdornment: <Search color="disabled"/>
                      }}
                      placeholder="Search"
                      variant="outlined"
                      size="small"
                      autoCorrect="off"
                      spellCheck={false}
                      autoCapitalize="off"
                      autoComplete="false"
                    />
                  </form>
                </Grid>}
                {!blank ? me ? (
                  <>
                    <Link href={`/user?id=${me.id}`}>
                      <Button variant='text' color='primary' style={{ fontSize: '0.8rem' }}>{`${me.id} (${me.karma}) | `}</Button>
                    </Link>
                    <Link
                      href={`/logout?auth=d78ccc2c6120ffe08f32451519c2ff46d34c51ab&amp;goto=${currentUrl}`}
                    >
                      <Button variant='contained' color='primary' style={{ marginLeft: 12 }}>logout</Button>
                    </Link>
                  </>
                ) : (
                  <Link href={`/login?goto=${currentUrl}`}>
                    <Button variant='contained' color='primary' style={{ marginLeft: 12, fontWeight: 600, color: 'white' }}>SIGN UP/LOG IN</Button>
                  </Link>
                ) : ""}
              </Grid>
            </Hidden>
            {!blank && <Hidden mdUp>
              <IconButton edge="start" color="primary" aria-label="menu" onClick={() => setShowMenu(!showMenu)}>
                <MenuIcon />
              </IconButton>
            </Hidden>}
          </Grid>
        </Toolbar>
        {showMenu &&
          <Hidden mdUp>
            <Grid container direction="column">
              {isNavVisible && (
                <HeaderNav currentUrl={currentUrl} />
              )}
            </Grid>
            <div style={{ margin: '0 16px' }}>
              <form method="get" action="//hn.algolia.com/" style={{ textAlign: 'center' }}>
                <TextField
                  type="text"
                  name="q"
                  InputProps={{
                    startAdornment: <Search color="disabled"/>
                  }}
                  fullWidth
                  placeholder="Search"
                  variant="outlined"
                  size="small"
                  autoCorrect="off"
                  spellCheck={false}
                  autoCapitalize="off"
                  autoComplete="false"
                />
              </form>
            </div>
            <div style={{ margin: '12px 16px' }}>
              <Button variant='contained' color='primary' fullWidth style={{ fontWeight: 600, color: 'white' }}>SIGN UP/LOG IN</Button>
            </div>
          </Hidden>}
      </AppBar>
    </React.Fragment>
  );
}
