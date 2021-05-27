import { Container } from '@material-ui/core';
import Head from 'next/head';
import * as React from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';


export function BlankLayout(props): JSX.Element {
  const { children } = props;

  return (
    <div className="WordSection1">
      <Head>
        <title>Hacker News Clone</title>
        <meta name="referrer" content="origin" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="/static/news.css" />
      </Head>
      <Header isNavVisible={false} title="Hacker News" me={undefined} currentUrl="" blank={true} />
      <div style={{ height: '65px' }} />
      <Container style={{minHeight: 'calc(100vh - 120px)'}}>
        {children}
      </Container>
      <Footer />
    </div>
  );
}
