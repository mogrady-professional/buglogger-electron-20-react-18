import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Moment from 'react-moment';

const LogItem = ({
  deleteItem,
  log: { _id, priority, user, text, created },
}) => {
  const setVariant = () => {
    if (priority === 'high') {
      console.log(priority);
      return 'danger';
    } else if (priority === 'moderate') {
      return 'warning';
    } else {
      return 'success';
    }
  };

  return (
    <tr>
      <td>
        <Badge bg={setVariant()} className="p-2">
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
      </td>
      <td>{text}</td>
      <td>{user}</td>
      <td>
        <Moment format="DD-MM-YYYY, h:mm:ss a">{new Date(created)}</Moment>
      </td>
      <td>
        <Button variant="danger" size="sm" onClick={() => deleteItem(_id)}>
          x
        </Button>
      </td>
    </tr>
  );
};

export default LogItem;
