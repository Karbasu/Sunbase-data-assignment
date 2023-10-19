import React, { useState } from "react";
import './CreateCustomer.css'
import { Link } from "react-router-dom";
function CreateCustomer() {
  const [customer, setCustomer] = useState({
    first_name: "",
    last_name: "",
    street: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
  });

  const createCustomer = async () => {
    
    try {
      const response = await fetch("http://localhost:8080/api/create-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      if (response.status === 201) {
        
        alert("Customer created successfully!");
      } else {
        
        alert("Failed to create customer");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  return (
    <div className="createcustomer">
      <h2>Create a New Customer</h2>
      <div>
        <h4>First Name:</h4>
        <input type="text" name="first_name" value={customer.first_name} onChange={handleChange} />
      </div>
      <div>
        <h4>Last Name:</h4>
        <input type="text" name="last_name" value={customer.last_name} onChange={handleChange} />
      </div>
      <div>
        <h4>Street:</h4>
        <input type="text" name="street" value={customer.street} onChange={handleChange} />
      </div>
      <div>
        <h4>Address:</h4>
        <input type="text" name="address" value={customer.address} onChange={handleChange} />
      </div>
      <div>
        <h4>City:</h4>
        <input type="text" name="city" value={customer.city} onChange={handleChange} />
      </div>
      <div>
        <h4>State:</h4>
        <input type="text" name="state" value={customer.state} onChange={handleChange} />
      </div>
      <div>
        <h4>Email:</h4>
        <input type="email" name="email" value={customer.email} onChange={handleChange} />
      </div>
      <div>
        <h4>Phone:</h4>
        <input type="tel" name="phone" value={customer.phone} onChange={handleChange} />
      </div>
          <button className='button-create' onClick={createCustomer}>Create Customer</button>
          
          <div>
              <Link to='/customer-details'>
                  <button>Customer List</button>
            </Link>
          </div>
    </div>
  );
}

export default CreateCustomer;
