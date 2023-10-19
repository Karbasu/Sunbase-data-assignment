import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToken } from "./TokenProvider";
import './CustomerList.css';
import Modal from 'react-modal';

Modal.setAppElement("#root");

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [noData, setNoData] = useState(false);
  const { token } = useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(null);

  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedStreet, setEditedStreet] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedCity, setEditedCity] = useState("");
  const [editedState, setEditedState] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");


  const closeEditModal = () => {
    setIsModalOpen(false);
    
    setEditedFirstName("");
    setEditedLastName("");
    setEditedStreet("");
    setEditedAddress("");
    setEditedCity("");
    setEditedState("");
    setEditedEmail("");
    setEditedPhone("");
  };

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await fetch("http://localhost:8080/api/customer-list", {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          if (data.length > 0) {
            setCustomers(data);
          } else {
            setNoData(true);
          }
        } else {
         
          alert("Failed to fetch customer list");
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchCustomers();
  }, [token]);

  const handleEditCustomer = async (customer) => {
   
    setEditedCustomer(customer);
    setIsModalOpen(true);

    
    setEditedFirstName(customer.first_name);
    setEditedLastName(customer.last_name);
    setEditedStreet(customer.street);
    setEditedAddress(customer.address);
    setEditedCity(customer.city);
    setEditedState(customer.state);
    setEditedEmail(customer.email);
    setEditedPhone(customer.phone);
  };

  const handleSaveChanges = async () => {
    
    const updatedCustomer = {
      ...editedCustomer,
      first_name: editedFirstName,
      last_name: editedLastName,
      street: editedStreet,
      address: editedAddress,
      city: editedCity,
      state: editedState,
      email: editedEmail,
      phone: editedPhone,
    };


    const updatedCustomers = customers.map((customer) =>
      customer.uuid === updatedCustomer.uuid ? updatedCustomer : customer
    );
    setCustomers(updatedCustomers);

    closeEditModal(); 
  };

  const handleDeleteCustomer = async (uuid) => {
    
    try {
      const response = await fetch("http://localhost:8080/api/delete-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ uuid }),
      });

      if (response.status === 200) {
        
        setCustomers(customers.filter((customer) => customer.uuid !== uuid));
      } else {
       
        alert("Failed to delete the customer");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="customerList">
      <h2>Customer List</h2>
      {noData ? (
        <>
        <p>No data found.</p>
        <Link to="/create-customer">
            <button>Add Customer</button>
          </Link>
        </>
      ) : (
        <div>
          <Link to="/create-customer">
            <button>Add Customer</button>
          </Link>
          <div className="table">
            <table className="customer-table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Street</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                  
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.uuid}>
                    <td>{customer.first_name}</td>
                    <td>{customer.last_name}</td>
                    <td>{customer.street}</td>
                    <td>{customer.address}</td>
                    <td>{customer.city}</td>
                    <td>{customer.state}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>
                      <button onClick={() => handleEditCustomer(customer)}>Edit</button>
                      <button onClick={() => handleDeleteCustomer(customer.uuid)}>Delete</button>
                    </td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Modal
  isOpen={isModalOpen}
  onRequestClose={closeEditModal}
>
  <h2>Edit Customer</h2>
  <div className="model-content">
    <input
      type="text"
      value={editedFirstName}
      onChange={(e) => setEditedFirstName(e.target.value)}
      placeholder="First Name"
    />
    <input
      type="text"
      value={editedLastName}
      onChange={(e) => setEditedLastName(e.target.value)}
      placeholder="Last Name"
    />
    <input
      type="text"
      value={editedStreet}
      onChange={(e) => setEditedStreet(e.target.value)}
      placeholder="Street"
    />
    <input
      type="text"
      value={editedAddress}
      onChange={(e) => setEditedAddress(e.target.value)}
      placeholder="Address"
    />
    <input
      type="text"
      value={editedCity}
      onChange={(e) => setEditedCity(e.target.value)}
      placeholder="City"
    />
    <input
      type="text"
      value={editedState}
      onChange={(e) => setEditedState(e.target.value)}
      placeholder="State"
    />
    <input
      type="text"
      value={editedEmail}
      onChange={(e) => setEditedEmail(e.target.value)}
      placeholder="Email"
    />
    <input
      type="text"
      value={editedPhone}
      onChange={(e) => setEditedPhone(e.target.value)}
      placeholder="Phone"
    />
    <button onClick={handleSaveChanges}>Save Changes</button>
    <button onClick={closeEditModal}>Cancel</button>
  </div>
</Modal>
    </div>
  );
}

export default CustomerList;

