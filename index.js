// import express from "express";
// import cors from "cors";
// import jwt from "jsonwebtoken";

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: "50mb" }));

// app.post("/api/authenticate", (req, res) => {
//   // Check the login credentials in the request body (you can add your own validation logic)
//   const { login_id, password } = req.body;

//   // Replace this check with your authentication logic
//   if (login_id === "test@sunbasedata.com" && password === "Test@123") {
//     // Generate a JWT token without expiration
//     const token = jwt.sign({ login_id }, "your_secret_key");

//     res.status(200).json({ token });
//   } else {
//     res.status(401).json({ message: "Authentication failed" });
//   }
// });

// const PORT = 8080;
// app.listen(PORT, () => {
//   console.log(`Server has started on port ${PORT}`);
// });

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());
app.use(express.json());

const secretKey = 'your_secret_key'; // Replace with your actual secret key

const customers = [];

app.post('/api/authenticate', (req, res) => {
  const { login_id, password } = req.body;

  if (login_id === 'test@sunbasedata.com' && password === 'Test@123') {
    const token = jwt.sign({ login_id }, secretKey);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
});

app.post('/api/create-customer', (req, res) => {
  const {
    first_name,
    last_name,
    street,
    address,
    city,
    state,
    email,
    phone,
  } = req.body;

  if (!first_name || !last_name) {
    return res.status(400).json({ message: 'First Name or Last Name is missing' });
  }

  const uuid = uuidv4();

  const newCustomer = {
    uuid,
    first_name,
    last_name,
    street,
    address,
    city,
    state,
    email,
    phone,
  };

  customers.push(newCustomer);

  res.status(201).json({ message: 'Successfully Created', customer: newCustomer });
});

app.get('/api/customer-list', (req, res) => {
  // This code doesn't check the token, as requested.
  res.status(200).json(customers);
});

app.post('/api/delete-customer', (req, res) => {
  const { uuid } = req.body;

  const customerIndex = customers.findIndex((customer) => customer.uuid === uuid);

  if (customerIndex === -1) {
    return res.status(400).json({ message: 'UUID not found' });
  }

  customers.splice(customerIndex, 1);

  res.status(200).json({ message: 'Successfully deleted' });
});

app.post('/api/update-customer', (req, res) => {
  const { uuid, first_name, last_name, street, address, city, state, email, phone } = req.body;

  const customerIndex = customers.findIndex((customer) => customer.uuid === uuid);

  if (customerIndex === -1) {
    return res.status(400).json({ message: 'UUID not found' });
  }

  customers[customerIndex] = {
    ...customers[customerIndex],
    first_name,
    last_name,
    street,
    address,
    city,
    state,
    email,
    phone,
  };

  res.status(200).json({ message: 'Successfully Updated', customer: customers[customerIndex] });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
