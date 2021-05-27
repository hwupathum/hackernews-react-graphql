import { Grid, Icon, Input, TextField, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Link from 'next/link';
import * as React from 'react';

export function Footer(): JSX.Element {
  return (
    <div style={{ width: '100%', marginLeft: -8, backgroundColor: '#6A7172', marginBottom: -12, padding: 8 }}>
      <br />
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <a href="/newsguidelines"><Typography color="secondary" variant="caption">Guidelines</Typography></a>
        </Grid>
        <Grid item>
          <Link href="/newsfaq">
            <a><Typography color="secondary" variant="caption">FAQ</Typography></a>
          </Link>
        </Grid>
        <Grid item>
          <a href="mailto:hn@ycombinator.com"><Typography color="secondary" variant="caption">Support</Typography></a>
        </Grid>
        <Grid item>
          <a href="https://github.com/HackerNews/API"><Typography color="secondary" variant="caption">API</Typography></a>
        </Grid>
        <Grid item>
          <Link href="/security">
            <a><Typography color="secondary" variant="caption">Security</Typography></a>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/lists">
            <a><Typography color="secondary" variant="caption">Lists</Typography></a>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/bookmarklet">
            <a><Typography color="secondary" variant="caption">Bookmarklet</Typography></a>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/dmca">
            <a><Typography color="secondary" variant="caption">DMCA</Typography></a>
          </Link>
        </Grid>
        <Grid item>
          <a href="http://www.ycombinator.com/apply/"><Typography color="secondary" variant="caption">Apply to YC</Typography></a>
        </Grid>
        <Grid item>
          <a href="mailto:hn@ycombinator.com"><Typography color="secondary" variant="caption">Contact</Typography></a>
        </Grid>
        <Grid item xs={12}>
          <form method="get" action="//hn.algolia.com/" style={{ marginBottom: '1em', textAlign: 'center' }}>
            <TextField
              type="text"
              name="q"
              style={{ backgroundColor: 'white', borderRadius: 4 }}
              InputProps={{
                startAdornment: <div style={{width: 12}}/>,
                endAdornment:
                  <>
                    <Typography color="textSecondary" variant="caption">by</Typography>
                    <img src="/static/algolia.png" style={{ height: 34, padding: 6 }} />
                  </>
              }}
              placeholder="Search"
              variant="standard"
              // size="small"
              autoCorrect="off"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="false"
            />
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
