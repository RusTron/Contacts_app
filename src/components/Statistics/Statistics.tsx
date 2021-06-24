import React, { FC } from 'react';
import { Statistic, Row, Col, Descriptions } from 'antd';
import { PeopleTypes } from '../../types';
import 'antd/dist/antd.css';
import './Statistics.scss';

interface NationalitiesType {
  [key: string]: number;
}

interface Props {
  people: Array<PeopleTypes>;
}

export const Statistics: FC<Props> = ({ people }: Props): JSX.Element => {
  let males = 0;
  let females = 0;
  let Indeterminate = 0;
  people.forEach((person) => {
    switch (person.gender) {
      case 'male':
        males++;
        break;
      case 'female':
        females++;
        break;
      default:
        Indeterminate++;
    }
  });

  const nationalities: NationalitiesType = {};
  people.forEach(({ nationality }) =>
    // eslint-disable-next-line no-prototype-builtins
    nationalities.hasOwnProperty(nationality.name)
      ? nationalities[nationality.name]++
      : (nationalities[nationality.name] = 1)
  );

  return (
    <div className='ant-statistic-footer'>
      <Row gutter={16}>
        <Col span={3}>
          <Statistic title='Collection size' value={people.length} />
        </Col>
        <Col span={6}>
          <Row gutter={16}>
            <Col span={4}>
              <Statistic title='Males' value={males} />
            </Col>
            <Col span={5}>
              <Statistic title='Females' value={females} />
            </Col>
            <Col span={4}>
              <Statistic title='Indeterminate' value={Indeterminate} />
            </Col>
          </Row>
          <div className='statistic__dominate'>{males > females ? 'Men predominate' : 'Women predominate'}</div>
        </Col>
      </Row>
      <div className='ant-description-box'>
        <Descriptions title='Nationalities' size='middle' column={6}>
          {Object.keys(nationalities).map((nat) => (
            <Descriptions.Item label={nat} key={nat}>
              {nationalities[nat]}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </div>
    </div>
  );
};
