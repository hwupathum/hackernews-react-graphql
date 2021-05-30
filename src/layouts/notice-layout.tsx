import { Container } from '@material-ui/core';
import Head from 'next/head';
import * as React from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { MainLayout } from './main-layout';

export function NoticeLayout(props): JSX.Element {
  const { children } = props;

  return (
    <MainLayout title="Combinator" currentUrl="">
      {children}
    </MainLayout>
  );
}
