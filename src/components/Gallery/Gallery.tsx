import React from 'react';
import { Avatar, List, Card, Divider } from 'antd';
import { Statistics } from '../Statistics';
import { FormForTable as Form } from '../FormForTable';

// Types
import { ColumnsType } from 'antd/lib/table';
import { PeopleTypes } from '../../types';
import 'antd/dist/antd.css';
import './Gallery.scss';

const { Meta } = Card;

interface Props {
  people: Array<PeopleTypes>;
  columns: ColumnsType<PeopleTypes>;
}

export const Gallery = ({ people, columns }: Props) => {
  return (
    <List
      grid={{ gutter: 4, column: 3 }}
      dataSource={people}
      header={<Form />}
      footer={<Statistics people={people} />}
      pagination={{
        onChange: () => {
          console.log('s');
        },
        pageSize: 6,
      }}
      className='list__card-container'
      renderItem={(person) => {
        const { picture, name, dob, email, phone, location, nationality } = person;
        return (
          <List.Item>
            <Card hoverable cover={<Avatar className='list__avatar' size='large' src={picture.large} />}>
              <Meta
                title={
                  <>
                    <a>{name}</a>
                    <span className='list__person-age'>{` (${dob.age} years)`}</span>
                    <Divider dashed />
                  </>
                }
                description={
                  <>
                    {columns.find((item: any) => item.key === 'email').render(email, this, 0)}
                    {columns.find((item: any) => item.key === 'phone').render(phone, person, 0)}
                    {columns.find((item: any) => item.key === 'location').render(location, this, 0)}
                    <Divider dashed />
                    {columns.find((item: any) => item.key === 'nationality').render(nationality, this, 0)}
                  </>
                }
              />
            </Card>
          </List.Item>
        );
      }}
    />
  );
};
