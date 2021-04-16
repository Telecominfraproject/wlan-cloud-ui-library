import React from 'react';
import PropTypes from 'prop-types';
import { Menu as AntdMenu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Item, SubMenu } = AntdMenu;

const Menu = ({ mode, menuItems, onMenuItemClick, ...restProps }) => {
  const location = useLocation();

  const selectedKeys = location.pathname.split('/');

  const getMenuItem = item => (
    <Item key={item.key}>
      <Link
        onClick={onMenuItemClick}
        to={{ pathname: item.path, search: item.preserveQueryParams ? location.search : null }}
      >
        {item.icon || null}
        <span>{item.text}</span>
      </Link>
    </Item>
  );
  const items = menuItems.map(item => {
    if (item.children) {
      return (
        <SubMenu key={item.key} title={item.text} icon={item.icon}>
          {item.children.map(subItem => getMenuItem(subItem))}
        </SubMenu>
      );
    }

    return getMenuItem(item);
  });

  return (
    <AntdMenu mode={mode} theme="dark" selectedKeys={selectedKeys} {...restProps}>
      {items}
    </AntdMenu>
  );
};

Menu.propTypes = {
  menuItems: PropTypes.instanceOf(Array).isRequired,
  mode: PropTypes.string,
  onMenuItemClick: PropTypes.func,
};

Menu.defaultProps = {
  mode: 'horizontal',
  onMenuItemClick: () => {},
};

export default Menu;
