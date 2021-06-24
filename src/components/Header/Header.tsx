import React from 'react';
import { Button, Col, Row } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { Logo } from '../../logo';
import { NavBar } from '../Navbar';
import './Header.scss';
import '@/assets/styles/page.scss';

export const Header = () => (
  <Row gutter={16} align='middle'>
    <Col>
      <Logo />
    </Col>
    <Col className='_flex-grow'>
      <Row align='middle'>
        <Col className='_flex-grow'>
          <NavBar />
        </Col>
        <Col>
          <Button type='link' htmlType='button' icon={<LoginOutlined />}>
            Sign In
          </Button>
        </Col>
      </Row>
    </Col>
  </Row>
);
