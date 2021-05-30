import { Button, Card, CardContent, Typography } from '@material-ui/core';
import Link from 'next/link';
import * as React from 'react';
import { withData } from '../src/helpers/with-data';

import { NoticeLayout } from '../src/layouts/notice-layout';

export function BookmarkletPage(props): JSX.Element {
  return (
    <NoticeLayout>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5">Bookmarklet</Typography>
          <br />

        <p id="first">
          Thanks to Phil Kast for writing this bookmarklet for submitting links to{' '}
          <Link href="/">
            <a>Hacker News</a>
          </Link>
          . When you click on the bookmarklet, it will submit the page you&#39;re on. To install,
          drag this link to your browser toolbar:
          <br />
          <br />
        </p>
        <div style={{ textAlign: 'center' }}>
          <Link
            href="javascript:window.location=%22http://news.ycombinator.com/submitlink?u=%22+encodeURIComponent(document.location)+%22&amp;t=%22+encodeURIComponent(document.title)"
          >
            <Button variant='contained' color='primary' style={{ fontWeight: 600, color: 'white' }}>
            Post to HN
            </Button>
          </Link>
        </div>
      </CardContent>
      </Card>
    </NoticeLayout>
  );
}

export default withData(BookmarkletPage);
