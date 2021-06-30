import React from 'react';
import Header from './Header';
import * as styles from './BaseLayout.module.css';

interface Props {
  children?: React.ReactNode;
}

export default function BaseLayout({ children }: Props) {
  return (
    <div className={`${styles.diagonalBackground} w-screen h-screen`}>
      <Header />
      <main>{children}</main>
    </div>
  );
}
