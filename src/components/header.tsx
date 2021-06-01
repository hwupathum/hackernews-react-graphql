import Link from 'next/link';
import React from 'react'
import { AppBar, Grid, Typography, Toolbar, Button, Hidden, IconButton, Popover, Paper, TextField } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import { HeaderNav } from './header-nav';
import { Mic, MicOff, Search } from '@material-ui/icons';

export interface IHeaderProps {
  me: { id: string; karma: number } | undefined;
  currentUrl: string;
  isNavVisible: boolean;
  title: string;
  blank?: boolean
}

const SpeechRegocnition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRegocnition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

export function Header(props: IHeaderProps): JSX.Element {
  const { currentUrl, isNavVisible, me, title, blank = false } = props;
  const [showMenu, setShowMenu] = React.useState(false)
  const [isListening, setIslistening] = React.useState(false)
  const [note, setNote] = React.useState('')

  React.useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('Continue..')
        mic.start
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }
    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

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
                {!blank && isNavVisible && <Grid item>
                  <form method="get" action="//hn.algolia.com/" style={{ textAlign: 'center' }}>
                    <TextField
                      type="text"
                      name="q"
                      InputProps={{
                        startAdornment: <Search color="disabled" />
                      }}
                      value={note}
                      onChange={event => setNote(event.target.value)}
                      style={{ maxWidth: 200 }}
                      placeholder="Search"
                      variant="outlined"
                      size="small"
                      autoCorrect="off"
                      spellCheck={false}
                      autoCapitalize="off"
                      autoComplete="false"
                    />
                    <IconButton onClick={() => setIslistening(prevState => !prevState)}>
                      {isListening ? <MicOff /> : <Mic />}
                    </IconButton>
                  </form>
                </Grid>}
                {!blank && isNavVisible ? me ? (
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
            {!blank && isNavVisible && <Hidden mdUp>
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
                    startAdornment: <Search color="disabled" />
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
                <IconButton onClick={() => setIslistening(prevState => !prevState)}>
                  {isListening ? <MicOff /> : <Mic />}
                </IconButton>
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
