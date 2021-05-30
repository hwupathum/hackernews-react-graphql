import * as React from 'react';
import { MainLayout } from './main-layout';


export function BlankLayout(props): JSX.Element {
  const { children } = props;

  return (
    <MainLayout title="Combinator" currentUrl="">
      {children}
    </MainLayout>
  );
}
