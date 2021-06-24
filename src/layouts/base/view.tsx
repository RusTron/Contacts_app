import React, { useMemo, memo, ReactNode } from 'react';
import { Layout } from 'antd';
import { APP_NAME } from '../../constants/env';
import { Header } from '../../components/Header';
import { style } from './style';
import '../../assets/styles/page.scss';
import './style.scss';

interface Props {
  children: ReactNode;
}

const View = memo(function View({ children }: Props) {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <Layout className='layout layout--base'>
      <Layout.Header className='layout__header'>
        <Header />
      </Layout.Header>
      <Layout.Content className='layout__content' style={style.content}>
        {children}
      </Layout.Content>
      <Layout.Footer className='layout__footer'>
        {currentYear} &copy; {APP_NAME}
      </Layout.Footer>
    </Layout>
  );
});

export { View };
