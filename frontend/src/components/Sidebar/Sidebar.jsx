import React from 'react';
import './Sidebar.css';

const Sidebar = ({ showAdd, showList, showUsers }) => {
  return (
    <div className='sidebar'>
      <div className="sidebar-item" onClick={showAdd}>
        <p>Add Exercise</p>
      </div>
      <div className="sidebar-item" onClick={showList}>
        <p>Exercises List</p>
      </div>
      <div className="sidebar-item" onClick={showUsers}>
        <p>Users List</p>
      </div>
    </div>
  );
};

export default Sidebar;
