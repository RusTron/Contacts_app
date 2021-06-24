import React from 'react';
import 'antd/dist/antd.css';
import { Tag, Avatar, Typography } from 'antd';
import { AsYouType } from 'libphonenumber-js/min';
import './Table.scss';
import { ColumnsType } from 'antd/lib/table';
import { PeopleTypes, LocationType, NationalityType, DobType, PictureType } from '../../types';

const { Paragraph } = Typography;

export const columns: ColumnsType = [
  {
    title: 'Avatar',
    dataIndex: 'picture',
    key: 'picture',
    render({ thumbnail }: PictureType) {
      return <Avatar size='large' src={thumbnail} />;
    },
  },
  {
    title: 'Full-name',
    dataIndex: 'name',
    key: 'name',
    render(name: string) {
      return <a>{name}</a>;
    },
    sorter(a: PeopleTypes, b: PeopleTypes) {
      if (typeof a.name === 'string' && typeof b.name === 'string') {
        return a.name.localeCompare(b.name);
      }
    },
  },
  {
    title: 'Birthday',
    dataIndex: 'dob',
    key: 'dob',
    render: (dob: DobType) => {
      const weekday = new Date(dob.date).toLocaleTimeString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });

      return (
        <>
          <span>{`${weekday}`}</span>
          <p>{`${dob.age} years`}</p>
        </>
      );
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render(email: string) {
      return (
        <div className='one_row'>
          <Paragraph copyable={{ text: email }}></Paragraph>
          <a>{email}</a>
        </div>
      );
    },
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    render(phone: string, row: PeopleTypes) {
      const newPhone = new AsYouType(row.nat).input(phone);
      return (
        <div className='one_row'>
          <Paragraph copyable={{ text: newPhone }}></Paragraph>
          <a>{newPhone}</a>
        </div>
      );
    },
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    render({ country, street, city, state, postcode }: LocationType) {
      return (
        <>
          <Paragraph
            copyable={{ text: `${street.number} ${street.name}, ${city}, ${state} ${postcode}` }}
            className='ant__location'
          ></Paragraph>
          <div className='address'>
            <p className='address-country'>{`/${country}/`}</p>
            <span>{`${street.number} ${street.name}, ${city}, ${state} ${postcode}`}</span>
          </div>
        </>
      );
    },
  },
  {
    title: 'Nationality',
    key: 'nationality',
    dataIndex: 'nationality',
    align: 'center',
    render(tag: NationalityType) {
      return <Tag color={tag.color}>{tag.name}</Tag>;
    },
  },
];
