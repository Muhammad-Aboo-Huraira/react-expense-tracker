import React from 'react'
import { logOut } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logOut());
    navigate("/");
  };
  return (
    <div>
      Hello from dashboard
    </div>
  )
}

export default Dashboard
