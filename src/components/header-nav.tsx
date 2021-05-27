import { Button } from '@material-ui/core';
import Link from 'next/link';
import * as React from 'react';

interface IHeaderNavProps {
  userId?: string;
  currentUrl: string;
}

export function HeaderNav(props: IHeaderNavProps): JSX.Element {
  const { userId, currentUrl } = props;

  return (
    <>
      {userId && (
        <Link href="/newswelcome">
          <Button variant='text' color='primary' style={{ fontSize: '0.8rem', fontWeight: 600 }}>Welcome</Button>
        </Link>
      )}
      <Link href="/newest">
        <Button
          variant='text'
          color={currentUrl === '/newest' ? 'default' : 'primary'}
          style={{ fontSize: '0.8rem', fontWeight: 600 }}
        >
          new
        </Button>
      </Link>
      {userId && (
        <Link href={`/threads?id=${userId}`}>
          <Button
            variant='text'
            color={currentUrl === '/threads' ? 'default' : 'primary'}
            style={{ fontSize: '0.8rem', fontWeight: 600 }}
          >
            threads
        </Button>
        </Link>
      )}
      <Link href="/newcomments">
        <Button
          variant='text'
          color={currentUrl === '/newcomments' ? 'default' : 'primary'}
          style={{ fontSize: '0.8rem', fontWeight: 600 }}
        >
          comments
        </Button>
      </Link>
      <Link href="/show">
        <Button
          variant='text'
          color={currentUrl === '/show' ? 'default' : 'primary'}
          style={{ fontSize: '0.8rem', fontWeight: 600 }}
        >
          show
        </Button>
      </Link>
      <Link href="/ask">
        <Button
          variant='text'
          color={currentUrl === '/ask' ? 'default' : 'primary'}
          style={{ fontSize: '0.8rem', fontWeight: 600 }}
        >
          ask
        </Button>
      </Link>
      <Link href="/jobs">
        <Button
          variant='text'
          color={currentUrl === '/jobs' ? 'default' : 'primary'}
          style={{ fontSize: '0.8rem', fontWeight: 600 }}
        >
          jobs
        </Button>
      </Link>
      {userId && <Link href="/submit">
        <Button
          variant='text'
          color={currentUrl === '/submit' ? 'default' : 'primary'}
          style={{ fontSize: '0.8rem', fontWeight: 600 }}
        >
          submit
        </Button>
      </Link>}
      {currentUrl === '/best' && (
        <Link href="/best">
          <Button
            variant='text'
            color='default'
            style={{ fontSize: '0.8rem', fontWeight: 600 }}
          >
            best
        </Button>
        </Link>
      )}
    </>
  )
}
