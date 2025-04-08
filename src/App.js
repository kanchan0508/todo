import React from 'react';
import { useSelector } from 'react-redux';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';
import Login from './components/auth/Login';
import './App.css';

const App = () => {
  const { isAuthenticated } = useSelector(state => state.authState);

  return (
    <div className="app">
      {!isAuthenticated ? (
        <Login />
      ) : (
        <>
          <TaskInput />
          <TaskList />
        </>
      )}
    </div>
  );
};

export default App;
