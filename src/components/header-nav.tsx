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
          <Button variant='text' color='secondary' style={{ fontSize: '0.8rem' }}>Welcome</Button>
        </Link>
      )}
      <Link href="/newest">
        <Button
          variant='text'
          color={currentUrl === '/newest' ? 'default' : 'secondary'}
          style={{ fontSize: '0.8rem' }}
        >
          new
        </Button>
      </Link>
      {userId && (
        <Link href={`/threads?id=${userId}`}>
          <Button
            variant='text'
            color={currentUrl === '/threads' ? 'default' : 'secondary'}
            style={{ fontSize: '0.8rem' }}
          >
            threads
        </Button>
        </Link>
      )}
      <Link href="/newcomments">
        <Button
          variant='text'
          color={currentUrl === '/newcomments' ? 'default' : 'secondary'}
          style={{ fontSize: '0.8rem' }}
        >
          comments
        </Button>
      </Link>
      <Link href="/show">
        <Button
          variant='text'
          color={currentUrl === '/show' ? 'default' : 'secondary'}
          style={{ fontSize: '0.8rem' }}
        >
          show
        </Button>
      </Link>
      <Link href="/ask">
        <Button
          variant='text'
          color={currentUrl === '/ask' ? 'default' : 'secondary'}
          style={{ fontSize: '0.8rem' }}
        >
          ask
        </Button>
      </Link>
      <Link href="/jobs">
        <Button
          variant='text'
          color={currentUrl === '/jobs' ? 'default' : 'secondary'}
          style={{ fontSize: '0.8rem' }}
        >
          jobs
        </Button>
      </Link>
      {userId && <Link href="/submit">
        <Button
          variant='text'
          color={currentUrl === '/submit' ? 'default' : 'secondary'}
          style={{ fontSize: '0.8rem' }}
        >
          submit
        </Button>
      </Link>}
      {currentUrl === '/best' && (
        <Link href="/best">
          <Button
            variant='text'
            color='default'
            style={{ fontSize: '0.8rem' }}
          >
            best
        </Button>
        </Link>
      )}
    </>
  )
}
