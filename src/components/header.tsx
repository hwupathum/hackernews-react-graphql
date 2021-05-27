import Link from 'next/link';
import React from 'react'
import { AppBar, Grid, Typography, Toolbar, Button, Hidden, IconButton, Popover, Paper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { HeaderNav } from './header-nav';

export interface IHeaderProps {
  me: { id: string; karma: number } | undefined;
  currentUrl: string;
  isNavVisible: boolean;
  title: string;
}

export function Header(props: IHeaderProps): JSX.Element {
  const { currentUrl, isNavVisible, me, title } = props;
  const [showMenu, setShowMenu] = React.useState(false)

  return (
    <React.Fragment>
      <AppBar color='primary'>
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
                <Typography color="secondary">
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
                {me ? (
                  <>
                    <Link href={`/user?id=${me.id}`}>
                      <Button variant='text' color='secondary' style={{ fontSize: '0.8rem' }}>{`${me.id} (${me.karma}) | `}</Button>
                    </Link>
                    <Link
                      href={`/logout?auth=d78ccc2c6120ffe08f32451519c2ff46d34c51ab&amp;goto=${currentUrl}`}
                    >
                      <Button variant='contained' color='secondary' style={{ marginLeft: 12 }}>logout</Button>
                    </Link>
                  </>
                ) : (
                  <Link href={`/login?goto=${currentUrl}`}>
                    <Button variant='contained' color='secondary' style={{ marginLeft: 12 }}>SIGN UP/LOG IN</Button>
                  </Link>
                )}
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <IconButton edge="start" color="secondary" aria-label="menu" onClick={() => setShowMenu(!showMenu)}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Grid>
        </Toolbar>
        {showMenu &&
          <Hidden mdUp>
            <Grid container direction="column">
              {isNavVisible && (
                <HeaderNav currentUrl={currentUrl} />
              )}
            </Grid>
            <div style={{ margin: '12px 16px' }}>
              <Button variant='contained' color='secondary' fullWidth>SIGN UP/LOG IN</Button>
            </div>
          </Hidden>}
      </AppBar>
    </React.Fragment>
  );
}
