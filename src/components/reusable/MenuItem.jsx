import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa';

const MenuItemWithSub = ({ label, icon: Icon, path}) => {
  return (
    <li>
      <div className="menu-item">
        <Link className="menu-item-link" to={path}>
          <Icon className="menu-icon"/> {label}
        </Link>
      </div>
    </li>
  );
};

export default MenuItemWithSub;
