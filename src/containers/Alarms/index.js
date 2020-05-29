import React from 'react';
import { ReloadOutlined, ExclamationOutlined, WifiOutlined } from '@ant-design/icons';
import { List, Card, Avatar } from 'antd';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import Container from 'components/Container';
import Header from 'components/Header';

import styles from './index.module.scss';

const { Item } = List;
const { Meta } = Card;

const Alarms = ({ data, onReload, onLoadMore, isLastPage }) => {
  const getBackgroundColor = status => {
    if (status === 'error') {
      return '#FF0000';
    }
    if (status === 'requiresAttention') {
      return '#FFC400';
    }
    return '#1EAED2';
  };

  const convertDate = time => {
    const date = new Date(parseInt(time, 10));
    return date.toLocaleString();
  };

  return (
    <Container>
      <Header>
        <h1>Alarms</h1>
        <Button icon={<ReloadOutlined />} onClick={onReload} />
      </Header>
      <List
        grid={{
          gutter: 16,
          column: 1,
        }}
        dataSource={data}
        renderItem={item => (
          <Item>
            <Card>
              <Meta
                avatar={
                  <Avatar
                    style={{ backgroundColor: getBackgroundColor(item.severity) }}
                    className={styles.InfoIcon}
                    icon={<ExclamationOutlined />}
                  />
                }
                title={
                  <div className={styles.Title}>
                    <div>{item.alarmCode}</div>
                    {convertDate(item.createdTimestamp)}
                  </div>
                }
                description={
                  <div>
                    <div>{item.details.message}</div>
                    <WifiOutlined className={styles.WifiIcon} />
                  </div>
                }
              />
            </Card>
          </Item>
        )}
      />
      {!isLastPage && (
        <div className={styles.LoadMore}>
          <Button onClick={onLoadMore}>Load More</Button>
        </div>
      )}
    </Container>
  );
};

Alarms.propTypes = {
  data: PropTypes.instanceOf(Array),
  onReload: PropTypes.func,
  onLoadMore: PropTypes.func,
  isLastPage: PropTypes.bool,
};

Alarms.defaultProps = {
  data: [],
  onReload: () => {},
  onLoadMore: () => {},
  isLastPage: true,
};

export default Alarms;
