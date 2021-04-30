import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  useEffect(() => {
    axios.get('/api/surveys').then((res) => {
      console.log(res.data);
    });
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
