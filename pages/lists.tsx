import { Card, CardContent, Typography } from '@material-ui/core';
import Link from 'next/link';
import * as React from 'react';

import { withDataAndRouter } from '../src/helpers/with-data';
import { MainLayout } from '../src/layouts/main-layout';

export function ListsPage(props): JSX.Element {
  const { router } = props;

  return (
    <MainLayout currentUrl={router.pathname}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5">Hacker News Lists</Typography>
          <br />
      <tr>
        <td>
          <table style={{ borderSpacing: '7px 0px' }}>
            <tbody>
              <tr>
                <td>
                  <Link href="/leaders">
                    <b><a>leaders</a></b>
                  </Link>
                </td>
                <td>Users with most karma.</td>
              </tr>
              <tr>
                <td>
                  <Link href="/front">
                    <b><a>front</a></b>
                  </Link>
                </td>
                <td>
                  Front page submissions for a given day (e.g.{' '}
                  <a href="/front?day=2016-06-20">2016-06-20</a>), ordered by time spent there.
                </td>
              </tr>
              <tr>
                <td>
                  <Link href="/best">
                    <b><a>best</a></b>
                  </Link>
                </td>
                <td>Highest-voted recent links.</td>
              </tr>
              <tr>
                <td>
                  <Link href="/active">
                    <b><a>active</a></b>
                  </Link>
                </td>
                <td>Most active current discussions.</td>
              </tr>
              <tr>
                <td>
                  <Link href="/bestcomments">
                    <b><a>bestcomments</a></b>
                  </Link>
                </td>
                <td>Highest-voted recent comments.</td>
              </tr>
              <tr>
                <td>
                  <Link href="/noobstories">
                    <b><a>noobstories</a></b>
                  </Link>
                </td>
                <td>Submissions from new accounts.</td>
              </tr>
              <tr>
                <td>
                  <Link href="/noobcomments">
                    <b><a>noobcomments</a></b>
                  </Link>
                </td>
                <td>Comments from new accounts.</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </CardContent></Card>
    </MainLayout>
  );
}

export default withDataAndRouter(ListsPage);
