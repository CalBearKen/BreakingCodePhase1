// src/components/CustomerList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/customers').then(response => setCustomers(response.data));
  }, []);

  const handleReceivedMessage = (response) => {
    setMessage(response.message);
  };

  return (
    <ActionCableProvider>
      <h1>Customers</h1>
      <ul>
        {customers.map(customer => <li key={customer.id}>{customer.name} - {customer.email}</li>)}
      </ul>

      <ActionCableConsumer
        channel={{ channel: 'MessagesChannel' }}
        onReceived={handleReceivedMessage}
      />
      
      <div>{message}</div>
    </ActionCableProvider>
  );
};

export default CustomerList;