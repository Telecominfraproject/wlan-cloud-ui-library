import React from 'react';
import PropTypes from 'prop-types';
import {
  Skeleton as AntdSkeleton,
  Table as AntdTable,
  List as AntdList,
  Card as AntdCard,
} from 'antd';

import styles from './index.module.scss';

const Skeleton = ({ type, loading, children }) => {
  return (
    <AntdSkeleton
      className={styles.Skeleton}
      active
      loading={loading}
      paragraph={
        (type === 'default' && { rows: 4 }) ||
        (type === 'card' && { rows: 6 }) ||
        (type === 'smallCard' && { rows: 2 }) ||
        (type === 'tree' && { rows: 16 }) ||
        (type === 'title' && false)
      }
      title={type !== 'smallCard'}
    >
      {children}
    </AntdSkeleton>
  );
};

Skeleton.propTypes = {
  type: PropTypes.oneOf(['block', 'default', 'card', 'smallCard', 'tree', 'title']),
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Skeleton.defaultProps = {
  type: 'default',
  loading: false,
};

export const Card = ({ loading, children, ...props }) => {
  return (
    <AntdCard {...props}>
      <Skeleton loading={loading} type="card">
        {children}
      </Skeleton>
    </AntdCard>
  );
};

Card.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node,
};

Card.defaultProps = {
  children: null,
  loading: false,
};

export const Table = ({ loading, columns, dataSource, ...props }) => {
  return (
    <AntdTable
      {...props}
      loading={false}
      dataSource={loading ? [...Array(15).map((_, index) => ({ key: `key${index}` }))] : dataSource}
      columns={
        loading
          ? columns.map(column => {
              return {
                ...column,
                render: () => {
                  return <AntdSkeleton title active paragraph={false} loading />;
                },
              };
            })
          : columns
      }
    />
  );
};

Table.propTypes = {
  loading: PropTypes.bool,
  columns: PropTypes.instanceOf(Array),
  dataSource: PropTypes.instanceOf(Array),
};

Table.defaultProps = {
  loading: false,
  columns: [],
  dataSource: [],
};

export const List = ({ loading, dataSource, renderItem, ...props }) => {
  return (
    <AntdList
      {...props}
      loading={false}
      dataSource={loading ? [...Array(15).fill({})] : dataSource}
      renderItem={item => {
        return (
          <AntdList.Item>
            {loading ? <AntdSkeleton active avatar title /> : renderItem(item)}
          </AntdList.Item>
        );
      }}
    />
  );
};

List.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.instanceOf(Array),
  renderItem: PropTypes.instanceOf(Object),
};

List.defaultProps = {
  loading: false,
  dataSource: [],
  renderItem: null,
};

export default Skeleton;
