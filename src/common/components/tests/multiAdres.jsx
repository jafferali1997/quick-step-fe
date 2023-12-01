'use client';

/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

function AddressList() {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
  const [showAdress, setshowAdress] = useState(false);

  const handleAddAddress = () => {
    if (newAddress.trim() !== '') {
      setAddresses([...addresses, newAddress.trim()]);
      setNewAddress('');
    }
  };
  const showAdressHandler = () => {
    setshowAdress(true);
  };

  return (
    <div>
      <h2>Addresses</h2>
      <p onClick={showAdressHandler}>add address</p>
      <ul>
        {addresses.map((address, index) => (
          <li key={index}>{address}</li>
        ))}
      </ul>
      {showAdress ? (
        <div>
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <button onClick={handleAddAddress}>Add Address</button>
        </div>
      ) : null}
    </div>
  );
}

export default AddressList;
