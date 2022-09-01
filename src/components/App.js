import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import LogItem from './LogItem';
import AddLogItem from './AddLogItem';
import Alert from 'react-bootstrap/Alert';
const { ipcRenderer, remote } = require('electron');

const App = () => {
  console.log(LogItem);
  const [logs, setLogs] = useState([]);

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'success',
  });

  useEffect(() => {
    console.log('useEffect');
    ipcRenderer.send('logs:load');
    ipcRenderer.on('logs:get', (e, logs) => {
      console.log('logs:get');
      setLogs(JSON.parse(logs));
    });
  }, []);

  function addItem(item) {
    if (item.text === '' || item.user === '' || item.priority === '') {
      showWarn('Please enter all fields');
      return false;
    }

    console.log(item);
    item._id = Math.floor(Math.random() * 90000) + 10000;
    item.created = new Date().toString();

    setLogs([...logs, item]);
    showAlert('Log Added');
  }

  function deleteItem(_id) {
    setLogs(logs.filter((item) => item._id !== _id));
    showDelete('Log Deleted');
    console.log('deleteItem');
  }

  function showAlert({
    message = 'Log Added',
    variant = 'success',
    seconds = 3000,
  }) {
    setAlert({
      show: true,
      message,
      variant,
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message,
        variant: 'success',
      });
    }, seconds);
  }
  function showDelete({
    message = 'Log Deleted',
    variant = 'success',
    seconds = 3000,
  }) {
    setAlert({
      show: true,
      message,
      variant,
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message,
        variant: 'success',
      });
    }, seconds);
  }

  function showWarn({
    message = 'Please enter all fields',
    variant = 'danger',
    seconds = 3000,
  }) {
    setAlert({
      show: true,
      message,
      variant,
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message,
        variant: 'success',
      });
    }, seconds);
  }

  return (
    <Container className="app">
      <AddLogItem addItem={addItem} />
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <Table>
        <thead>
          <tr>
            <th>Priority</th>
            <th>Log Text</th>
            <th>User</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <LogItem key={log._id} log={log} deleteItem={deleteItem} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
