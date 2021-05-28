import Head from 'next/head';
import * as React from 'react';
import { useQuery } from '@apollo/client';

import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { IMeQuery, ME_QUERY } from '../data/queries/me-query';
import { Container } from '@material-ui/core';

interface IMainLayoutProps {
  children: React.ReactChild;
  currentUrl: string;
  isNavVisible?: boolean;
  isUserVisible?: boolean;
  isFooterVisible?: boolean;
  title?: string;
}

export function MainLayout(props: IMainLayoutProps): JSX.Element {
  const { data } = useQuery<IMeQuery>(ME_QUERY);

  const {
    children,
    currentUrl,
    isNavVisible = true,
    isFooterVisible = true,
    title = 'Hacker News',
  } = props;

  return (
    <div>
      <Head>
        <title>Hacker News Clone</title>
        <meta name="referrer" content="origin" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" type="text/css" href="/static/news.css" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <Header
        currentUrl={currentUrl}
        isNavVisible={!!isNavVisible}
        me={data?.me}
        title={title!}
      />
      <div style={{ height: '68px' }} />
      <Container>
        {children}
      </Container>
      <div style={{ height: '25px' }} />
      {isFooterVisible && <Footer />}
    </div>
  );
}
