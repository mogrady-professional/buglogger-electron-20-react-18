import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import LogItem from './LogItem';

const App = () => {
  console.log(LogItem);
  const [logs, setLogs] = useState([
    {
      id: 1,
      text: 'This is log one',
      priority: 'low',
      user: 'Brad',
      created: new Date().toString(),
    },
    {
      id: 2,
      text: 'This is log two',
      priority: 'moderate',
      user: 'Kate',
      created: new Date().toString(),
    },
    {
      id: 3,
      text: 'This is log three',
      priority: 'high',
      user: 'John',
      created: new Date().toString(),
    },
  ]);

  return (
    <Container className="app">
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
            <tr key={log.id}>
              <td>{log.priority}</td>
              <td>{log.text}</td>
              <td>{log.user}</td>
              <td>{log.created}</td>
              <td>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
