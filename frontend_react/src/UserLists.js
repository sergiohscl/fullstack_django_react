import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListComponent from './ListComponent';

function UserLists() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('token')
        }
      };

      const url = 'http://127.0.0.1:8000/list/';
      try {
        const response = await axios.get(url, config);
        const data = response.data.results;
        console.log(data)
        if (Array.isArray(data)) {
          setLists(data);
        } else {
          throw new Error('Data is not an array');
        }
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {lists.map(list => (
        <ListComponent key={list.id} listName={list.name} items={list.item_set} />
      ))}
    </div>
  );
}

export default UserLists;