import React, { useEffect, useState, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { FormForTable } from '../../components/FormForTable';
import { Statistics } from '../../components/Statistics';
import { columns } from '../../components/Table';
import { filterPeople } from '../../store/reducers/peopleReducer';
import { actionCreators } from '../../store/reducers/peopleReducer/actions';
import { actions } from '../../store/reducers/loadingReducer';
import { NATIONALITIES } from '../../constants/nationalities';
import { Table, Radio, Button, notification } from 'antd';
import { Gallery } from '../../components/Gallery';
import { getData } from '../../api';
import { UnorderedListOutlined, AppstoreOutlined, ReloadOutlined } from '@ant-design/icons';
import { PeopleTypes } from '../../types';
import 'antd/dist/antd.css';
import './Contacts.scss';

const loadData = (dispatch: Dispatch) => {
  dispatch(actions.startLoading());

  return getData().then((data: any) => {
    if (data.error) {
      openNotificationWithIcon();
      dispatch(actions.finishLoading());
      return;
    }
    const action = actionCreators.setData(
      data.results.map((person: PeopleTypes) => {
        if (typeof person.name !== 'object') return;

        return {
          ...person,
          name: `${person.name.title}. ${person.name.first} ${person.name.last}`,
          nationality: NATIONALITIES[person.nat],
        };
      })
    );
    dispatch(action);
    dispatch(actions.finishLoading());
  });
};

const openNotificationWithIcon = (): void => {
  notification.error({
    message: 'Network Error',
    description: 'Please, try again later',
  });
};

export const Contacts: FC = (): JSX.Element => {
  const [view, setView] = useState(
    (localStorage.getItem('view') && JSON.parse(localStorage.getItem('view'))) || 'table'
  );
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.loading);

  const saveView = (value: string) => {
    localStorage.setItem('view', JSON.stringify(value));
    setView(value);
  };

  useEffect(() => {
    dispatch(loadData);
  }, []);

  const people = useSelector((state: any) => filterPeople(state));

  return (
    <>
      <div className='contacts__title'>
        <span>
          <h1 className='contacts__title-text'>Contacts</h1>
        </span>
        <Button
          shape='circle'
          icon={<ReloadOutlined />}
          onClick={() => {
            dispatch(loadData);
          }}
          loading={loading}
        />
        <Radio.Group defaultValue={view}>
          <Button value='table' onClick={() => saveView('table')} type={view === 'table' ? 'primary' : 'default'}>
            <UnorderedListOutlined />
          </Button>
          <Button value='gallery' onClick={() => saveView('gallery')} type={view === 'gallery' ? 'primary' : 'default'}>
            <AppstoreOutlined />
          </Button>
        </Radio.Group>
      </div>
      {view === 'table' ? (
        <Table
          columns={columns}
          dataSource={people}
          title={() => <FormForTable view={view} />}
          footer={() => <Statistics people={people} />}
        />
      ) : (
        <Gallery
          people={people}
          columns={columns}
          // title={() => <FormForTable view={view} />}
          // footer={() => <Statistics people={people} />}
        />
      )}
    </>
  );
};
